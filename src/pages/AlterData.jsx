import { useEffect, useState } from "react";
import Header from "./component/Header";
import Main from "./component/Main";
import PrimaryButton from "./component/PrimaryButton";
import DangerButton from "./component/DangerButton";
import Table from "./component/Table";
import Swal from 'sweetalert2';

function AlterData({ headline }) {
    let [fruits, setFruits] = useState([]);
    let [name, setName] = useState("");
    let [editId, setEditId] = useState(null);
    let [editButton, setEditButton] = useState("Add Fruit");
    let [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        document.title = `${headline}`
    }, []);

    const save = () => {
        setIsSaving(true);
        setTimeout(() => {
            let trimmedName = name.trim();
            setName(trimmedName);

            if(!trimmedName) {
                setEditId(null);
                setEditButton("Add Fruit");
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
                    fruit.id === editId ? {  ...fruit, name } : fruit
                );
                setFruits(updatedFruits);
            } else {
                let latest_id = fruits.length ? fruits[fruits.length-1].id+1 : 1;
                let newFruit = {
                    id: latest_id,
                    name: trimmedName, 
                }
                setFruits([...fruits, newFruit]);
            }
            clear();
            setIsSaving(false);
        }, 1000);
    };

    const edit = (name, id) => {
        setName(name);
        setEditId(id);
        setEditButton("Update");
    }

    const remove = (key) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                let updatedFruits = fruits.filter((fruit) => 
                    fruit.id != key
                );
                setFruits(updatedFruits);
                Swal.fire('Deleted!', 'The item has been deleted.', 'success');
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
        setEditButton("Add Fruit");
    };

    const headings = [
        'Name', ''
    ]

    return (
        <div>
            <Header />
            <Main headline={ headline }>  
                <div className="mb-4">
                    <input 
                        type="text" 
                        value={ name }
                        onChange={ (e) => setName(e.target.value) }
                        onKeyDown={ handleKeyDown }
                        className="border-1 border-black-600 p-1"
                    />
                    <PrimaryButton text={ editButton } onButtonClick={ save } isButtonDisable={ !name.trim() || isSaving } isLoading={ isSaving } classList={ "ml-2" } />
                    <PrimaryButton text={ "Clear" } onButtonClick={ clear } isButtonDisable={ !name || isSaving } classList={ "ml-2" } />
                </div>
                {fruits.length > 0 ? (
                    <Table headings={ headings }>
                        <tbody>
                            {fruits.map((fruit) => (
                                <tr key={ fruit.id }>
                                    <td className="border border-gray-300 px-4 py-2">{ fruit.name }</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <PrimaryButton text={ "Edit" } onButtonClick={ (e) => edit(fruit.name, fruit.id) } isButtonDisable={ isSaving } />
                                        <DangerButton text={ "Remove" } onButtonClick={ (e) => remove(fruit.id) } isButtonDisable={ isSaving } classList={ "ml-2" } />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                ) : (
                    <span>No Data</span>
                )}
            </Main>
        </div>
    );
}

export default AlterData