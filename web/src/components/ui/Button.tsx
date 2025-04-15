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
        "bg-blue-base p-[1.25rem] text-white rounded-xl font-bold whitespace-nowrap hover:opacity-95 disabled:opacity-70",
        props.className
      )}
    >
      {children}
    </button>
  );
}