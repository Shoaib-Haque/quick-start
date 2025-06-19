export default function Main({ headline = "", children }) {
    return (
        <main className="px-2 py-2 sm:px-6 lg:px-8">
            <h1 className="mb-2"> { headline } </h1>
            { children }
        </main>
    )
}