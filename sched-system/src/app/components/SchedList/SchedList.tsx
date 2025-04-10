import { useEffect, useState } from "react";
import api from "@/app/services/api";

type Agendamento = {
  id: number;
  cliente: string;
  horario: string;
  concluido: boolean;
};

export default function SchedList() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  const fetchAgendamento = async () => {
    try {
      const response = await api.get("/agendamento");
      setAgendamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos", error);
    }
  };

  const toggleConcluido = async (id: number, atual: boolean) => {
    try {
      if (atual) {
        await api.put(`/agendamento/${id}/desmarcar`);
      } else {
        await api.put(`/agendamento/${id}/concluir`);
      }
      fetchAgendamento();
    } catch (error) {
      console.error("Erro ao atualizar agendamento", error);
    }
  };

  const deletarAgendamento = async (id: number) => {
    try {
      await api.delete(`/agendamento/${id}`);
      fetchAgendamento();
    } catch (error) {
      console.error("Erro ao deletar agendamento", error);
    }
  };

  useEffect(() => {
    fetchAgendamento();
  }, []);

  return (
    <div className="space-y-4">
      {agendamentos.map((ag) => (
        <div
          key={ag.id}
          className={`p-4 border rounded-xl shadow-sm flex justify-between items-center ${
            ag.concluido ? "bg-green-100" : "bg-white"
          }`}
        >
          <div>
            <h2
              className={`text-xl font-semibold text-black ${
                ag.concluido ? "line-through" : ""
              }`}
            >
              {ag.cliente}
            </h2>
            <p className="text-sm text-black">📅 {ag.horario}</p>
          </div>

          <div className="flex gap-2">
            <button
              className={`px-4 py-1 text-sm font-medium rounded-md border ${
                ag.concluido
                  ? "border-yellow-500 text-yellow-600 hover:bg-yellow-100"
                  : "border-green-600 text-green-600 hover:bg-green-100"
              }`}
              onClick={() => toggleConcluido(ag.id, ag.concluido)}
            >
              {ag.concluido ? "Desmarcar" : "Concluir"}
            </button>

            <button
              className="px-4 py-1 text-sm font-medium rounded-md border border-red-600 text-red-600 hover:bg-red-100"
              onClick={() => deletarAgendamento(ag.id)}
            >
              Deletar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
