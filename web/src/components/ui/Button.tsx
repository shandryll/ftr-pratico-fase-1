import { cn } from "../../lib/utils";

export default function Button({
  children,
  ...props
}: {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={cn(
        "bg-blue-base gap-3 p-[1.25rem] text-base font-bold text-white rounded-xl",
        props.className
      )}
    >
      {children}
    </button>
  );
}