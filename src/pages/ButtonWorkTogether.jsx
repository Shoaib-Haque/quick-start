import { useEffect, useState } from "react";
import Header from "./component/Header";
import Main from "./component/Main";

let ButtonWorkTogether = () => {
    useEffect(() => {
        document.title = "Buttons Work Together";
    }, []);

    /* 
    Using Hooks 
        Functions starting with use are called Hooks. useState is a built-in Hook provided by React. 

    Sharing data between components 
        To make both MyButton components display the same count and update together, you need to move the state from the individual buttons “upwards” to the closest component containing all of them.
    */
    let [count, setCount] = useState(0);

    let handleClick = () => {
        setCount(++count);
    };

    return (
        <div>
            <Header />
            <Main> 
                <h1>Counters that update together</h1>
                <MyButton count={count} onClick={handleClick} />
                <MyButton count={count} onClick={handleClick} />
            </Main> 
        </div>
    );
}

let MyButton = ({count, onClick}) => {
    return (
        <button onClick={onClick}>Together clicked {count} times</button>
    );
}

export default ButtonWorkTogether;