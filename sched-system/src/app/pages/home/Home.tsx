
import Agendamento from "../agendamento/agendamento";

export default function Home() {
  return (
    <main className="max-w-2xl mx-auto py-10">
      <h1 className="text-3xl font-segoe bold mb-6 ">Agendamentos</h1>
      <Agendamento />
    </main>
  );
}
