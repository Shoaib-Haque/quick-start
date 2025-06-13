import { useEffect } from "react";
import Header from "./component/Header";
import Main from "./component/Main";

function DisplayingData({ headline }) {
    useEffect(() => {
        document.title = `${headline}`
    }, []);

    const user = {
        name: "Shoaib",
        age: 28,
    };

    return (
        <div>
            <Header />
            <Main headline={ headline }> 
                <label htmlFor="name">Name: </label><span>{ user.name }</span><br></br>
                <label htmlFor="age">Name: </label><span>{ user.age }</span>
            </Main> 
        </div>
    );
}

export default DisplayingData;