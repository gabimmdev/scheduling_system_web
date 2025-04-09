import SchedList from "@/app/components/SchedList/SchedList";
import Link from "next/link";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-segoe bold mb-6 ">Agendamentos</h1>
      <SchedList />
      <div className="mt-6">
        <Link href="pages/new">
        <button className="text-white border-1px bg-transparent hover:bg-green">
          + Novo agendamento
          </button>
        </Link>
      </div>
    </main>
  );
}
