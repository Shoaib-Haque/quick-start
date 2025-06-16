import { useEffect, useState } from "react";
import Header from "./component/Header";
import Main from "./component/Main";
import PrimaryButton from "./component/PrimaryButton";
import DangerButton from "./component/DangerButton";
import Table from "./component/Table";
import Swal from 'sweetalert2';
import ItemsPerPageSelect from "./component/ItemsPerPageSelect";
import Pagination from "./component/Pagination";

function AlterData({ headline }) {
    const [fruits, setFruits] = useState([]);
    const [name, setName] = useState("");
    const [editId, setEditId] = useState(null);
    const [isSaving, setIsSaving] = useState(false);
    const [isRemovingAll, setIsRemovingAll] = useState(false);
    const [isAnySelected, setIsAnySelected] = useState(false);
    const headings = ['', 'Name', ''];
    const isAnyRemoving = fruits.some(fruit => fruit.removing);
    const isBusy = isSaving || isRemovingAll || isAnyRemoving;

    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        document.title = `${headline}`;
        const someFruits = [
            { id: 1, name: "Mango", selected: false },
            { id: 2, name: "Orange", selected: false },
            { id: 3, name: "Banana", selected: false },
            { id: 4, name: "Apple", selected: false },
            { id: 5, name: "Pineapple", selected: false },
            { id: 6, name: "Grapes", selected: false },
            { id: 7, name: "Watermelon", selected: false },
            { id: 8, name: "Papaya", selected: false },
            { id: 9, name: "Strawberry", selected: false },
            { id: 10, name: "Blueberry", selected: false },
            { id: 11, name: "Kiwi", selected: false },
            { id: 12, name: "Cherry", selected: false },
            { id: 13, name: "Peach", selected: false },
            { id: 14, name: "Guava", selected: false },
            { id: 15, name: "Lemon", selected: false },
            { id: 16, name: "Lychee", selected: false },
            { id: 17, name: "Pomegranate", selected: false },
            { id: 18, name: "Coconut", selected: false },
            { id: 19, name: "Apricot", selected: false },
            { id: 20, name: "Plum", selected: false },
            { id: 21, name: "Blackberry", selected: false },
            { id: 22, name: "Cantaloupe", selected: false },
            { id: 23, name: "Date", selected: false },
            { id: 24, name: "Elderberry", selected: false },
            { id: 25, name: "Fig", selected: false },
            { id: 26, name: "Gooseberry", selected: false },
            { id: 27, name: "Honeydew", selected: false },
            { id: 28, name: "Jackfruit", selected: false },
            { id: 29, name: "Kumquat", selected: false },
            { id: 30, name: "Longan", selected: false },
            { id: 31, name: "Mandarin", selected: false },
            { id: 32, name: "Nectarine", selected: false },
            { id: 33, name: "Olive", selected: false },
            { id: 34, name: "Papaw", selected: false },
            { id: 35, name: "Quince", selected: false },
            { id: 36, name: "Raspberry", selected: false },
            { id: 37, name: "Starfruit", selected: false },
            { id: 38, name: "Tangerine", selected: false },
            { id: 39, name: "Ugli Fruit", selected: false },
            { id: 40, name: "Voavanga", selected: false },
            { id: 41, name: "Wolfberry", selected: false },
            { id: 42, name: "Xigua", selected: false },
            { id: 43, name: "Yuzu", selected: false },
            { id: 44, name: "Ziziphus", selected: false },
            { id: 45, name: "Acai Berry", selected: false },
            { id: 46, name: "Babaco", selected: false },
            { id: 47, name: "Calamansi", selected: false },
            { id: 48, name: "Damson", selected: false },
            { id: 49, name: "Eggfruit", selected: false },
            { id: 50, name: "Feijoa", selected: false },
            { id: 51, name: "Gac", selected: false },
            { id: 52, name: "Hawthorn", selected: false },
            { id: 53, name: "Imbu", selected: false },
            { id: 54, name: "Jabuticaba", selected: false },
            { id: 55, name: "Kiwano", selected: false },
            { id: 56, name: "Lucuma", selected: false },
            { id: 57, name: "Miracle Fruit", selected: false },
            { id: 58, name: "Naranjilla", selected: false },
            { id: 59, name: "Ogen Melon", selected: false },
            { id: 60, name: "Pawpaw", selected: false },
            { id: 61, name: "Quandong", selected: false },
            { id: 62, name: "Rambutan", selected: false },
            { id: 63, name: "Soursop", selected: false },
            { id: 64, name: "Tamarillo", selected: false },
            { id: 65, name: "Umbu", selected: false },
            { id: 66, name: "Vanilla Bean", selected: false },
            { id: 67, name: "White Currant", selected: false },
            { id: 68, name: "Ximenia", selected: false },
            { id: 69, name: "Yellow Passion Fruit", selected: false },
            { id: 70, name: "Zig Zag Vine Fruit", selected: false },
            { id: 71, name: "African Cherry Orange", selected: false },
            { id: 72, name: "Barberry", selected: false },
            { id: 73, name: "Cempedak", selected: false },
            { id: 74, name: "Desert Lime", selected: false },
            { id: 75, name: "Emu Apple", selected: false },
            { id: 76, name: "Finger Lime", selected: false },
            { id: 77, name: "Grumichama", selected: false },
            { id: 78, name: "Hala Fruit", selected: false },
            { id: 79, name: "Indian Fig", selected: false },
            { id: 80, name: "Jujube", selected: false },
            { id: 81, name: "Kaffir Lime", selected: false },
            { id: 82, name: "Langsat", selected: false },
            { id: 83, name: "Mamey Sapote", selected: false },
            { id: 84, name: "Noni", selected: false },
            { id: 85, name: "Otaheite Apple", selected: false },
            { id: 86, name: "Pineberry", selected: false },
            { id: 87, name: "Quandong", selected: false },
            { id: 88, name: "Rose Apple", selected: false },
            { id: 89, name: "Santol", selected: false },
            { id: 90, name: "Tamarind", selected: false },
            { id: 91, name: "Ugni", selected: false },
            { id: 92, name: "Velvet Apple", selected: false },
            { id: 93, name: "White Sapote", selected: false },
            { id: 94, name: "Xango", selected: false },
            { id: 95, name: "Yellow Mombin", selected: false },
            { id: 96, name: "Zinfandel Grapes", selected: false },
            { id: 97, name: "Allspice", selected: false },
            { id: 98, name: "Bael Fruit", selected: false },
            { id: 99, name: "Cactus Fruit", selected: false },
            { id: 100, name: "Dragon Fruit", selected: false },
            { id: 101, name: "Elephant Apple", selected: false },
            { id: 102, name: "Fairchild Tangerine", selected: false },
            { id: 103, name: "Governor's Plum", selected: false },
            { id: 104, name: "Hackberry", selected: false },
            { id: 105, name: "Indian Jujube", selected: false },
            { id: 106, name: "Jostaberry", selected: false },
            { id: 107, name: "Kepel Fruit", selected: false },
            { id: 108, name: "Lime", selected: false },
            { id: 109, name: "Mangosteen", selected: false },
            { id: 110, name: "Nance", selected: false },
            { id: 111, name: "Orangeberry", selected: false },
            { id: 112, name: "Pandanus Fruit", selected: false },
            { id: 113, name: "Quandong", selected: false },
            { id: 114, name: "Raisin Tree Fruit", selected: false },
            { id: 115, name: "Salak", selected: false },
            { id: 116, name: "Tangelo", selected: false },
            { id: 117, name: "Uva Ursi", selected: false },
            { id: 118, name: "Voavanga", selected: false },
            { id: 119, name: "White Mulberry", selected: false },
            { id: 120, name: "Xylocarp", selected: false },
            { id: 121, name: "Yangmei", selected: false },
            { id: 122, name: "Zig Zag Fruit", selected: false },
            { id: 123, name: "Ambarella", selected: false },
            { id: 124, name: "Bilberry", selected: false },
            { id: 125, name: "Cupuacu", selected: false },
            { id: 126, name: "Damson Plum", selected: false },
            { id: 127, name: "Eleagnus", selected: false },
            { id: 128, name: "Fingered Citron", selected: false },
            { id: 129, name: "Goumi", selected: false },
            { id: 130, name: "Huckleberry", selected: false },
            { id: 131, name: "Ice Apple", selected: false },
            { id: 132, name: "Japanese Persimmon", selected: false },
            { id: 133, name: "Korean Melon", selected: false },
            { id: 134, name: "Lucuma Fruit", selected: false },
            { id: 135, name: "Malay Apple", selected: false },
            { id: 136, name: "Nectacot Fruit", selected: false },
            { id: 137, name: "Oil Palm Fruit", selected: false },
            { id: 138, name: "Pequi", selected: false },
            { id: 139, name: "Quandong Plum", selected: false },
            { id: 140, name: "Riberry", selected: false },
            { id: 141, name: "Saskatoon Berry", selected: false },
            { id: 142, name: "Tayberry", selected: false },
            { id: 143, name: "Ugni Berry", selected: false },
            { id: 144, name: "Velvet Tamarind", selected: false },
            { id: 145, name: "White Nectarine", selected: false },
            { id: 146, name: "Xoconostle", selected: false },
            { id: 147, name: "Yellow Raspberry", selected: false },
            { id: 148, name: "Zhe Fruit", selected: false },
            { id: 149, name: "Atemoya", selected: false },
            { id: 150, name: "Babassu", selected: false },
            { id: 151, name: "Camu Camu", selected: false },
            { id: 152, name: "Davidson's Plum", selected: false },
            { id: 153, name: "Entawak", selected: false },
            { id: 154, name: "Finger Lime Fruit", selected: false },
            { id: 155, name: "Giant Granadilla", selected: false },
            { id: 156, name: "Hog Plum", selected: false },
            { id: 157, name: "Ilama", selected: false },
            { id: 158, name: "Jocote", selected: false },
            { id: 159, name: "Kiwano Horned Melon", selected: false },
            { id: 160, name: "Lilly Pilly", selected: false },
            { id: 161, name: "Mammee Apple", selected: false },
            { id: 162, name: "Noni Fruit", selected: false },
            { id: 163, name: "Ogeechee Lime", selected: false },
            { id: 164, name: "Pepino", selected: false },
            { id: 165, name: "Quandong Fruit", selected: false },
            { id: 166, name: "Rose Hip", selected: false },
            { id: 167, name: "Santol Fruit", selected: false },
            { id: 168, name: "Tamarillo Fruit", selected: false },
            { id: 169, name: "Uvalha", selected: false },
            { id: 170, name: "Velvet Tamarind Fruit", selected: false },
            { id: 171, name: "White Mulberry Fruit", selected: false },
            { id: 172, name: "Ximenia Americana", selected: false },
            { id: 173, name: "Yellow Watermelon", selected: false },
            { id: 174, name: "Zhe Fruit Tree", selected: false },
            { id: 175, name: "Alligator Apple", selected: false },
            { id: 176, name: "Black Sapote", selected: false },
            { id: 177, name: "Cedar Bay Cherry", selected: false },
            { id: 178, name: "Duku", selected: false },
            { id: 179, name: "Elephant Heart Plum", selected: false },
            { id: 180, name: "Fairchild Tangerine Fruit", selected: false },
            { id: 181, name: "Giant Star Apple", selected: false },
            { id: 182, name: "Hog Plum Fruit", selected: false },
            { id: 183, name: "Ice Cream Bean", selected: false },
            { id: 184, name: "Japanese Raisin Tree", selected: false },
            { id: 185, name: "Kepel Fruit Tree", selected: false },
            { id: 186, name: "Langsat Fruit", selected: false },
            { id: 187, name: "Monkey Orange", selected: false },
            { id: 188, name: "Nutmeg Fruit", selected: false },
            { id: 189, name: "Oil Palm Fruit Tree", selected: false },
            { id: 190, name: "Peach Palm Fruit", selected: false },
            { id: 191, name: "Quandong Fruit Tree", selected: false },
            { id: 192, name: "Red Mombin", selected: false },
            { id: 193, name: "Sapodilla", selected: false },
            { id: 194, name: "Tangelo Fruit", selected: false },
            { id: 195, name: "Ugni Fruit", selected: false },
            { id: 196, name: "Vanilla Fruit", selected: false },
            { id: 197, name: "White Currant Fruit", selected: false },
            { id: 198, name: "Xylocarp Fruit", selected: false },
            { id: 199, name: "Yellow Passionfruit", selected: false },
            { id: 200, name: "Ziziphus Fruit", selected: false }
          ];          
        setFruits(someFruits);
    }, []);

    // Pagination slicing
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedFruits = fruits.slice(startIndex, startIndex + itemsPerPage);

    // When itemsPerPage changes, reset currentPage to 1
    useEffect(() => {
        setCurrentPage(1);
    }, [itemsPerPage]);

    const save = () => {
        setIsSaving(true);
        setTimeout(() => {
            let trimmedName = name.trim();
            setName(trimmedName);

            if(!trimmedName) {
                setEditId(null);
                setIsSaving(false);
                return;
            }

            const isDuplicate = fruits.some(fruit =>
                fruit.name.toLowerCase() === trimmedName.toLowerCase() &&
                fruit.id !== editId
            );
        
            if (isDuplicate) {
                Swal.fire({
                    title: 'Error!',
                    text: "Fruit name already exists!",
                    icon: 'error',
                    confirmButtonText: 'OK'
                })
                setIsSaving(false);
                return;
            }

            if(editId) {
                let updatedFruits = fruits.map((fruit) =>
                    fruit.id === editId ? { ...fruit, name, justEdited: true } : fruit
                );
                setFruits(updatedFruits);
            
                setTimeout(() => {
                    setFruits((prev) =>
                        prev.map((f) => (f.id === editId ? { ...f, justEdited: false } : f))
                    );
                }, 1000);
            } else {
                let latest_id = fruits.length ? fruits[fruits.length-1].id+1 : 1;
                let newFruit = {
                    id: latest_id,
                    name: trimmedName,
                    selected: false,
                    justAdded: true,
                  };
                  setFruits((prev) => [...prev, newFruit]);
                  
                  // Remove the justAdded flag after animation duration
                  setTimeout(() => {
                    setFruits((prev) =>
                      prev.map((f) => (f.id === latest_id ? { ...f, justAdded: false } : f))
                    );
                  }, 1000);
            }
            clear();
            setIsSaving(false);
        }, 2000);
    };

    const edit = (name, id) => {
        setName(name);
        setEditId(id);
        document.getElementById('fruit-input')?.focus();
    }

    const remove = (key) => {
        confirmDialog('Are you sure?', 'This action cannot be undone!', 'Yes, delete it!')
        .then((result) => {
            if (result.isConfirmed) {
                let updatedFruits = fruits.map((fruit) =>
                    fruit.id === key ? {  ...fruit, removing: true } : fruit
                );
                setFruits(updatedFruits);
                // setFruits(prev => prev.filter((fruit) => fruit.id !== key)); // This is better
                setTimeout(() => {
                    let updatedFruits = fruits.filter((fruit) => 
                        fruit.id != key
                    );
                    setFruits(updatedFruits);
                    checkIsAnySelected(updatedFruits);
                    Swal.fire('Deleted!', 'The item has been deleted.', 'success');
                }, 3000)
            }
        });
    };

    const handleKeyDown = (e) => {
        if(e.key === "Enter") {
            save();
        }
    };

    const clear = () => {
        setName("");
        setEditId(null);
    };

    const selectAll = () => {
        const anySelected = fruits.some(fruit => fruit.selected);
        let updatedFruits;
        if(anySelected) {
            updatedFruits = fruits.map(fruit => ({
                ...fruit,
                selected: false
            }));
        } else {
            updatedFruits = fruits.map(fruit => ({
                ...fruit,
                selected: true
            }));
        }
        setFruits(updatedFruits);
        checkIsAnySelected(updatedFruits);
    };

    const selectItem = (id) => {
        let updatedFruits = fruits.map((fruit) =>
            fruit.id === id ? {  ...fruit, selected: !fruit.selected } : fruit
        );
        setFruits(updatedFruits);
        checkIsAnySelected(updatedFruits);
    }

    const checkIsAnySelected = (updatedFruits) => {
        const anySelected = updatedFruits.some(fruit => fruit.selected);
        setIsAnySelected(anySelected);
    };

    const removeSelected = () => {
        confirmDialog('Are you sure?', 'This action cannot be undone!', 'Yes, delete selected items!')
        .then((result) => {
            if (result.isConfirmed) {
                setIsRemovingAll(true);

                // First: mark all selected fruits as removing
                setFruits(prev =>
                    prev.map(fruit =>
                        fruit.selected ? { ...fruit, removing: true } : fruit
                    )
                );

                // Second: wait for animation to play
                setTimeout(() => {
                    setFruits(prev => {
                        const updated = prev.filter(fruit => !fruit.selected);
                        checkIsAnySelected(updated);
                        return updated;
                    });

                    Swal.fire('Deleted!', 'All the selected items have been deleted.', 'success');
                    setIsRemovingAll(false);
                    setIsAnySelected(false);
                }, 1000); // matches the CSS animation duration
            }
        });
    };

    const confirmDialog = (title, text, confirmText) => {
        return Swal.fire({
          title,
          text,
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor: '#3085d6',
          confirmButtonText: confirmText,
        });
      };

    return (
        <div>
            <Header />
            <Main headline={ headline }>  
                <div className="mb-4">
                    <input 
                        type="text" 
                        value={ name }
                        placeholder="Enter Fruit  Name"
                        disabled={ isBusy }
                        onChange={ (e) => setName(e.target.value) }
                        onKeyDown={ handleKeyDown }
                        id="fruit-input"
                        className={ `border-1 border-black-600 p-1 ${isBusy ? "opacity-50 !cursor-not-allowed" : "" }` } />
                    <PrimaryButton 
                        text={ editId ? "Update" : "Add Fruit" } 
                        onButtonClick={ save } 
                        isButtonDisable={ !name.trim() || isBusy } 
                        isLoading={ isSaving } 
                        classList={ "ml-2" } />
                    <PrimaryButton 
                        text={ "Clear" } 
                        onButtonClick={ clear } 
                        isButtonDisable={ !name || isBusy } 
                        classList={ "ml-2" } />
                </div>
                {fruits.length > 0 ? (
                    <div className="mb-2">
                        <table className="w-full">
                            <tbody>
                                <tr key="controls-row">
                                    <td className="px-4 py-2 w-[50px]">
                                        <input 
                                            type="checkbox"
                                            title={ isAnySelected ? "Deselect All" : "Select All" }
                                            checked={ isAnySelected }
                                            disabled={ isBusy }
                                            onChange={ selectAll }
                                            className={ isBusy ? "opacity-50 !cursor-not-allowed" : "!cursor-pointer" } />
                                    </td>
                                    <td className="px-4 py-2 w-full text-right">
                                        <DangerButton 
                                            text={ "Remove Selected" } 
                                            onButtonClick={ () => removeSelected() }
                                            isButtonDisable={ !isAnySelected || isBusy }
                                            isLoading={ isRemovingAll } />
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className="overflow-x-auto">
                            <Table headings={ headings }>
                                <tbody>
                                    {paginatedFruits.map((fruit) => (
                                        <tr 
                                            key={ fruit.id }
                                            className={`
                                                transition-all duration-700 ease-in-out
                                                ${fruit.justAdded ? 'bg-green-100 animate-pulse' : ''}
                                                ${fruit.justEdited ? 'bg-yellow-100 animate-pulse' : ''}
                                                ${fruit.removing ? 'bg-red-200 animate-pulse' : ''}
                                              `} >
                                            <td className="border border-gray-300 px-4 py-2 w-[50px]">
                                                <input 
                                                    type="checkbox"
                                                    title={ fruit.selected ? "Deselect" : "Select" }
                                                    checked={ fruit.selected }
                                                    disabled={ isBusy }
                                                    onChange={ () => selectItem(fruit.id) } 
                                                    className={ isBusy ? "opacity-50 !cursor-not-allowed" : "!cursor-pointer" } />
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2 whitespace-nowrap">{ fruit.name }</td>
                                            <td className="border border-gray-300 px-4 py-2 whitespace-nowrap w-[170px]">
                                                <PrimaryButton 
                                                    text={ "Edit" } 
                                                    onButtonClick={ () => edit(fruit.name, fruit.id) } 
                                                    isButtonDisable={ isBusy } />
                                                <DangerButton 
                                                    text={ "Remove" } 
                                                    onButtonClick={ () => remove(fruit.id) } 
                                                    isButtonDisable={ isBusy } 
                                                    isLoading={ fruit.removing ?? false }
                                                    classList={ "ml-2" } />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </div>
                        <div className="mb-4 flex justify-between">
                            {/* Items per page selector */}
                            <ItemsPerPageSelect
                                itemsPerPage={ itemsPerPage }
                                onOptionChange={ (e) => setItemsPerPage(Number(e.target.value)) }
                                isBusy={ isBusy }/>
                            {/* Pagination */}
                            <Pagination
                                totalItems={ fruits.length }
                                itemsPerPage={ itemsPerPage }
                                currentPage={ currentPage }
                                onPageChange={ setCurrentPage }
                                isBusy={ isBusy } />
                        </div>
                    </div>
                ) : (
                    <span>No Data</span>
                )}
            </Main>
        </div>
    );
}

export default AlterData