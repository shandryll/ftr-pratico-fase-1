import { useEffect, useState } from "react"
import { CreateLink } from "../components/CreateLink"
import { Header } from "../components/Header"
import { MyLinks } from "../components/MyLinks"
import { api } from "../lib/axios"
import { AxiosError } from "axios"
import { toast } from "react-toastify"

export interface LinkData {
  originalUrl: string
  shortenedUrl: string
  urlAccessCounter: number
  id: string
}

export function Home() {
  const [links, setLinks] = useState<LinkData[]>([])
  const [isLoading, setIsLoading] = useState(true)

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
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchLinks()
  }, [])

  return (
    <>
      <Header />
      <div className="flex flex-row justify-between max-sm:flex-col">
        <CreateLink onLinkCreated={fetchLinks} />
        <MyLinks
          links={links}
          setLinks={setLinks}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      </div>
    </>
  )
}
