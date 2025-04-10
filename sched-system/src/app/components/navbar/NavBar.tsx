'use client'

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [foto, setFoto] = useState<string>("https://via.placeholder.com/150");
  const [nome, setNome] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    const usuarioStr = localStorage.getItem("usuario");
    if (usuarioStr) {
      const usuario = JSON.parse(usuarioStr);
      setNome(usuario.nome || "");
      setFoto(usuario.foto || "https://via.placeholder.com/150");
    }
  }, []);

  const irParaCadastro = () => {
    setIsOpen(false);
    router.push("/cadastro");
  };

  return (
    <nav className="flex justify-between items-center bg-transparent shadow-md p-6 relative">
      <h1 className="text-3xl font-bold">Organize.me</h1>

      {/* Avatar que abre o menu */}
      <div className="relative">
        <img
          className="size-12 rounded-full cursor-pointer border border-gray-300"
          src={foto}
          alt={nome || "Usuário"}
          onClick={() => setIsOpen(!isOpen)}
        />

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-10">
            <ul className="py-2">
              <li>
                <button
                  onClick={irParaCadastro}
                  className="w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                >
                  Cadastro de Usuário
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
}
