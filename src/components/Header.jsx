
import React from 'react';
import { DarkThemeToggle } from "flowbite-react";

const Header = ({ onPrint, onEdit}) => {
    return (
        <header>
            <nav className="fixed w-full top-0 bg-secondary border-gray-200 px-4 lg:px-6 py-2.5">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl h-10">
                    <a href="https://flowbite.com" className="flex items-center">
                        <img src="https://flowbite.com/docs/images/logo.svg" className="mr-3 h-6 sm:h-9" alt="Flowbite Logo" />
                        <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
                                MyCV
                        </span>
                    </a>
                    <div className="flex items-center lg:order-2 gap-2">
                        <DarkThemeToggle className="btn text-alt hover:bg-alt focus:ring-0"/>
                        <button onClick={onEdit}
                                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg">
                            Edit CV
                        </button>
                        <button
                            onClick={onPrint}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                        >
                            Print CV
                        </button>
                    </div>
                </div>
            </nav>

            <div className="min-h-20 w-full"></div>
        </header>
    );
}

export default Header;