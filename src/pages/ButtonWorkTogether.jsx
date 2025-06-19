import { useEffect, useState } from "react";
import Header from "./component/Header";
import Main from "./component/Main";
import Button from "./component/Button";

let ButtonWorkTogether = ({ headline }) => {
    useEffect(() => {
        document.title = `${headline}`
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
            <Main headline={ headline }> 
                <MyButton count={count} onClick={handleClick} />
                <MyButton count={count} onClick={handleClick} />
            </Main> 
        </div>
    );
}

let MyButton = ({count, onClick}) => {
    return (
        <Button text={ `Together Clicked ${count} Times` } onButtonClick={ onClick } classList={ "mr-2" } />
    );
}

export default ButtonWorkTogether;