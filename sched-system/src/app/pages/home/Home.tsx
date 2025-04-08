import AgendamentoList from "@/app/components/SchedList/SchedList";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">Agendamentos</h1>
      <AgendamentoList />
      <div className="mt-6">
        <Link href="/novo" className="text-blue-600 hover:underline">
          + Novo agendamento
        </Link>
      </div>
    </main>
  );
}
