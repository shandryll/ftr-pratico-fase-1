import { Copy, Trash2 } from "lucide-react";

export function LinkCard() {
  return (
    <div className='flex flex-row justify-between border-t border-gray-200 py-4'>

      <div className="flex flex-col items-center justify-center">
        <div className="flex flex-col items-start">
          <span className="text-md text-blue-base font-semibold">brev.ly/Linkedin-Profile</span>
          <span className="text-sm text-gray-500">linkedin.com/in/myprofile</span>
        </div>
      </div>

      <div className='flex flex-row items-center mr-4'>
        <span className="text-sm text-gray-500 px-5">15 acessos</span>
        <button className="gap-8 p-3 bg-gray-200 rounded-lg mx-1.5"><Copy size={16} /></button>
        <button className="gap-8 p-3 bg-gray-200 rounded-lg"><Trash2 size={16} /></button>
      </div>

    </div>
  )
}