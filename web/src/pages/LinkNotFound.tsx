export function LinkNotFound() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 flex flex-col justify-center items-center rounded-md
        w-[580px] h-[296px] sm:px-5 sm:py-12">
        <img src="src/assets/svg/404.svg" alt="Logo Icon" />

        <p className="text-xl text-gray-600 font-bold my-6">Link não encontrado</p>

        <span className="text-md text-gray-500 w-full text-center mb-1">O link que você está tentando acessar não existe, foi removido ou é uma URL inválida. Saiba mais em <span className="text-blue-base underline">brev.ly</span>.</span>
      </div>
    </div>
  )
}