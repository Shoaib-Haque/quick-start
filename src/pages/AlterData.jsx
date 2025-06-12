import { useEffect, useState } from "react";

function AlterData() {
    let [fruits, setFruits] = useState([]);
    let [name, setName] = useState("");
    let [editId, setEditId] = useState(null);
    let [editButton, setEditButton] = useState("Add Fruit")

    useEffect(() => {
        document.title = "Alter List"
    }, []);

    const add = () => {
        let trimmedName = name.trim();
        setName(trimmedName);

        if(!trimmedName) {
            setEditId(null);
            setEditButton("Add Fruit");
            return;
        }

        const isDuplicate = fruits.some(fruit =>
            fruit.name.toLowerCase() === trimmedName.toLowerCase() &&
            fruit.id !== editId
        );
    
        if (isDuplicate) {
            alert("Fruit name already exists!");
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
    };

    const edit = (name, id) => {
        setName(name);
        setEditId(id);
        setEditButton("Update");
    }

    const remove = (key) => {
        let updatedFruits = fruits.filter((fruit) => 
            fruit.id != key
        );
        setFruits(updatedFruits);
    };

    const handleKeyDown = (e) => {
        if(e.key === "Enter") {
            add();
        }
    };

    const clear = () => {
        setName("");
        setEditId(null);
        setEditButton("Add Fruit");
    }

    return (
        <div>
            <input 
                type="text" 
                value={ name }
                onChange={ (e) => setName(e.target.value) }
                onKeyDown={ handleKeyDown }
            />
            <button onClick={add} disabled={ !name.trim() } >{ editButton }</button>
            <button onClick={clear} >Clear</button>
            <ul>
                {fruits.map((fruit) => (
                    <li key={ fruit.id }>{ fruit.name }
                        <button onClick={ (e) => edit(fruit.name, fruit.id) }>Edit</button>
                        <button onClick={ (e) => remove(fruit.id) }>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AlterData