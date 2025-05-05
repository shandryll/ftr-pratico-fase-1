import { cn } from "../../lib/utils"
import { Download, Loader2 } from "lucide-react"

export default function ButtonDownloadCSV({
  children,
  isLoading = false,
  ...props
}: {
  children: React.ReactNode
  isLoading?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        `flex flex-row items-center justify-center p-2 gap-1.5 bg-gray-200 rounded-md
        border-2 hover:border-blue-base
        disabled:opacity-50 disabled:pointer-events-none aria-disabled:pointer-events-none`,
        props.className
      )}
      disabled={props.disabled || isLoading}
    >
      <span className="text-gray-600">
        {isLoading ? (
          <Loader2 className="animate-spin" size={16} />
        ) : (
          <Download size={16} />
        )}
      </span>
      <span className="text-sm text-gray-500 font-semibold">
        {children}
      </span>
    </button>
  )
}
