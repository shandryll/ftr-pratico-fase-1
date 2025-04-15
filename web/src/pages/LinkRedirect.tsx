export function LinkRedirect() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 flex flex-col justify-center items-center rounded-md
        w-[580px] h-[296px] max-sm:px-5 max-sm:py-12">
        <img src="src/assets/svg/Logo_Icon.svg" alt="Logo Icon" />

        <p className="text-xl text-gray-600 font-bold my-6">Redirecionando...</p>

        <span className="text-md text-gray-500 w-full text-center mb-1">O link será aberto automaticamente em alguns instantes.</span>
        <span className="text-md text-gray-500 w-full text-center">Não foi redirecionado? <span className="text-blue-base underline">Acesse aqui</span></span>
      </div>
    </div>
  )
}