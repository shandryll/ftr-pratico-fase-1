import { Link } from "lucide-react";
import ButtonCSV from "./ui/ButtonCSV";

export function MyLinks() {
  return (
    <div className="bg-gray-100 flex flex-col p-[2rem] rounded-xl w-[580px]">

      <div className="mb-[20px] flex flex-row justify-between">
        <h1 className="text-lg text-gray-600 font-bold">Meus links</h1>
        <ButtonCSV>Baixar CSV</ButtonCSV>
      </div>

      <div className="flex flex-col items-center justify-center w-[516px] border-t border-gray-200">
        <div className="flex flex-col items-center justify-center mt-10">
          <Link size={32} className="text-gray-400" />
          <span className="text-xs text-gray-500 uppercase mt-3">ainda não existem links cadastrados</span>
        </div>
      </div>

    </div >
  )
}