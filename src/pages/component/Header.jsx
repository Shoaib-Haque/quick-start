import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';

const menus = [
  {url: '/display-data', text: 'Display Data'},
  {url: '/render-list', text: 'Render List'},
  {url: '/responding-events', text: 'Responding Events'},
  {url: '/alter-data', text: 'Alter Data'},
  {url: '/button-work-separately', text: 'Button Work Separately'},
  {url: '/button-work-together', text: 'Button Work Together'},
  {url: '/tic-toc-toe', text: 'Tic Toc Toe'},
]

export default function Example() {
  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="w-full px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="flex flex-1  sm:items-stretch sm:justify-start">
            <div className="flex shrink-0 items-center">
              <img
                alt="Your Company"
                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                className="h-8 w-auto"
              />
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {/* Profile dropdown */}
            <Menu as="div" className="relative ml-3">
              <div>
                <MenuButton className="relative flex rounded-full bg-white text-sm p-2.5 focus:outline-hidden">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open user menu</span>
                  Menu
                </MenuButton>
              </div>
              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black/5 transition focus:outline-hidden data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                {menus.map((menu, index) => (
                  <MenuItem key={ index } >
                    <a href={ menu.url } className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-gray-100 data-focus:outline-hidden">{ menu.text }</a>
                  </MenuItem>
                ))}
              </MenuItems>
            </Menu>
          </div>
        </div>
      </div>
    </Disclosure>
  )
}
