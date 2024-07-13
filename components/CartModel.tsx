import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ShoppingCart } from "lucide-react"
import { Button } from "./ui/button"

const CartModel = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <div className="relative">
          <ShoppingCart
            width={30}
            strokeWidth={"1.5px"}
            height={30}
            className="cursor-pointer"
          />
          <p className="absolute top-0 translate-x-[-50%] translate-y-[-50%] text-white bg-red-1 font-semibold w-4 h-4 rounded-full flex items-center justify-center">
            1
          </p>
        </div>
      </SheetTrigger>
      <SheetContent className="w-full md:max-w-[540px] border-none">
      <div className="bg-dark-bg_2 w-full h-screen p-6">

        <SheetClose className="block md:hidden">
             <Button>Đóng</Button>
        </SheetClose>
      </div>
      </SheetContent>
    </Sheet>
  )
}

export default CartModel
