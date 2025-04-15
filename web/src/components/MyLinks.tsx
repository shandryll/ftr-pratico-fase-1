import Button from "./ui/Button";
import ButtonCSV from "./ui/ButtonCSV";
import TextInput from "./ui/TextInput";

export function MyLinks() {
  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 flex flex-col p-[2rem] rounded-xl">

        <div className="mb-[1.5rem] flex flex-row justify-between">
          <h1 className="text-lg text-gray-600 font-bold">Meus links</h1>
          <ButtonCSV>Baixar CSV</ButtonCSV>
        </div>

        <div className="mb-[0.5rem]">
          <span className="text-xs text-gray-500 uppercase">link original</span>
          <TextInput placeholder="www.exemplo.com.br" />
        </div>

        <div className="mb-[1.5rem]">
          <span className="text-xs text-gray-500 uppercase">link encurtado</span>
          <TextInput defaultValue="brev.ly/" className="text-gray-400" />
        </div>

        <Button className="text-base text-white">Salvar link</Button>
      </div>
    </div>
  )
}