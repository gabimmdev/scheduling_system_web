import SchedForm from "@/app/components/schedform/SchedForm";
import Link from "next/link";


export default function New() {
    return (
        <main className="max-w-xl mx-auto py-10">
        <h1 className="text-2xl font-bold mb-6">Novo Agendamento</h1>
        <SchedForm />
        <div className="mt-6">
          <Link href="/" className="text-blue-600 hover:underline">
            ← Voltar para a lista
          </Link>
        </div>
      </main>
    );
}