import { cn } from "../../lib/utils"
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
        <button className={cn(
          `gap-8 p-3 bg-gray-200 rounded-lg mx-1.5
          border-2 hover:border-blue-base
          disabled:opacity-50 disabled:pointer-events-none
          aria-disabeld:disabled:opacity-50 aria-disabled:pointer-events-none`
        )}>
          <Copy size={16} />
        </button>
        <button className={cn(
          `gap-8 p-3 bg-gray-200 rounded-lg
          border-2 hover:border-blue-base
          disabled:opacity-50 disabled:pointer-events-none
          aria-disabeld:disabled:opacity-50 aria-disabled:pointer-events-none`
        )}><Trash2 size={16} /></button>
      </div>

    </div>
  )
}