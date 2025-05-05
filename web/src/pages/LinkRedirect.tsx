import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { api } from "../lib/axios"
import { toast } from "react-toastify"

export function LinkRedirect() {
  const { shortened } = useParams<{ shortened: string }>()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAndRedirect = async () => {
      try {
        const { data } = await api.get(`/resolve/${shortened}`)
        const { id, originalUrl } = data

        await api.patch(`/${id}`)

        setTimeout(() => {
          window.location.replace(originalUrl)
        }, 2000)
      } catch (error) {
        console.error("Erro ao redirecionar:", error)
        toast.error("Link inválido ou expirado.")
        navigate("/")
      }
    }

    fetchAndRedirect()
  }, [shortened, navigate])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 flex flex-col justify-center items-center rounded-md w-[580px] h-[296px] max-sm:px-5 max-sm:py-12">
        <img src="src/assets/svg/Logo_Icon.svg" alt="Logo Icon" />
        <p className="text-xl text-gray-600 font-bold my-6">Redirecionando...</p>
        <span className="text-md text-gray-500 w-full text-center mb-1">
          O link será aberto automaticamente em alguns instantes.
        </span>
        <span className="text-md text-gray-500 w-full text-center">
          Não foi redirecionado?{" "}
          <a href="#" className="text-blue-base underline" onClick={() => window.location.reload()}>
            Acesse aqui
          </a>
        </span>
      </div>
    </div>
  )
}
