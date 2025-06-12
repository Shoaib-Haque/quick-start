import { useEffect } from "react";

function DisplayingData() {
    useEffect(() => {
        document.title = "Display Data"
    }, []);

    const user = {
        name: "Shoaib",
        age: 28,
    };

    return (
        <div>
            <label htmlFor="name">Name: </label><span>{ user.name }</span><br></br>
            <label htmlFor="age">Name: </label><span>{ user.age }</span>
        </div>
    );
}

export default DisplayingData;