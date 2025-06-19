import { useEffect, useState } from "react";
import Header from "./component/Header";
import Main from "./component/Main";
import Button from './component/Button'

function Events({ headline }) {
    let [age, setAge] = useState("");

    useEffect(() => {
        document.title = `${headline}`
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
            <Main headline={ headline }> 
                <input 
                    type="number" 
                    value={ age } 
                    onChange={ (e) => e.target.value ? setAge(Number(e.target.value)) : setAge("") } 
                    className="border-1 border-black-600"
                />
                <Button text={ 'Click' } onButtonClick={ handleClick } classList={ "ml-2" } />
                <Button text={ 'Show Name' } onButtonClick={ () => showName("Shoaib") } classList={ "ml-2" } />
            </Main> 
        </div>
    );
}

export default Events;