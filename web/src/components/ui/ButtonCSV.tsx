import { cn } from "../../lib/utils"
import { Download } from "lucide-react"

export default function ButtonCSV({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <div className="flex flex-row items-center justify-center">
      <button
        {...props}
        className={cn(
          "bg-gray-200 gap-1.5 text-sm text-gray-500 font-semibold",
          props.className
        )}
      >
        <span>
          <Download size={12} />
        </span>
        {children}
      </button>
    </div>
  );
}