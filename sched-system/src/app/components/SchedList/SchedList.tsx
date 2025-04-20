import { useEffect, useState } from "react";
import api from "@/app/services/api";

type Agendamento = {
  id: number;
  cliente: string;
  horario: string;
  confirmado: boolean;
  concluido: boolean;
};

export default function SchedList() {
  const [agendamentos, setAgendamentos] = useState<Agendamento[]>([]);
  const [erro, setErro] = useState<string | null>(null);

  const fetchAgendamento = async () => {
    try {
      const response = await api.get("/agendamento");
      setAgendamentos(response.data);
      setErro(null);
    } catch (error: unknown) {
      setErro("Erro ao buscar agendamentos");
      console.error(error);
    }
  };

  const toggleConcluido = async (id: number, atual: boolean, confirmado: boolean) => {
    try {
      if (!confirmado) {
        setErro("Você só pode concluir um agendamento confirmado.");
        return;
      }

      const endpoint = atual ? `/agendamento/${id}/desmarcar` : `/agendamento/${id}/concluir`;
      await api.put(endpoint);
      fetchAgendamento();
    } catch (error: unknown) {
      setErro("Erro ao atualizar agendamento");
      console.error(error);
    }
  };

  const toggleConfirmado = async (id: number, atual: boolean) => {
    try {
      const endpoint = atual ? `/agendamento/${id}/desconfirmar` : `/agendamento/${id}/confirmar`;
      await api.put(endpoint);
      fetchAgendamento();
    } catch (error: unknown) {
      setErro("Erro ao atualizar confirmação");
      console.error(error);
    }
  };

  const deletarAgendamento = async (id: number) => {
    try {
      await api.delete(`/agendamento/${id}`);
      fetchAgendamento();
    } catch (error: unknown) {
      setErro("Erro ao deletar agendamento");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAgendamento();
  }, []);

  return (
    <div className="space-y-4">
      {erro && (
        <div className="p-4 bg-red-100 text-red-700 border border-red-400 rounded">
          {erro}
        </div>
      )}

      {agendamentos.map((ag) => (
        <div
          key={ag.id}
          className={`p-4 border rounded-xl shadow-sm flex justify-between items-center ${
            ag.concluido ? "bg-green-100" : "bg-white"
          }`}
        >
          <div>
            <h2
              className={`text-xl font-semibold text-black ${ag.concluido ? "line-through" : ""}`}
            >
              {ag.cliente}
            </h2>
            <p className="text-sm text-black"> {ag.horario}</p>
            <p className="text-sm text-gray-600">
              {ag.confirmado ? "✅ Confirmado" : "⏳ Não confirmado"}
            </p>
          </div>

          <div className="flex gap-2 flex-wrap">
            <button
              className={`cursor-pointer px-4 py-1 text-sm font-medium rounded-md border ${
                ag.concluido
                  ? "border-yellow-500 text-yellow-600 hover:bg-yellow-100"
                  : ag.confirmado
                  ? "border-green-600 text-green-600 hover:bg-green-100"
                  : "border-gray-400 text-gray-400 cursor-not-allowed"
              }`}
              onClick={() => toggleConcluido(ag.id, ag.concluido, ag.confirmado)}
              disabled={!ag.confirmado}
              title={!ag.confirmado ? "Só é possível concluir se estiver confirmado" : ""}
            >
              {ag.concluido ? "Desmarcar" : "Concluir"}
            </button>

            <button
              className={`px-4 py-1 text-sm font-medium rounded-md border cursor-pointer ${
                ag.confirmado
                  ? "border-blue-500 text-blue-600 hover:bg-blue-100"
                  : "border-gray-500 text-gray-600 hover:bg-gray-100"
              }`}
              onClick={() => toggleConfirmado(ag.id, ag.confirmado)}
            >
              {ag.confirmado ? "Desconfirmar" : "Confirmar"}
            </button>

            <button
              className="cursor-pointer px-4 py-1 text-sm font-medium rounded-md border border-red-600 text-red-600 hover:bg-red-100"
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
