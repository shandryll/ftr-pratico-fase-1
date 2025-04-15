import { cn } from "../../lib/utils";

export default function TextInput(
  props: React.InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <input
      {...props}
      className={cn(
        `w-full gap-2 p-4 bg-gray-100 border-2 border-gray-300 rounded-lg 
        placeholder-text-gray-400 text-md`,
        props.className
      )}
    />
  )
}