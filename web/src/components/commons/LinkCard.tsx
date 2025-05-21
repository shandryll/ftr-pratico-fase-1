import { cn } from "../../lib/utils"
import { Copy, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "react-toastify"
import { api } from "../../lib/axios"
import { useNavigate } from "react-router-dom"

interface LinkCardProps {
  originalUrl: string
  shortenedUrl: string
  urlAccessCounter?: number
  id: string
  onDelete: (id: string) => void
  onRegisterClick?: (shortenedUrl: string) => void
}

export function LinkCard({
  originalUrl,
  shortenedUrl,
  urlAccessCounter = 0,
  id,
  onDelete,
}: LinkCardProps) {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleLinkClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await api.patch(`/${id}`)

      navigate(`/r/${shortenedUrl}`)
    } catch (error) {
      console.error("Erro ao registrar acesso:", error)
    }
  }

  const handleDeleteClick = async () => {
    const isConfirmed = window.confirm("Você tem certeza que deseja excluir este link?")
    if (isConfirmed) {
      setIsLoading(true)
      try {
        await api.delete(`/${id}`)
        toast.success("Link excluído com sucesso!")
        onDelete(id)
      } catch (error) {
        toast.error("Erro ao excluir o link.")
      } finally {
        setIsLoading(false)
      }
    }
  }

  return (
    <div className="flex flex-row justify-between border-t border-gray-200 py-4">
      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-start">
          <a
            href={`${window.location.origin}/${shortenedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLinkClick}
            className="text-md text-blue-base font-semibold hover:underline"
          >
            {`${window.location.origin}/${shortenedUrl}`}
          </a>
          <span className="text-sm text-gray-500">{originalUrl}</span>
        </div>
      </div>

      <div className="flex flex-row items-center mr-4">
        <span className="text-sm text-gray-500 px-5">{urlAccessCounter} acessos</span>
        <button
          className={cn(
            `gap-8 p-3 bg-gray-200 rounded-lg mx-1.5
            border-2 hover:border-blue-base
            disabled:opacity-50 disabled:pointer-events-none`
          )}
        >
          <Copy size={16} />
        </button>
        <button
          className={cn(
            `gap-8 p-3 bg-gray-200 rounded-lg
            border-2 hover:border-blue-base
            disabled:opacity-50 disabled:pointer-events-none`
          )}
          onClick={handleDeleteClick}
          disabled={isLoading}
        >
          {isLoading ? <span>Carregando...</span> : <Trash2 size={16} />}
        </button>
      </div>
    </div>
  )
}
