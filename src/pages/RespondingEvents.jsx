import { useEffect, useState } from "react";

function Events() {
    let [age, setAge] = useState("");

    useEffect(() => {
        document.title = "Responding Events";
    }, []);

    let handleClick = () => {
        alert("Clicked");
    };

    let showName = (name) => {
        alert(name + ", Age: " + age);
    };

    return (
        <div>
            <button onClick={ handleClick }>Click</button><br></br>
            <input 
                type="number" 
                value={ age } 
                onChange={ (e) => e.target.value ? setAge(Number(e.target.value)) : setAge("") } 
            />
            <button onClick={ () => showName("Shoaib") }>Show Name</button>
        </div>
    );
}

export default Events;