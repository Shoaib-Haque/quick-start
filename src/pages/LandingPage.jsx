import { useEffect } from "react"

/* 

React components are JavaScript functions that return markup:

function MyButton() {
  return (
    <button>I'm a button</button>
  );
}

*/

function LandingPage() {
    useEffect(() => {
        document.title = "Quick Start"
    }, []);

    return (
        <div>
            <h1>Welcome to Quick Start</h1>
            <a href="/display-data">Display Data</a><br></br>
            <a href="/render-list">Render List</a><br></br>
            <a href="/responding-events">Responding Events</a><br></br>
            <a href="/alter-data">Alter Data</a><br></br>
            <a href="/button-work-separately">Button Work Separately</a><br />
            <a href="/button-work-together">Button Work Together</a><br />
            <a href="/tic-toc-toe">Tic Toc Toe</a>
        </div>
    );
}

export default LandingPage