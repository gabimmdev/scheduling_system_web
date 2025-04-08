import { useEffect, useState } from "react";
import { Sched } from "@/app/types/Sched";
import api from "@/app/services/api";

export default function SchedList() {
  const [lista, setLista] = useState<Sched[]>([]);

  const fetchAgendamentos = async () => {
    const res = await api.get("/agendamentos");
    setLista(res.data);
  };

  const confirmar = async (id: number) => {
    await api.put(`/${id}/confirmar`);
    fetchAgendamentos();
  };

  const deletar = async (id: number) => {
    await api.delete(`/${id}`);
    fetchAgendamentos();
  };

  useEffect(() => {
    fetchAgendamentos();
  }, []);


    return (
        <div className="space-y-4">
      {lista.map((ag) => (
        <div key={ag.id} className="border p-4 rounded">
          <p><strong>Cliente:</strong> {ag.cliente}</p>
          <p><strong>Horário:</strong> {new Date(ag.horario).toLocaleString()}</p>
          <p><strong>Status:</strong> {ag.confirmado ? "Confirmado" : "Pendente"}</p>
          <div className="space-x-2 mt-2">
            {!ag.confirmado && (
              <button onClick={() => confirmar(ag.id!)} className="bg-green-600 text-white px-2 py-1 rounded">
                Confirmar
              </button>
            )}
            <button onClick={() => deletar(ag.id!)} className="bg-red-600 text-white px-2 py-1 rounded">
              Deletar
            </button>
          </div>
        </div>
      ))}
    </div>
    );
}
