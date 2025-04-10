'use client'
import { useState } from "react";

export default function CadastroUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [linkedin, setLinkedin] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { nome, email, linkedin };

    try {
      const response = await fetch("http://localhost:8080/usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const data = await response.json();

        // Salva os dados no localStorage
        localStorage.setItem("usuario", JSON.stringify(data));

        alert("Usuário cadastrado com sucesso!");
        setNome("");
        setEmail("");
        setLinkedin("");
      } else {
        const error = await response.text();
        alert("Erro ao cadastrar usuário: " + error);
      }
    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao cadastrar usuário.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 shadow-md rounded-md border">
      <h1 className="text-2xl font-bold mb-4">Cadastro de Usuário</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium">URL do LinkedIn</label>
          <input
            type="url"
            value={linkedin}
            onChange={(e) => setLinkedin(e.target.value)}
            className="w-full px-3 py-2 border rounded-md"
            placeholder="https://www.linkedin.com/in/seudominio"
            required
          />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Cadastrar
        </button>
      </form>
    </div>
  );
}

