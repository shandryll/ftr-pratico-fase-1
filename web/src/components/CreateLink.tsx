import Button from "./ui/Button";
import TextInput from "./ui/TextInput";

export function CreateLink() {
  return (
    <div className="bg-gray-100 flex flex-col p-[2rem] rounded-xl w-[380px] max-h-[360px] max-sm:mb-5">

      <div className="mb-[1.5rem]">
        <h1 className="text-lg text-gray-600 font-bold">Novo link</h1>
      </div>

      <div className="mb-[0.5rem]">
        <TextInput name="link original" placeholder="www.exemplo.com.br" />
      </div>

      <div className="mb-[1.5rem]">
        <TextInput name="link encurtado" defaultValue="brev.ly/" className="text-gray-400" />
      </div>

      <Button className="text-md text-white">Salvar link</Button>
    </div>
  )
}