import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { useDashBoardContext } from "@/lib/context/DashboardContextProvider"
type Props = {
  isModelOpen: boolean
  setIsModelOpen: (value: boolean) => void
}
export default function DishesModel({ isModelOpen, setIsModelOpen }: Props) {
const value = useDashBoardContext()
  if (!value) return
  const { sideBarColor } = value

    const handlePropagation:any = (e: MouseEvent)=>{
        e.preventDefault()
        e.stopPropagation()
    }
  return (
    <div>
      {isModelOpen && (
        <section
          onClick={() => setIsModelOpen(!isModelOpen)}
          className="w-full h-screen fixed top-0 left-0 bg-blur_bg flex justify-center py-10"
        >
          <div 
          onClick={handlePropagation}
          className="py-4 px-5 bg-light-bg_2 dark:bg-dark-bg_2 rounded-lg flex flex-col justify-between"
          >
            <Table className="min-w-[800px]">
              <TableCaption>A list of Dishes</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px] text-center">Ảnh</TableHead>
                  <TableHead>Tên</TableHead>
                  <TableHead className="w-[150px]">Giá</TableHead>
                  <TableHead className="w-[300px]">Mô tả</TableHead>
                  <TableHead className="w-[50px] text-right"></TableHead>
                </TableRow> 
              </TableHeader>
              <TableBody className="no-scrollbar">   
                <TableRow className="border-none cursor-pointer">
                  <TableCell className="font-medium">
                  <div className='flex items-center justify-center overflow-hidden w-[50px] h-[50px] border border-green-400 rounded-full'>
                  <img src="/images/logo2.png" width={50} height={50} alt="" className='object-contain' />
                  </div>
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right"><input type="checkbox" className="w-[20px] h-[20px] text-light-bg_2 dark:text-dark-bg_2" checked /></TableCell>
                </TableRow>
                <TableRow className="border-none cursor-pointer">
                  <TableCell className="font-medium">
                  <div className='flex items-center justify-center overflow-hidden w-[50px] h-[50px] border border-green-400 rounded-full'>
                  <img src="/images/logo2.png" width={50} height={50} alt="" className='object-contain' />
                  </div>
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right"><input type="checkbox" className="w-[20px] h-[20px] text-light-bg_2 dark:text-dark-bg_2" checked /></TableCell>
                </TableRow>
                <TableRow className="border-none cursor-pointer">
                  <TableCell className="font-medium">
                  <div className='flex items-center justify-center overflow-hidden w-[50px] h-[50px] border border-green-400 rounded-full'>
                  <img src="/images/logo2.png" width={50} height={50} alt="" className='object-contain' />
                  </div>
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right"><input type="checkbox" className="w-[20px] h-[20px] text-light-bg_2 dark:text-dark-bg_2" checked /></TableCell>
                </TableRow>
                <TableRow className="border-none cursor-pointer">
                  <TableCell className="font-medium">
                  <div className='flex items-center justify-center overflow-hidden w-[50px] h-[50px] border border-green-400 rounded-full'>
                  <img src="/images/logo2.png" width={50} height={50} alt="" className='object-contain' />
                  </div>
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right"><input type="checkbox" className="w-[20px] h-[20px] text-light-bg_2 dark:text-dark-bg_2" checked /></TableCell>
                </TableRow>
                <TableRow className="border-none cursor-pointer">
                  <TableCell className="font-medium">
                  <div className='flex items-center justify-center overflow-hidden w-[50px] h-[50px] border border-green-400 rounded-full'>
                  <img src="/images/logo2.png" width={50} height={50} alt="" className='object-contain' />
                  </div>
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right"><input type="checkbox" className="w-[20px] h-[20px] text-light-bg_2 dark:text-dark-bg_2" checked /></TableCell>
                </TableRow>
                <TableRow className="border-none cursor-pointer">
                  <TableCell className="font-medium">
                  <div className='flex items-center justify-center overflow-hidden w-[50px] h-[50px] border border-green-400 rounded-full'>
                  <img src="/images/logo2.png" width={50} height={50} alt="" className='object-contain' />
                  </div>
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right"><input type="checkbox" className="w-[20px] h-[20px] text-light-bg_2 dark:text-dark-bg_2" checked /></TableCell>
                </TableRow>
                <TableRow className="border-none cursor-pointer">
                  <TableCell className="font-medium">
                  <div className='flex items-center justify-center overflow-hidden w-[50px] h-[50px] border border-green-400 rounded-full'>
                  <img src="/images/logo2.png" width={50} height={50} alt="" className='object-contain' />
                  </div>
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right"><input type="checkbox" className="w-[20px] h-[20px] text-light-bg_2 dark:text-dark-bg_2" checked /></TableCell>
                </TableRow>
                <TableRow className="border-none cursor-pointer">
                  <TableCell className="font-medium">
                  <div className='flex items-center justify-center overflow-hidden w-[50px] h-[50px] border border-green-400 rounded-full'>
                  <img src="/images/logo2.png" width={50} height={50} alt="" className='object-contain' />
                  </div>
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right"><input type="checkbox" className="w-[20px] h-[20px] text-light-bg_2 dark:text-dark-bg_2" checked /></TableCell>
                </TableRow>
                <TableRow className="border-none cursor-pointer">
                  <TableCell className="font-medium">
                  <div className='flex items-center justify-center overflow-hidden w-[50px] h-[50px] border border-green-400 rounded-full'>
                  <img src="/images/logo2.png" width={50} height={50} alt="" className='object-contain' />
                  </div>
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right"><input type="checkbox" className="w-[20px] h-[20px] text-light-bg_2 dark:text-dark-bg_2" checked /></TableCell>
                </TableRow>
                <TableRow className="border-none cursor-pointer">
                  <TableCell className="font-medium">
                  <div className='flex items-center justify-center overflow-hidden w-[50px] h-[50px] border border-green-400 rounded-full'>
                  <img src="/images/logo2.png" width={50} height={50} alt="" className='object-contain' />
                  </div>
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right"><input type="checkbox" className="w-[20px] h-[20px] text-light-bg_2 dark:text-dark-bg_2" checked /></TableCell>
                </TableRow>
                <TableRow className="border-none cursor-pointer">
                  <TableCell className="font-medium">
                  <div className='flex items-center justify-center overflow-hidden w-[50px] h-[50px] border border-green-400 rounded-full'>
                  <img src="/images/logo2.png" width={50} height={50} alt="" className='object-contain' />
                  </div>
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right"><input type="checkbox" className="w-[20px] h-[20px] text-light-bg_2 dark:text-dark-bg_2" checked /></TableCell>
                </TableRow>
                <TableRow className="border-none cursor-pointer">
                  <TableCell className="font-medium">
                  <div className='flex items-center justify-center overflow-hidden w-[50px] h-[50px] border border-green-400 rounded-full'>
                  <img src="/images/logo2.png" width={50} height={50} alt="" className='object-contain' />
                  </div>
                  </TableCell>
                  <TableCell>Paid</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell>Credit Card</TableCell>
                  <TableCell className="text-right"><input type="checkbox" className="w-[20px] h-[20px] text-light-bg_2 dark:text-dark-bg_2" checked /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
            <Button 
            style={sideBarColor ? {backgroundColor: sideBarColor}: {backgroundColor: '#11cdef'}}
            className="min-w-[200px] mx-auto mb-5 text-[19px] text-white dark:text-white transition-all duration-300 ease-out hover:translate-y-[-2%] hover:scale-110"
            >
            Thêm
            </Button>
          </div>
        </section>
      )}
    </div>
  )
}
