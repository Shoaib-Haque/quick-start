import { useEffect, useState } from "react";
import Header from "./component/Header";
import Main from "./component/Main";

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
            <Header />
            <Main> 
                <button onClick={ handleClick }>Click</button><br></br>
                <input 
                    type="number" 
                    value={ age } 
                    onChange={ (e) => e.target.value ? setAge(Number(e.target.value)) : setAge("") } 
                    className="border-1 border-black-600"
                />
                <button onClick={ () => showName("Shoaib") }>Show Name</button>
            </Main> 
        </div>
    );
}

export default Events;