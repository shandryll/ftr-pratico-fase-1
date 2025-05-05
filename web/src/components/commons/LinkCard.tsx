import { cn } from "../../lib/utils"
import { Copy, Trash2 } from "lucide-react"
import { useState } from "react"
import { toast } from "react-toastify"
import { api } from "../../lib/axios"

interface LinkCardProps {
  originalUrl: string
  shortenedUrl: string
  clicks?: number
  id: string
  onDelete: (id: string) => void
}

export function LinkCard({
  originalUrl,
  shortenedUrl,
  clicks = 0,
  id,
  onDelete,
}: LinkCardProps) {
  const [isLoading, setIsLoading] = useState(false)

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
          <span className="text-md text-blue-base font-semibold">{shortenedUrl}</span>
          <span className="text-sm text-gray-500">{originalUrl}</span>
        </div>
      </div>

      <div className="flex flex-row items-center mr-4">
        <span className="text-sm text-gray-500 px-5">{clicks} acessos</span>
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
