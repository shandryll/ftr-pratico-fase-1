import { cn } from "../../lib/utils"
import { TriangleAlert } from "lucide-react"

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function TextInput({ label, error, className, ...props }: TextInputProps) {
  return (
    <div className="mb-2 w-full">
      <label className="text-xs text-gray-500 uppercase">{label}</label>

      <input
        {...props}
        className={cn(
          `w-full mt-1 p-4 bg-gray-100 border-2 rounded-lg 
          placeholder-gray-400 text-md text-gray-700
          focus:outline-none focus:ring-2
          ${error ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-300'}`,
          className
        )}
      />

      {error && (
        <div className="flex items-center gap-1 mt-1">
          <TriangleAlert size={16} className="min-w-[16px] text-red-500" />
          <span className="text-sm text-gray-500">{error}</span>
        </div>
      )}
    </div>
  );
}