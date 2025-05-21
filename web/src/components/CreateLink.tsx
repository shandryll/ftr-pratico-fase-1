import { useForm, Controller } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast, ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Button from "./ui/Button"
import TextInput from "./ui/TextInput"
import { api } from "../lib/axios"
import { AxiosError } from "axios"
import { IMaskInput } from "react-imask"

const linkSchema = z.object({
  originalUrl: z.string().trim().url({ message: "Informe uma url válida." }),
  shortenedUrl: z.string().min(10, "Informe uma URL válida com o prefixo.").trim(),
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
    control,
    formState: { errors },
  } = useForm<LinkData>({
    resolver: zodResolver(linkSchema),
  })

  async function onSubmit(data: LinkData) {
    try {
      const cleanData = {
        ...data,
        shortenedUrl: data.shortenedUrl.replace(/^brev\.ly\//, ''),
      }
      await api.post('/', cleanData)
      toast.success("Link salvo com sucesso!")
      reset()
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

        <div className="mb-2 w-full">
          <label className="text-xs text-gray-500 uppercase">link encurtado</label>
          <Controller
            control={control}
            name="shortenedUrl"
            render={({ field }) => (
              <IMaskInput
                mask="brev.ly/**********"
                placeholder="brev.ly/"
                className={`w-full mt-1 p-4 bg-gray-100 border-2 rounded-lg 
                  placeholder-gray-400 text-md text-gray-700
                  focus:outline-none focus:ring-2
                  ${errors.shortenedUrl ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`}
                {...field}
              />
            )}
          />
          {errors.shortenedUrl && (
            <div className="flex items-center gap-1 mt-1">
              <span className="text-sm text-gray-500">{errors.shortenedUrl.message}</span>
            </div>
          )}
        </div>

        <Button type="submit" className="text-md text-white">
          Salvar link
        </Button>
      </form>

      <ToastContainer />
    </div>
  )
}
