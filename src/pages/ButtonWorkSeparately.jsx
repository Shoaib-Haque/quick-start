
import { useEffect, useState } from "react";
import Header from "./component/Header";
import Main from "./component/Main";
import PrimaryButton from "./component/PrimaryButton";

export default function ButtonWorkSeparately({ headline }) {
    useEffect(() => {
        document.title = `${headline}`
    }, [])
    return (
      <div>
        <Header />
        <Main headline={ headline }> 
            <MyButton />
            <MyButton />
        </Main> 
      </div>
    );
}

/* 
Often, you’ll want your component to “remember” some information and display it. For example, maybe you want to count the number of times a button is clicked. To do this, add state to your component.
You’ll get two things from useState: the current state (count), and the function that lets you update it (setCount). You can give them any names, but the convention is to write [something, setSomething].


If you render the same component multiple times, each will get its own state.
Here every time the MyButton component is used, it creates its own state variable
*/
  
function MyButton() {
    let [count, setCount] = useState(0);

    function handleClick() {
        setCount(++count);
    }

    return (
        <PrimaryButton text={ `Clicked ${count} Times` } onButtonClick={ handleClick } classList={ "mr-2" } />
    );
}