import { Link } from "lucide-react"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import ButtonDownloadCSV from "./ui/ButtonDownloadCSV"
import { LinkCard } from "./commons/LinkCard"
import { api } from "../lib/axios"
import { toast } from "react-toastify"
import { LinkData } from "../pages/Home"
import { useNavigate } from "react-router-dom"

interface MyLinksProps {
  links: LinkData[]
  setLinks: React.Dispatch<React.SetStateAction<LinkData[]>>
  isLoading: boolean
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

export function MyLinks({ links, setLinks, isLoading, setIsLoading }: MyLinksProps) {
  const isMyLinkListEmpty = !isLoading && links.length === 0
  const navigate = useNavigate()

  const handleLinkDelete = (id: string) => {
    setLinks(prevLinks => prevLinks.filter(link => link.id !== id))
  }

  const handleExportCSV = async () => {
    try {
      setIsLoading(true)

      const { data } = await api.get("/export")
      const s3AWSKey = data.key

      const response = await api.get(`/download?key=${s3AWSKey}`, {
        responseType: "blob",
      })

      const filename = s3AWSKey.split("/").pop() ?? "meus-links.csv"

      const blob = new Blob([response.data], { type: "text/csv" })
      const downloadUrl = window.URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = downloadUrl
      link.download = filename
      document.body.appendChild(link)
      link.click()
      link.remove()

      toast.success("CSV exportado com sucesso!")
    } catch (error) {
      toast.error("Erro ao exportar CSV.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleLinkClick = (shortenedUrl: string) => {
    navigate(`/r/${shortenedUrl}`)
  }

  return (
    <div className="bg-gray-100 flex flex-col p-[2rem] rounded-xl w-[580px] max-h-[396px] max-sm:w-screen max-sm:h-screen">
      <div className="mb-[20px] flex flex-row justify-between">
        <h1 className="text-lg text-gray-600 font-bold">Meus links</h1>
        <ButtonDownloadCSV
          onClick={handleExportCSV}
          disabled={isMyLinkListEmpty}
          isLoading={isLoading}
        >
          Baixar CSV
        </ButtonDownloadCSV>
      </div>

      <ScrollArea.Root type="scroll" className="overflow-hidden">
        <ScrollArea.Viewport className="h-full">
          {isLoading ? (
            <div className="flex justify-center items-center h-48">
              <span className="text-sm text-gray-500 animate-pulse">
                Carregando links...
              </span>
            </div>
          ) : isMyLinkListEmpty ? (
            <div className="flex flex-col w-[516px] border-t border-gray-200">
              <div className="flex flex-col items-center justify-center mt-10">
                <Link size={32} className="text-gray-400" />
                <span className="text-xs text-gray-500 uppercase mt-3">
                  Ainda não existem links cadastrados
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {links.map((link) => (
                <LinkCard
                  key={link.id}
                  id={link.id}
                  shortenedUrl={link.shortenedUrl}
                  originalUrl={link.originalUrl}
                  urlAccessCounter={link.urlAccessCounter}
                  onDelete={handleLinkDelete}
                  onRegisterClick={() => handleLinkClick(link.shortenedUrl)}
                />
              ))}
            </div>
          )}
        </ScrollArea.Viewport>

        <ScrollArea.Scrollbar
          className="flex touch-none select-none bg-gray-100 p-0.5 transition-colors duration-[160ms] ease-out data-[orientation=horizontal]:h-3 data-[orientation=vertical]:w-3 data-[orientation=horizontal]:flex-col"
          orientation="vertical"
        >
          <ScrollArea.Thumb className="relative flex-1 rounded-[10px] bg-blue-base before:absolute before:left-1/2 before:top-1/2 before:size-full before:min-h-11 before:min-w-11 before:-translate-x-1/2 before:-translate-y-1/2" />
        </ScrollArea.Scrollbar>
      </ScrollArea.Root>
    </div>
  )
}
