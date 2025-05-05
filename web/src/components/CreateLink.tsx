import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Button from "./ui/Button"
import TextInput from "./ui/TextInput"
import { api } from "../lib/axios"
import { AxiosError } from "axios"

const linkSchema = z.object({
  originalUrl: z.string().trim().url({ message: "Link original inválido" }),
  shortenedUrl: z.string().trim().url({ message: "Link encurtado inválido" }),
})

type LinkData = z.infer<typeof linkSchema>

interface CreateLinkProps {
  onLinkCreated: () => void
}

export function CreateLink({ onLinkCreated }: CreateLinkProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LinkData>({
    resolver: zodResolver(linkSchema),
  })

  async function onSubmit(data: LinkData) {
    try {
      await api.post('/', data)
      toast.success("Link salvo com sucesso!")
      reset({
        originalUrl: "",
        shortenedUrl: "brev.ly/",
      })

      onLinkCreated()
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message || "Erro desconhecido.")
      } else {
        toast.error("Erro ao tentar se conectar ao servidor.")
      }
    }
  }

  const onError = () => {
    if (errors.originalUrl) toast.error(errors.originalUrl.message)
    if (errors.shortenedUrl) toast.error(errors.shortenedUrl.message)
  }

  return (
    <div className="bg-gray-100 flex flex-col p-[2rem] rounded-xl w-[380px] max-h-[360px] max-sm:mb-5">
      <div className="mb-[1.5rem]">
        <h1 className="text-lg text-gray-600 font-bold">Novo link</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
        <TextInput
          placeholder="https://www.exemplo.com.br"
          {...register("originalUrl")}
          label="link original"
          error={errors.originalUrl?.message}
        />

        <TextInput
          defaultValue="brev.ly/"
          {...register("shortenedUrl")}
          label="link encurtado"
          className="text-gray-400"
          error={errors.shortenedUrl?.message}
        />

        <Button type="submit" className="text-md text-white">
          Salvar link
        </Button>
      </form>

      <ToastContainer />
    </div>
  )
}
