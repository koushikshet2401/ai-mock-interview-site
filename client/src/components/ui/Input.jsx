import { cn } from "../../utils/utils"

function Input({ className, type, ...props }) {
  return (
    <input
      type={type}
      className={cn(
        "border-input flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-sm shadow-sm outline-none",
        className
      )}
      {...props}
    />
  )
}

export { Input }