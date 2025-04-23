"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface Agendamento {
  cliente: string;
  horario: string;
  confirmado: boolean;
  concluido: boolean;
}

interface BackendErrors {
  cliente?: string;
  horario?: string;
  confirmado?: string;
  concluido?: string;
}

const SchedForm: React.FC = () => {
  const [errors, setErrors] = useState<BackendErrors>({});
  const [fetchError, setFetchError] = useState<string>('');
  const { register, handleSubmit } = useForm<Agendamento>();

  const onSubmit = async (data: Agendamento) => {
    try {
      // Envia os dados para a API de agendamento no backend
      const response = await fetch('http://localhost:8080/agendamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        // Se a resposta não for ok, significa que há erros de validação
        const errorData = await response.json();
        setErrors(errorData.errors);
      } else {
        // Se não houver erros, processo bem-sucedido
        alert('Agendamento realizado com sucesso!');
      }
    } catch (error) {
      console.error('Erro ao enviar agendamento:', error);
      setFetchError('Erro ao tentar se comunicar com o servidor. Tente novamente mais tarde.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {fetchError && <p className="text-red-500">{fetchError}</p>} {/* Exibe erro de rede se houver */}

      <div>
        <label htmlFor="cliente" className="block">Nome do Cliente</label>
        <input
          id="cliente"
          type="text"
          {...register('cliente')}
          className="border p-2"
        />
        {errors.cliente && <p className="text-red-500">{errors.cliente}</p>}
      </div>

      <div>
        <label htmlFor="horario" className="block">Horário</label>
        <input
          id="horario"
          type="datetime-local"
          {...register('horario')}
          className="border p-2"
        />
        {errors.horario && <p className="text-red-500">{errors.horario}</p>}
      </div>
      <div>
        <button type="submit" className="p-2 bg-blue-500 text-white">Agendar</button>
      </div>
    </form>
  );
};

export default SchedForm;

