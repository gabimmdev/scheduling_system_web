import SchedList from "@/app/components/SchedList/SchedList"
import Link from "next/link"
export default function Agendamento () {
    return (
        <>
        <div className=" bg-gray-200 p-4 border rounded-xl shadow-sm flex justify-between items-center">
        <SchedList />
        </div>
      <div className="mt-6">
        <Link href="pages/new">
        <button className="text-white border-1px bg-transparent hover:bg-green">
          + Novo agendamento
          </button>
        </Link>
      </div>
      </>
    )
}