import * as LabelPrimitive from "@radix-ui/react-label"
import { cn } from "../../utils/utils"

function Label({ className, ...props }) {
  return (
    <LabelPrimitive.Root
      className={cn(
        "text-sm font-medium leading-none",
        className
      )}
      {...props}
    />
  )
}

export { Label }