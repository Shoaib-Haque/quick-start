import { useEffect, useState, useMemo } from "react";
import { someFruits } from "../assets/data/fruits";
import { sort, confirmDialog, successDialog, toastWithUndo, exportToCSV } from '../utils/helper';
import debounce from 'lodash.debounce';
import Header from "./component/Header";
import Main from "./component/Main";
import Button from "./component/Button";
import FormInput from "./component/FormInput";
import Table from "./component/Table";
import Pagination from "./component/Pagination";
import Search from "./component/Search";
import Modal from "./component/Modal";
import Nodata from "./component/NoData";

function AlterData({headline }) {
    const [fruits, setFruits] = useState([]);
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [origin, setOrigin] = useState("");
    const [editId, setEditId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isRemovingAll, setIsRemovingAll] = useState(false);
    const headings = ['', 'Name', 'Color', 'Origin', ''];
    const sortableColumns = [null, 'name', 'color', null, null];
    const isAnyRemoving = fruits.some(fruit => fruit.removing);
    const isBusy = isSaving || isRemovingAll || isAnyRemoving || isExporting;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sorts, setSorts] = useState({
        name: null,   // 'asc' | 'desc' | null
        color: null,  // 'asc' | 'desc' | null
    });
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastDeletedItems, setLastDeletedItems] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        document.title = `${headline}`;        
        setFruits(someFruits);
    }, []);

    const searchWords = useMemo(() => {
        return searchTerm.trim().toLowerCase().split(/\s+/).filter(Boolean);
    }, [searchTerm]);
    
    const filteredFruits = useMemo(() => {
        return fruits.filter(fruit => {
            if (searchWords.length === 0) return true;
            const fields = [fruit.name, fruit.color, fruit.origin].join(' ').toLowerCase();
            return searchWords.some(word => fields.includes(word));
        });
    }, [fruits, searchWords]);
    
    const sortedFruits = useMemo(() => {
        return sort(filteredFruits, sorts, ['name', 'color']);
    }, [filteredFruits, sorts]);
    
    const paginatedFruits = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return sortedFruits.slice(startIndex, startIndex + itemsPerPage);
    }, [sortedFruits, currentPage, itemsPerPage]);

    const hasSelectableItems = paginatedFruits.some(f => !f.removing);
    const selectedCount = fruits.filter(fruit => fruit.selected).length;
    
    useEffect(() => {
        const totalPages = Math.ceil(filteredFruits.length / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
        
    }, [filteredFruits, itemsPerPage]);

    const save = () => {
        let trimmedName = name.trim();
        let trimmedColor = color.trim();
        let trimmedOrigin = origin.trim();

        const newErrors = {};

        if (!trimmedName) {
            newErrors.name = "Name is required!";
        } else if (fruits.some(fruit =>
            fruit.name.toLowerCase() === trimmedName.toLowerCase() &&
            fruit.id !== editId
        )) {
            newErrors.name = "Name already exists!";
        }

        if (!trimmedColor) {
            newErrors.color = "Color is required!";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }    

        // Clear errors if all good
        setErrors({});
        setIsSaving(true);
        setTimeout(() => {
            if(editId) {
                let updatedFruits = fruits.map((fruit) =>
                    fruit.id === editId ? {...fruit, name:trimmedName, color:trimmedColor, origin:trimmedOrigin, justEdited: true } : fruit
                );
                setFruits(updatedFruits);
                successDialog("Fruit Edited!");
            
                setTimeout(() => {
                    setFruits((prev) =>
                        prev.map((f) => (f.id === editId ? {...f, justEdited: false } : f))
                    );
                }, 1000);
            } else {
                let latest_id = Math.max(0, ...fruits.map(f => f.id)) + 1;
                let newFruit = {
                    id: latest_id,
                    name: trimmedName,
                    color: trimmedColor,
                    origin: trimmedOrigin,
                    selected: false,
                    justAdded: true,
                };
                setFruits((prev) => [...prev, newFruit]);
                successDialog("Fruit Added!");
                
                // Remove the justAdded flag after animation duration
                setTimeout(() => {
                setFruits((prev) =>
                    prev.map((f) => (f.id === latest_id ? {...f, justAdded: false } : f))
                );
                }, 1000);
            }
            clear();
            setIsSaving(false);
            setIsModalOpen(false);
        }, 2000);
    };

    const edit = (id, name, color, origin) => {
        setEditId(id);
        setName(name);
        setColor(color);
        setOrigin(origin);
        setIsModalOpen(true);
    }

    const deleteItems = (itemsToDelete) => {
        if (itemsToDelete.length === 0) return;

        // Optimistically remove
        setFruits(prev => prev.filter(fruit => !itemsToDelete.some(del => del.id === fruit.id)));
        setLastDeletedItems(itemsToDelete);

        toastWithUndo({
            message: `${itemsToDelete.length} item(s) deleted`,
            onUndo: () => {
            setFruits(prev => [...prev, ...itemsToDelete].sort((a, b) => a.id - b.id));
            setLastDeletedItems([]);
            },
            onFinalize: () => {
            // Optional: send to backend
            setLastDeletedItems([]);
            }
        });
    };

    const remove = (id) => {
        const itemToDelete = fruits.find(fruit => fruit.id === id);
        if (!itemToDelete) return;
    
        confirmDialog('Are you sure?', 'This action cannot be undone!', 'Yes, delete it!')
        .then((result) => {
            if (result.isConfirmed) {
                // Optionally mark for animation
                setFruits(prev => 
                    prev.map(fruit => fruit.id === id ? {...fruit, removing: true } : fruit)
                );
    
                // Wait for animation, then delete
                setTimeout(() => {
                    deleteItems([itemToDelete]);
                }, 700); // should match animation duration
            }
        });
    };

    const removeSelected = () => {
        const itemsToDelete = fruits.filter(fruit => fruit.selected);
        if (itemsToDelete.length === 0) return;
    
        confirmDialog('Are you sure?', 'This action cannot be undone!', 'Yes, delete selected items!')
        .then((result) => {
            if (result.isConfirmed) {
                setIsRemovingAll(true);
    
                // Optional: show "removing" animation
                setFruits(prev =>
                    prev.map(fruit =>
                        fruit.selected ? {...fruit, removing: true } : fruit
                    )
                );
    
                // Wait for animation, then delete
                setTimeout(() => {
                    deleteItems(itemsToDelete);
                    setIsRemovingAll(false);
                }, 700); // match your CSS animation
            }
        });
    };

    const clear = () => {
        setName("");
        setColor("");
        setOrigin("");
        setEditId(null);
        setErrors({});
    };

    const selectAll = () => {
        const currentPageIds = paginatedFruits.map(fruit => fruit.id);
        const allSelected = paginatedFruits.every(fruit => fruit.selected);
        
        const updatedFruits = fruits.map(fruit =>
            currentPageIds.includes(fruit.id)
                ? { ...fruit, selected: !allSelected }
                : fruit
        );
        
        setFruits(updatedFruits);
    };

    const areAllSelected = (arr) => arr.length && arr.every(item => item.selected);
    const isAnySelected = (arr) => arr.some(item => item.selected);

    const toggleSelectAllGlobal = () => {
        const updatedFruits = fruits.map(fruit => ({
            ...fruit,
            selected: !areAllSelected(fruits)
        }));
    
        setFruits(updatedFruits);
    };

    const selectItem = (id) => {
        let updatedFruits = fruits.map((fruit) =>
            fruit.id === id ? { ...fruit, selected: !fruit.selected } : fruit
        );
        setFruits(updatedFruits);
    }

    const debouncedSearch = debounce((value) => {
        setSearchTerm(value);
    }, 300);
    
    const handleOpenModal = () => setIsModalOpen(true);
    const handleCloseModal = () => {
        setIsModalOpen(false);
        clear();
    };

    const toggleSortField = (field) => {
        setSorts(prev => {
            const current = prev[field];
            const next =
                current === null ? 'asc' :
                current === 'asc' ? 'desc' :
                null;
    
            return {...prev, [field]: next};
        });
    };

    const handleItemsPerPageChange = (e) => {
        setItemsPerPage(Number(e.target.value));
    };

    const columns = [
        { label: "Id", key: "id" },
        { label: "Name", key: "name" },
        { label: "Color", key: "color" },
        { label: "Origin", key: "origin" },
    ];
      
    const handleExport = () => {
        setIsExporting(true);
        setTimeout(() => {
            exportToCSV({
                data: filteredFruits,
                filename: "fruits.csv",
                columns,
            });
            setIsExporting(false);
        }, 2000);
    };

    const getRemoveButtonText = () => {
        return selectedCount > 0 
        ? `Remove ${selectedCount} item${selectedCount > 1 ? 's' : ''}`
        : "Remove Selected"
    }

    return (
        <div>
            <Header />
            <Main headline={headline}>  
                <div className="flex flex-col-reverse sm:flex-row gap-2 justify-between mb-4">
                    <Search 
                        placeholder={"Search Fruits.."}
                        searchByKey={(e) => debouncedSearch(e.target.value)}
                        isBusy={isBusy} 
                    />
                    <div className="flex justify-end gap-2">
                        <Button 
                            text={"Export as CSV"} 
                            ariaLabel={"Export as CSV"} 
                            onButtonClick={handleExport} 
                            bgColor={"gray"}
                            isButtonDisable={isBusy} 
                            isLoading={isExporting} 
                        />
                        <Button 
                            text={"Add Fruit"} 
                            ariaLabel={"Add Fruit"} 
                            onButtonClick={handleOpenModal} 
                            isButtonDisable={isBusy} 
                        />
                    </div>
                    <Modal
                        isOpen={isModalOpen}
                        isButtonDisable={isSaving}
                        headline={editId ? 'Edit Fruit' : 'Add New Fruit'}
                        onClose={handleCloseModal} >
                            <form
                                onSubmit={(e) => {
                                e.preventDefault();
                                save();
                                }}
                                className="flex flex-col gap-2"
                            >
                                <FormInput 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="* Enter Name"
                                    error={errors.name}
                                    disabled={isBusy}
                                />
                                <FormInput 
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    placeholder="* Enter Color"
                                    error={errors.color}
                                    disabled={isBusy}
                                />
                                <FormInput 
                                    value={origin}
                                    onChange={(e) => setOrigin(e.target.value)}
                                    placeholder="Enter Origin"
                                    error={errors.origin}
                                    disabled={isBusy}
                                />
                                <div className="flex flex-row gap-2">
                                    <Button 
                                        text={"Save"} 
                                        ariaLabel={"Save"}
                                        onButtonClick={save} 
                                        isButtonDisable={isBusy} 
                                        isLoading={isSaving} 
                                    />
                                    <Button 
                                        text={"Clear"} 
                                        ariaLabel={"Clear"}
                                        onButtonClick={clear} 
                                        isButtonDisable={isBusy}
                                    />
                                </div>
                            </form>
                    </Modal>
                </div>
                {filteredFruits.length > 0 ? (
                    <div>
                        <Pagination
                            totalItems={filteredFruits.length}
                            itemsPerPage={itemsPerPage}
                            currentPage={currentPage}
                            onPageChange={setCurrentPage}
                            isBusy={isBusy}
                            onOptionChange={handleItemsPerPageChange}
                        />
                        <div className="w-full mb-2 flex flex-row justify-between items-center max-[359px]:flex-col-reverse max-[359px]:items-start gap-2">
                            <div>
                                <input 
                                    type="checkbox"
                                    title={isAnySelected(paginatedFruits) ? "Deselect All" : "Select All"}
                                    aria-label={isAnySelected(paginatedFruits) ? "Deselect All" : "Select All"}
                                    checked={isAnySelected(paginatedFruits)}
                                    disabled={isBusy || !hasSelectableItems}
                                    onChange={selectAll}
                                    className={`px-4 w-[50px] rounded ${isBusy ? "opacity-50 !cursor-not-allowed" : "!cursor-pointer"}`} 
                                />
                            </div>
                            <div className="flex flex-row gap-2 max-[359px]:flex-row max-[359px]:w-full max-[359px]:justify-end">
                                <Button 
                                    text={areAllSelected(fruits) ? "Deselect All" : "Select All"} 
                                    ariaLabel={areAllSelected(fruits) ? "Deselect All" : "Select All"} 
                                    onButtonClick={toggleSelectAllGlobal}
                                    isButtonDisable={isBusy}
                                    bgColor={"gray"}
                                    classList="min-w-[108px]"
                                />
                                <Button 
                                    text={getRemoveButtonText()}
                                    ariaLabel={getRemoveButtonText()}
                                    onButtonClick={() => removeSelected()}
                                    isButtonDisable={!selectedCount || isBusy}
                                    isLoading={isRemovingAll} 
                                    bgColor={"red"}
                                    classList="min-w-[155px]"
                                />
                            </div>
                        </div>

                        <div className="overflow-x-auto mb-2">
                            <Table 
                                headings={headings}
                                sortableColumns={sortableColumns}
                                onSortClick={toggleSortField}
                                sorts={sorts}
                            >
                                <tbody>
                                    {paginatedFruits.map((fruit) => (
                                        <tr 
                                            key={fruit.id}
                                            className={`
                                                transition-all duration-700 ease-in-out
                                                ${fruit.justAdded ? 'bg-green-100 animate-pulse' : ''}
                                                ${fruit.justEdited ? 'bg-yellow-100 animate-pulse' : ''}
                                                ${fruit.removing ? 'bg-red-200 animate-pulse' : ''}
                                              `} 
                                        >
                                            <td className="border border-gray-300 px-4 py-2 w-[50px]">
                                                <input 
                                                    type="checkbox"
                                                    title={fruit.selected ? "Deselect" : "Select"}
                                                    aria-label={fruit.selected ? `Deselect ${fruit.name}` : `Select ${fruit.name}`}
                                                    checked={fruit.selected}
                                                    disabled={isBusy}
                                                    onChange={() => selectItem(fruit.id)} 
                                                    className={isBusy ? "opacity-50 !cursor-not-allowed" : "!cursor-pointer"} 
                                                />
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{fruit.name}</td>
                                            <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{fruit.color}</td>
                                            <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{fruit.origin}</td>
                                            <td className="border border-gray-300 px-4 py-2 whitespace-nowrap w-[170px]">
                                                <Button 
                                                    text={"Edit"} 
                                                    ariaLabel={"Edit"} 
                                                    onButtonClick={() => edit(fruit.id, fruit.name, fruit.color, fruit.origin)} 
                                                    isButtonDisable={isBusy} 
                                                />
                                                <Button 
                                                    text={"Remove"} 
                                                    ariaLabel={"Remove"} 
                                                    onButtonClick={() => remove(fruit.id)} 
                                                    isButtonDisable={isBusy} 
                                                    isLoading={fruit.removing ?? false}
                                                    bgColor={"red"}
                                                    classList={"ml-2"} 
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                    </div>
                ) : (
                    <Nodata />
                )}
            </Main>
        </div>
    );
}

export default AlterData