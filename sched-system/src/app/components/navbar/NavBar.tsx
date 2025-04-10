'use client'
import Link from "next/link";
import { useState } from "react";

export default function NavBar() {
  
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="flex justify-between items-center bg-transparent shadow-md p-6 relative">
      <h1 className="text-3xl font-bold">Organize.me</h1>

      {/* Avatar que abre o menu */}
      <div className="relative">
        <img
          className="size-12 rounded-full cursor-pointer"
          src="http://github.com/gabimmdev.png"
          alt="gabimmdev"
          onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-10">
            <ul className="py-2">
              <li>
                <Link
                  href="/cadastro"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsOpen(false)}
                >
                  Cadastro de Usuário
                </Link>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
