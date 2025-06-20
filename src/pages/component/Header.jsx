import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

const menus = [
  {url: '/display-data', text: 'Display Data'},
  {url: '/render-list', text: 'Render List'},
  {url: '/responding-events', text: 'Responding Events'},
  {url: '/fruits', text: 'Fruits'},
  {url: '/button-work-separately', text: 'Button Work Separately'},
  {url: '/button-work-together', text: 'Button Work Together'},
  {url: '/tic-toc-toe', text: 'Tic Toc Toe'},
]

export default function Header({ onToggleSidebar }) {
  return (
    <Disclosure as="nav" className="bg-gray-800 h-16 flex items-center px-2 sm:px-6 lg:px-8">
      {/* Sidebar toggle button for small screens */}
      <div className="sm:hidden mr-4">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-gray-700 p-2 text-gray-200 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Toggle sidebar"
          onClick={onToggleSidebar}
        >
          {/* Hamburger icon */}
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* Logo */}
      <div className="flex flex-1 items-center">
        <img
          alt="Your Company"
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
          className="h-8 w-auto"
        />
      </div>

      {/* Profile dropdown menu */}
      <Menu as="div" className="relative ml-3">
        <div>
          <MenuButton className="relative flex rounded-full bg-white text-sm p-2.5 focus:outline-none">
            <span className="absolute -inset-1.5" />
            <span className="sr-only">Open user menu</span>
            Menu
          </MenuButton>
        </div>
        <MenuItems
          className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 focus:outline-none"
        >
          {menus.map((menu, index) => (
            <MenuItem key={index}>
              {({ active }) => (
                <a
                  href={menu.url}
                  className={`block px-4 py-2 text-sm text-gray-700 ${active ? "bg-gray-100" : ""}`}
                >
                  {menu.text}
                </a>
              )}
            </MenuItem>
          ))}
        </MenuItems>
      </Menu>
    </Disclosure>
  );
}
