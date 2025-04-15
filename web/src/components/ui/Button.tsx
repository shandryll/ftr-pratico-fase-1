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
        `bg-blue-base gap-3 p-[1.25rem] text-md font-bold text-white rounded-xl
        hover:bg-blue-dark
        disabled:opacity-50 disabled:pointer-events-none aria-disabeld:disabled:opacity-50 aria-disabled:pointer-events-none`,
        props.className
      )}
    >
      {children}
    </button>
  );
}