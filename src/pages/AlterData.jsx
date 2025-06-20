import { useEffect, useState, useMemo } from "react";
import { someFruits } from "../assets/data/fruits";
import { helperAddSelectionFlag, helperSort, helperDeleteConfirmDialog, helperSuccessDialog, helperToastWithUndo, helperExportToCSV, helperGetSearchWords, helperFilterItems, helperPaginateItems, helperSaveAndReposition, helperRemoveTemporaryFlag } from '../utils/helper';
import debounce from 'lodash.debounce';
import Header from "./component/Header";
import Main from "./component/Main";
import Button from "./component/Button";
import FormInput from "./component/FormInput";
import Table from "./component/Table";
import DataTableRow from "./component/DataTableRow";
import Pagination from "./component/Pagination";
import Search from "./component/Search";
import Modal from "./component/Modal";
import ExportOptionModal from './component/ExportOptionModal';
import Nodata from "./component/NoData";
import { Edit, Trash2 } from "lucide-react";

function AlterData({headline}) {
    const [fruits, setFruits] = useState([]);
    const [name, setName] = useState("");
    const [color, setColor] = useState("");
    const [origin, setOrigin] = useState("");
    const [editId, setEditId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [isSaving, setIsSaving] = useState(false);
    const [isExporting, setIsExporting] = useState(false);
    const [isRemovingAll, setIsRemovingAll] = useState(false);
    const isAnyRemoving = fruits.some(fruit => fruit.removing);
    const isBusy = isSaving || isRemovingAll || isAnyRemoving || isExporting;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isExportModalOpen, setIsExportModalOpen] = useState(false);
    const headings = [
        { label: "", width: "50px" }, // checkbox
        { label: "Name", width: "minmax(120px, 1fr)" },
        { label: "Color", width: "minmax(120px, 1fr)" },
        { label: "Origin", width: "minmax(120px, 1fr)" },
        { label: "", width: "100px" }, // actions
    ];
    const sortableColumns = [null, "name", "color", null, null];
    const [sorts, setSorts] = useState({
        name: null,   // 'asc' | 'desc' | null
        color: null,  // 'asc' | 'desc' | null
    });
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastDeletedItems, setLastDeletedItems] = useState([]);
    const [errors, setErrors] = useState({});

    // Only runs when the component mounts. 
    useEffect(() => {
        document.title = `${headline}`;        
        setFruits(helperAddSelectionFlag({items: someFruits}));
    }, []);

    /* 
    useMemo is a React hook that:

    Caches the result of a computation,
    Only recomputes when its dependencies change,
    Helps optimize performance, especially for expensive calculations.
    */

    // Only updates when searchTerm changes
    const searchWords = useMemo(() => 
        helperGetSearchWords({searchTerm: searchTerm}), 
    [searchTerm]);
    
    // Updates → When either fruits or searchWords changes.
    const filteredFruits = useMemo(() => 
        helperFilterItems({items: fruits, searchWords: searchWords, fieldsToSearch: ['name', 'color', 'origin']}),
    [fruits, searchWords]);
    
    // Updates → When filtered results or sort rules change.
    const sortedFruits = useMemo(() => {
        return helperSort({items: filteredFruits, sorts: sorts, sortOrder: ['name', 'color']});
    }, [filteredFruits, sorts]);
    
    // Updates → When sorting changes, page changes, or page size changes.
    const paginatedFruits = useMemo(() => 
        helperPaginateItems({items: sortedFruits, currentPage: currentPage, itemsPerPage: itemsPerPage}),
    [sortedFruits, currentPage, itemsPerPage]);

    // Runs every time filteredFruits or itemsPerPage changes.
    useEffect(() => {
        const totalPages = Math.ceil(filteredFruits.length / itemsPerPage);
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
        
    }, [filteredFruits, itemsPerPage]);

    // checks if there is at least one item on the current page (paginatedFruits) that is not being removed.
    const hasSelectableItems = paginatedFruits.some(f => !f.removing); 
    // Check the full list
    const selectedCount = fruits.filter(fruit => fruit.selected).length;

    const save = () => {
        const trimmedName = name.trim();
        const trimmedColor = color.trim();
        const trimmedOrigin = origin.trim();
      
        const newErrors = {};
        if (!trimmedName) {
          newErrors.name = "Name is required!";
        } else if (
          fruits.some(
            (fruit) =>
              fruit.name.toLowerCase() === trimmedName.toLowerCase() &&
              fruit.id !== editId
          )
        ) {
          newErrors.name = "Name already exists!";
        }
      
        if (!trimmedColor) newErrors.color = "Color is required!";
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
      
        setErrors({});
        setIsSaving(true);
      
        setTimeout(() => {
          const latestId = Math.max(0, ...fruits.map((f) => f.id)) + 1;
          const id = editId || latestId;
      
          const newFruit = {
            id,
            name: trimmedName,
            color: trimmedColor,
            origin: trimmedOrigin,
            selected: false,
            ...(editId ? { justEdited: true } : { justAdded: true }),
          };
      
          // 🧠 Reuse helper
          helperSaveAndReposition({
            items: fruits,
            newItem: newFruit,
            editId,
            searchWords,
            sorts,
            itemsPerPage,
            setItems: setFruits,
            setCurrentPage,
            fieldsToSearch: ['name', 'color', 'origin'],
            sortOrder: ['name', 'color'],
          });
      
          helperSuccessDialog({ title: editId ? "Fruit Edited!" : "Fruit Added!" });
      
          // Clean up justEdited/justAdded flag
          helperRemoveTemporaryFlag({
            setItems: setFruits,
            id,
            flag: editId ? "justEdited" : "justAdded",
          });
      
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

        helperToastWithUndo({
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
    
        helperDeleteConfirmDialog({
            title: "Are you sure?",
            confirmText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // Mark item as removing to show loading icon in button
                setFruits(prev => 
                    prev.map(fruit => fruit.id === id ? { ...fruit, removing: true } : fruit)
                );
    
                // Wait for animation, then delete
                setTimeout(() => {
                    deleteItems([itemToDelete]);
                }, 500); // match your CSS animation
            }
        });
    };

    const removeSelected = () => {
        const itemsToDelete = fruits.filter(fruit => fruit.selected);
        if (itemsToDelete.length === 0) return;
    
        helperDeleteConfirmDialog({title: 'Are you sure?', confirmText: 'Yes, delete selected items!'})
        .then((result) => {
            if (result.isConfirmed) {
                setIsRemovingAll(true);
                setFruits(prev =>
                    prev.map(fruit =>
                        fruit.selected ? {...fruit, removing: true } : fruit
                    )
                );
    
                // Wait for animation, then delete
                setTimeout(() => {
                    deleteItems(itemsToDelete);
                    setIsRemovingAll(false);
                }, 500); // match your CSS animation
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

    const exportColumns = [
        { label: "Id", key: "id" },
        { label: "Name", key: "name" },
        { label: "Color", key: "color" },
        { label: "Origin", key: "origin" },
    ];

    const handleExportClick = () => {
        setIsExportModalOpen(true);
    };
      
    const handleExport = (type) => {
        setIsExportModalOpen(false);
        setIsExporting(true);
      
        setTimeout(() => {
          let exportData = [];
      
          if (type === "search") {
            exportData = filteredFruits;
          } else if (type === "page") {
            exportData = paginatedFruits;
          } else if (type === "selected") {
            exportData = fruits.filter((f) => f.selected);
          }
      
          if (exportData.length === 0) {
            alert("No data to export.");
          } else {
            helperExportToCSV({
              data: exportData,
              filename: `fruits-${type}.csv`,
              columns: exportColumns,
            });
          }
      
          setIsExporting(false);
        }, 2000);
    };
      

    const getRemoveButtonText = () => {
        return selectedCount > 0 
        ? `Remove ${selectedCount} item${selectedCount > 1 ? 's' : ''}`
        : "Remove Selected"
    }

    const columns = [
        {
          key: "select",
          width: "50px",
          isCheckbox: true, // special flag for checkbox column
        },
        {
          key: "name",
          width: "minmax(120px, 1fr)",
        },
        {
          key: "color",
          width: "minmax(120px, 1fr)",
        },
        {
          key: "origin",
          width: "minmax(120px, 1fr)",
        },
        {
          key: "actions",
          width: "100px",
          isActions: true,
          render: (fruit, { onEdit, onRemove, isBusy }) => (
            <>
              <Button
                ariaLabel="Edit"
                onButtonClick={() => onEdit(fruit.id, fruit.name, fruit.color, fruit.origin)}
                isButtonDisable={isBusy}
                title="Edit"
                bgColor="gray"
                variant="icon"
              >
                <Edit className="w-5 h-5" />
              </Button>
              <Button
                ariaLabel="Remove"
                onButtonClick={() => onRemove(fruit.id)}
                isButtonDisable={isBusy}
                bgColor="red"
                variant="icon"
                classList="ml-2"
                title="Remove"
              >
                <Trash2 className="w-5 h-5" />
              </Button>
            </>
          ),
        },
    ];
    
    // Handlers to pass to DataTableRow
    const handlers = {
        onSelect: selectItem,
        onEdit: edit,
        onRemove: remove,
        isBusy,
    };

    // Row rendering function for Table
    const renderRow = (fruit) => (
        <DataTableRow key={fruit.id} item={fruit} columns={columns} handlers={handlers} isBusy={isBusy} />
    );

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
                            title={!filteredFruits.length ? "No Data To Export" : ''}
                            onButtonClick={handleExportClick} 
                            bgColor={"gray"}
                            isButtonDisable={!filteredFruits.length || isBusy}
                            isLoading={isExporting}
                        />
                        <ExportOptionModal 
                            isOpen={isExportModalOpen}
                            onClose={() => setIsExportModalOpen(false)}
                            onExport={handleExport}
                            isBusy={isBusy}
                            hasSelectedItems={selectedCount > 0}
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
                                        bgColor={"green"}
                                    />
                                    <Button 
                                        text={"Clear"} 
                                        ariaLabel={"Clear"}
                                        onButtonClick={clear} 
                                        isButtonDisable={isBusy}
                                        bgColor={"red"}
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
                                    title={!selectedCount ? 'Select to Remove' : ''}
                                    ariaLabel={getRemoveButtonText()}
                                    onButtonClick={() => removeSelected()}
                                    isButtonDisable={!selectedCount || isBusy}
                                    bgColor={"red"}
                                    classList="min-w-[155px]"
                                />
                            </div>
                        </div>

                        <Table
                            headings={headings}
                            sortableColumns={sortableColumns}
                            onSortClick={toggleSortField}
                            sorts={sorts}
                            data={paginatedFruits}
                            renderRow={renderRow}
                        />
                    </div>
                ) : (
                    <Nodata />
                )}
            </Main>
        </div>
    );
}

export default AlterData