import { useEffect } from "react"

function LandingPage() {
    useEffect(() => {
        document.title = "Quick Start"
    }, [])
    return (
        <div>
            <h1>Welcome to Quick Start</h1>
        </div>
    )
}

export default LandingPage