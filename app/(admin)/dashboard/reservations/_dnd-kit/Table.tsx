import { useSortable } from '@dnd-kit/sortable'
import { CSS } from "@dnd-kit/utilities"
import { TableType } from '../page'

type Props = {
  table: TableType
}
export default function Item(Props:Props ) {
const {
  table
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
    <div className='min-w-[80px] min-h-[80px] rounded-md bg-light-bg_2 dark:bg-dark-bg_2 flex items-center justify-center truncate px-4 py-3 text-light-text dark:text-dark-text'>
      <button onClick={()=> alert('thanh')}>{table.order}</button>
    </div>
    </div>
  )
}
