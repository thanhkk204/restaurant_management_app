import { useSortable } from '@dnd-kit/sortable'
import { CSS } from "@dnd-kit/utilities"
import { TableType } from '../page'
import { Button } from '@/components/ui/button'

type Props = {
  table: TableType
  deleteTable: (table_id: string) => void
}
export default function Item(Props:Props ) {
const {
  table,
  deleteTable
} = Props
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
  if(isDragging) return (
    <div
    ref={setNodeRef}
    style={style}
    {...attributes}
    {...listeners}
    >
    <div className='min-w-[80px] min-h-[80px] rounded-md bg-light-bg_2 dark:bg-dark-bg_2 flex items-center justify-center truncate px-4 py-3 opacity-45 text-light-text dark:text-dark-text'>
      <button onClick={()=> alert('thanh')}>{table.order}</button>
    </div>
    </div>
  )
  return (
    <div
    ref={setNodeRef}
    style={style}
    {...attributes}
    {...listeners}
    >
    <div className='relative min-w-[80px] min-h-[80px] rounded-md bg-light-bg_2 dark:bg-dark-bg_2 flex items-center justify-center px-4 py-3 text-light-text dark:text-dark-text'>
      <button
       onClick={(e: any)=>handleDelete(e)}
       className='absolute text-[15px] w-[20px] h-[20px] flex items-center justify-center top-0 left-0 translate-x-[-50%] translate-y-[-50%] rounded-full
       bg-light-error dark:bg-dark-error border-none text-white dark:text-white hover:scale-90 transition-all ease-in-out shadow-none hover:shadow-shadown_hover'
      >
        X
      </button>
      <button onClick={()=> alert('thanh')}>{table.order}</button>
    </div>
    </div>
  )
}
