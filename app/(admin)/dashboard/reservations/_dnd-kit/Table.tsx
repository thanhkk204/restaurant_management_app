import { useSortable } from '@dnd-kit/sortable'
import { CSS } from "@dnd-kit/utilities"
import { TableType } from '../page'
import { Button } from '@/components/ui/button'
import { UsersRound } from 'lucide-react'
import { useEffect, useState } from 'react'
import { toast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { ReservationType } from '@/lib/constants/type'
import TimeInterval from '@/components/custom_ui/TimeInterval'

type InputValue = {
  number_of_seats: number,
  name: string,
  table_id: string
}
type Props = {
  table: TableType
  deleteTable: (table_id: string) => void
  updateTable: ({ number_of_seats, name,table_id}:{
    number_of_seats: number,
    name: string,
    table_id: string
  }) => void
}
export default function Item({
  table,
  deleteTable,
  updateTable
}:Props ) {
  // input for updating
  const [inputValue, setInputValue] = useState<InputValue>({
    number_of_seats: table.number_of_seats,
    name: table.name,
    table_id: table._id
  })
  const [editModelForTextInput, setEditModelForTextInput] = useState<boolean>(false)
  const [editModleForNumberInput, setEditModleForNumberInput] = useState<boolean>(false)
  const [reservationStartTime, setReservationStartTime] = useState<string>('')
  const [getTimeLoading, setGetTimeLoading] = useState<boolean>(false)
  const router = useRouter()
  
  // Get start time for interval timer
  const getReservationDetail = async () => {
    setGetTimeLoading(true)
    try {
      const res = await fetch(
        "/api/reservations/seatedReservation/" +
          table._id,
        {
          method: "GET",
        }
      )
      const data = await res.json()
      const reservationDetail = data.reservationDetail as ReservationType
      if (!res.ok) {
       return toast({
          variant: "destructive",
          title: "Something went wrong with get time interval!",
        })
      }
      setReservationStartTime(reservationDetail.startTime)
      setGetTimeLoading(false)
    } catch (error) {
      console.log('error', error)
      setGetTimeLoading(false)
      toast({
        variant: "destructive",
        title: "Something went wrong with get time interval!",
      })
    }
  }
  useEffect(()=>{
     if (table.status === 'ISSERVING') {
      getReservationDetail()
     }
  },[table])
const {
  setNodeRef,
   transform,
   transition,
   listeners,
   attributes,
   isDragging
  } = useSortable({
    id: table._id,
    data: {
      type: "table",
      table
    },
  })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }
  const handleDelete = (e:MouseEvent) =>{
    e.preventDefault()
    deleteTable(table._id)
  }
  // update information
  const handleUpdateTable = (e: any)=>{
    e.preventDefault()
    setEditModelForTextInput(false)
    setEditModleForNumberInput(false)
    updateTable(inputValue)
  }
  const handleOnKeyDown = (e: any) =>{
    if(e.key === "Enter"){
      setEditModelForTextInput(false)
      setEditModleForNumberInput(false)
      updateTable(inputValue)
    }
  }
  const handleChangeInput = (e : any)=>{
    if(e.target.name === 'number_of_seats'){
       if(parseInt(e.target.value) < 1){
        return toast({
          variant: "destructive",
          title: "At least 1"
        })
       }
      return setInputValue(pre=>({
        ...pre,
        [e.target.name]: parseInt(e.target.value)
       }))
    }
   setInputValue(pre=>({
    ...pre,
    [e.target.name]: e.target.value
   }))
  }
  const createReservation = (table_id: string)=>{
    router.push('/dashboard/reservations/createReservation/'+ table_id)
  }
  const editReservation = (table_id: string)=>{
   router.push('/dashboard/reservations/updateReservation/'+ table_id)
 }
  // Overlayout
  if(isDragging) return (
    <div
    ref={setNodeRef}
    style={style}
    {...attributes}
    {...listeners}
    className='relative pointer-events-none opacity-45'
    >
    <div className={
      cn(
        'relative z-10 min-w-[80px] min-h-[80px] rounded-md flex flex-col items-center justify-center bg-light-bg_2 dark:bg-dark-bg_2 px-4 py-3 text-light-text dark:text-dark-text',
        !( table.status === "AVAILABLE") && 'opacity-30'
      )
    }>
      {
        table.status === "AVAILABLE" && (<button
          onClick={(e: any)=>handleDelete(e)}
          className='absolute text-[15px] w-[20px] h-[20px] flex items-center justify-center top-0 left-0 translate-x-[-50%] translate-y-[-50%] rounded-full
          bg-light-error dark:bg-dark-error border-none text-white dark:text-white hover:scale-90 transition-all ease-in-out shadow-none hover:shadow-shadown_hover'
         >
           X
         </button>)
      }
      
      {
        editModelForTextInput ? (<input 
          autoFocus
          type="text"  
          name='name' 
          value={inputValue.name} 
          onChange={e=>handleChangeInput(e)} 
          onBlur={(e)=>handleUpdateTable(e)}
          onKeyDown={(e)=>handleOnKeyDown(e)}
          className='bg-transparent dark:bg-transparent w-full px-2 focus:outline-none'
          />) : <h4 onClick={()=>setEditModelForTextInput(true)}>{inputValue.name}</h4>
      }
      <p className='separate_line my-2'></p>
      <div className='w-full flex flex-col justify-between gap-3 mt-1'>
        <div className='flex items-center gap-2'>
       <div className='min-h-[20px] min-w-[20px]'>
       <UsersRound width={20} height={20}/>
       </div>
        {
        editModleForNumberInput ? (<input 
          autoFocus
          type="number"  
          name='number_of_seats' 
          value={inputValue.number_of_seats} 
          onChange={e=>handleChangeInput(e)} 
          onBlur={(e)=>handleUpdateTable(e)}  
          onKeyDown={(e)=>handleOnKeyDown(e)}
          className='bg-transparent dark:bg-transparent w-full focus:outline-none'
          />) : <h4 onClick={()=>setEditModleForNumberInput(true)} className='flex-grow'>{inputValue.number_of_seats}</h4>
      }
        </div>
        <div className='flex items-center gap-2'>
        {/* <Annoyed width={20} height={20}/> */}
        <span>TT :</span>
        <p className='font-thin text-[14px] text-light-error dark:text-dark-error'>{table.status === "AVAILABLE" ? "Có Sẵn" : table.status === "ISBOOKED" ? "Đã được đặt" : "Đang phục vụ" }</p>
        </div>
      </div>
      <div className='mt-2 w-full flex items-center justify-end'>
        <Button className='font-medium hover:scale-90 transition-all duration-300 ease-in-out backface-visibility-hidden'>Tạo đơn</Button>
      </div>
    </div>

    {
      !(table.status === "AVAILABLE") && (
        <div className='absolute z-30 inset-0 top-0 left-0 w-full h-full bg-blur_bg dark:bg-blur_bg flex items-center justify-center rounded-md'>
        {
          table.status === "ISSERVING" ? 
          <h1 className='font-semibold text-[19px] text-light-warning dark:text-dark-warning'>Đang phục vụ</h1>:
          <h1 className='font-semibold text-[19px] text-light-error dark:text-dark-error'>Đã được đặt</h1> 
        }
        </div>
      )
    }
    </div>
  )

  return (
    <div
    ref={setNodeRef}
    style={style}
    {...attributes}
    {...listeners}
    className='relative'
    >
    <div className={
      cn(
        'relative z-10 min-w-[80px] min-h-[80px] rounded-md flex flex-col items-center justify-center bg-light-bg_2 dark:bg-dark-bg_2 px-4 py-3 text-light-text dark:text-dark-text',
        !( table.status === "AVAILABLE") && 'opacity-30'
      )
    }>
      {
        table.status === "AVAILABLE" && (<button
          onClick={(e: any)=>handleDelete(e)}
          className='absolute text-[15px] w-[20px] h-[20px] flex items-center justify-center top-0 left-0 translate-x-[-50%] translate-y-[-50%] rounded-full
          bg-light-error dark:bg-dark-error border-none text-white dark:text-white hover:scale-90 transition-all ease-in-out shadow-none hover:shadow-shadown_hover'
         >
           X
         </button>)
      }
      
      {
        editModelForTextInput ? (<input 
          autoFocus
          type="text"  
          name='name' 
          value={inputValue.name} 
          onChange={e=>handleChangeInput(e)} 
          onBlur={(e)=>handleUpdateTable(e)}
          onKeyDown={(e)=>handleOnKeyDown(e)}
          className='bg-transparent dark:bg-transparent w-full px-2 focus:outline-none'
          />) : <h4 onClick={()=>setEditModelForTextInput(true)}>{inputValue.name}</h4>
      }
      <p className='separate_line my-2'></p>
      <div className='w-full flex flex-col justify-between gap-3 mt-1'>
        <div className='flex items-center gap-2'>
       <div className='min-h-[20px] min-w-[20px]'>
       <UsersRound width={20} height={20}/>
       </div>
        {
        editModleForNumberInput ? (<input 
          autoFocus
          type="number"  
          name='number_of_seats' 
          value={inputValue.number_of_seats} 
          onChange={e=>handleChangeInput(e)} 
          onBlur={(e)=>handleUpdateTable(e)}  
          onKeyDown={(e)=>handleOnKeyDown(e)}
          className='bg-transparent dark:bg-transparent w-full focus:outline-none'
          />) : <h4 onClick={()=>setEditModleForNumberInput(true)} className='flex-grow'>{inputValue.number_of_seats}</h4>
      }
        </div>
        <div className='flex items-center gap-2'>
        {/* <Annoyed width={20} height={20}/> */}
        <span>TT :</span>
        <p className='font-thin text-[14px] text-light-error dark:text-dark-error'>{table.status === "AVAILABLE" ? "Có Sẵn" : table.status === "ISBOOKED" ? "Đã được đặt" : "Đang phục vụ" }</p>
        </div>
      </div>
      <div className='mt-2 w-full flex items-center justify-end'>
        <Button 
        onClick={()=>createReservation(table._id)}
        className='font-medium hover:scale-90 transition-all duration-300 ease-in-out backface-visibility-hidden'
        >
        Tạo đơn
        </Button>
      </div>
    </div>

    {
      !(table.status === "AVAILABLE") && (
        <div 
        onClick={()=>editReservation(table._id)}
        className='absolute z-30 inset-0 top-0 left-0 w-full h-full bg-blur_bg dark:bg-blur_bg flex items-center justify-center rounded-md'>
        {
          table.status === "ISSERVING" ? 
          (<div className='w-full h-full flex flex-col gap-1 items-center justify-center'>
            <h1 className='font-semibold text-[19px] text-light-warning dark:text-dark-warning'>Đang phục vụ </h1>
           {getTimeLoading ? <div>00:00:00</div>: <TimeInterval reservationStartTime={reservationStartTime}/>} 
          </div>):
          <h1 className='font-semibold text-[19px] text-light-error dark:text-dark-error'>Đã được đặt</h1> 
        }
        </div>
      )
    }
    </div>
  )
}
