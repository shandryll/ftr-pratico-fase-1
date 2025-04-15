import { cn } from "../../lib/utils"
import { Download } from "lucide-react"

export default function ButtonCSV({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button {...props} className={cn(
      `flex flex-row items-center justify-center p-2 gap-1.5 bg-gray-200 rounded-md`,
      props.className
    )}>
      <span className="text-gray-600">
        <Download size={16} />
      </span>
      <span className="text-sm text-gray-500 font-semibold">
        {children}
      </span>
    </button>
  );
}