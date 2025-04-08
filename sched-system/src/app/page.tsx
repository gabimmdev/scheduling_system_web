"use client";

import AgendamentoList from "@/app/components/SchedList/SchedList";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="max-w-2xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">📅 Lista de Agendamentos</h1>

      <AgendamentoList />

      <div className="mt-6">
        <Link href="@/app/pages/new/page.tsx" className="text-blue-600 hover:underline">
          + Novo agendamento
        </Link>
      </div>
    </main>
  );
}
