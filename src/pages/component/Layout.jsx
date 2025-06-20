import Header from "./Header";
import { useState } from "react";

export default function Layout({ children, headline }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <Header onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      </div>
      <div className="flex pt-16 min-h-screen">
        <aside
            className={`w-[360px] bg-gray-200 p-4 overflow-auto transition-all duration-300 ${
                sidebarOpen ? "block" : "hidden"
            }`}
            style={{ minWidth: 320 }}
            >
            Sidebar content here
        </aside>
        <main className="flex-1 flex flex-col overflow-auto">
          <div className="flex-grow p-4">
            <h1 className="mb-4 text-xl font-bold">{headline}</h1>
            {children}
          </div>
          <footer className="mt-auto flex items-center justify-center h-20 bg-gray-100 text-gray-700" style={{ minHeight: "5rem" }}>
            Footer content centered vertically
          </footer>
        </main>
      </div>
    </>
  );
}
