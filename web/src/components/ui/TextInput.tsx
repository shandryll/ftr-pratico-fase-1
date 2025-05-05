import { cn } from "../../lib/utils";

type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export default function TextInput({ label, ...props }: TextInputProps) {
  return (
    <div>
      <span className='text-xs text-gray-500 uppercase'>
        {label}
      </span>
      <input
        type="text"
        {...props}
        className={cn(
          `w-full gap-2 p-4 bg-gray-100 border-2 border-gray-300 rounded-lg 
          placeholder:text-gray-400 text-md
          hover:border-blue-base invalid:border-danger
          `,
          props.className
        )}
      />
    </div>
  )
}