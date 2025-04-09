import { useEffect, useState } from "react";
import api from "@/app/services/api";

type Agendamento = {
  id: number;
  nome: string;
  data: string;
  concluido: boolean;
};

export default function SchedList() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);

  const fetchAgendamento = async () => {
    try {
      const response = await api.get("/agendamentos");
      setAgendamentos(response.data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos", error);
    }
  };

  const marcarComoConcluido = async (id: number) => {
    try {
      await api.put(`/agendamentos/${id}/concluir`);
      fetchAgendamento(); // recarrega os dados
    } catch (error) {
      console.error("Erro ao concluir agendamento", error);
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
            ag.concluido ? "bg-green-100 line-through text-gray-500" : "bg-white"
          }`}
        >
          <div>
            <h2 className="text-xl font-semibold">{ag.nome}</h2>
            <p className="text-sm text-gray-500">📅 {ag.data}</p>
          </div>

          <button
            className={`px-4 py-1 text-sm font-medium rounded-md border ${
              ag.concluido
                ? "border-gray-300 text-gray-400 cursor-not-allowed"
                : "border-green-600 text-green-600 hover:bg-green-100"
            }`}
            disabled={ag.concluido}
            onClick={() => marcarComoConcluido(ag.id)}
          >
            {ag.concluido ? "Concluído" : "Concluir"}
          </button>
        </div>
      ))}
    </div>
  );
}
