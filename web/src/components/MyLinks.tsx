import { useEffect, useState } from "react"
import { Link } from "lucide-react"
import * as ScrollArea from "@radix-ui/react-scroll-area"
import ButtonDownloadCSV from "./ui/ButtonDownloadCSV"
import { LinkCard } from "./commons/LinkCard"
import { api } from "../lib/axios"
import { toast } from "react-toastify"
import { AxiosError } from "axios"

interface LinkData {
  originalUrl: string
  shortenedUrl: string
  clicks: number
}

export function MyLinks() {
  const [links, setLinks] = useState<LinkData[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchLinks() {
      try {
        const response = await api.get("/")
        setLinks(response.data.urls || response.data)
      } catch (err) {
        if (err instanceof AxiosError) {
          toast.error(err.response?.data.message || "Erro desconhecido.")
        } else {
          toast.error("Erro ao tentar se conectar ao servidor.")
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchLinks()
  }, [])

  const isMyLinkListEmpty = !isLoading && links.length === 0

  return (
    <div className="bg-gray-100 flex flex-col p-[2rem] rounded-xl w-[580px] max-h-[396px] max-sm:w-screen max-sm:h-screen">
      <div className="mb-[20px] flex flex-row justify-between">
        <h1 className="text-lg text-gray-600 font-bold">Meus links</h1>
        <ButtonDownloadCSV disabled={isLoading || isMyLinkListEmpty}>
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
                  ainda não existem links cadastrados
                </span>
              </div>
            </div>
          ) : (
            <div className="flex flex-col">
              {links.map((link, index) => (
                <LinkCard
                  key={index}
                  shortenedUrl={link.shortenedUrl}
                  originalUrl={link.originalUrl}
                  clicks={link.clicks}
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
