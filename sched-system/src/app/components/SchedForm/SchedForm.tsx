"use client"
import { useState } from "react";
import { Sched } from "@/app/types/Agendamento";
import api from "@/app/services/api";


export default function SchedForm() {
    const [form, setForm] = useState<Sched>({ cliente: "", horario: "" });

    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.post("/", form);
    alert("Agendamento criado com sucesso!");
    setForm({ cliente: "", horario: "" });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Nome do cliente"
        value={form.cliente}
        onChange={(e) => setForm({ ...form, cliente: e.target.value })}
        required
        className="border p-2 rounded w-full"
      />
      <input
        type="datetime-local"
        value={form.horario}
        onChange={(e) => setForm({ ...form, horario: e.target.value })}
        required
        className="border p-2 rounded w-full"
      />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Agendar
      </button>
    </form>
    );
}