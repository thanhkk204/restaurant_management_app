// "use client"
// import React, { use, useEffect, useRef, useState } from "react"
// import {
//   DndContext,
//   closestCenter,
//   useSensor,
//   useSensors,
//   DragEndEvent,
//   PointerSensor,
//   DragStartEvent,
//   MouseSensor,
// } from "@dnd-kit/core"
// import {
//   SortableContext,
//   useSortable,
//   arrayMove,
//   verticalListSortingStrategy,
// } from "@dnd-kit/sortable"
// import { CSS } from "@dnd-kit/utilities"
// import HTMLFlipBook from "react-pageflip"

// type PageProps = {
//   children: React.ReactNode
//   number: string
// }

// const Page = React.forwardRef<HTMLDivElement, PageProps>((props, ref) => {
//   return (
//     <div className="demoPage bg-black/20" ref={ref}>
//       {/* ref required */}
//       <h1>Page Header</h1>
//       <p>{props.children}</p>
//       <p>Page number: {props.number}</p>
//     </div>
//   )
// })

// interface SortableItemProps {
//   id: string
//   children: React.ReactNode
// }

// const SortableItem: React.FC<SortableItemProps> = ({ id, children }) => {
//   const { attributes, listeners, setNodeRef, transform, transition } =
//     useSortable({ id })

//   const style: React.CSSProperties = {
//     transform: CSS.Transform.toString(transform),
//     transition,
//     marginBottom: "8px",
//     padding: "10px",
//     border: "1px solid #ccc",
//     cursor: "grab",
//     backgroundColor: "#fff",
//     color: "black",
//   }

//   return (
//     <div
//       ref={setNodeRef}
//       style={style}
//       {...attributes}
//       {...listeners}
      
//       className="w-[150px]"
//     >
//       {children}
//     </div>
//   )
// }


// const MyBookCusTom: React.FC = () => {
//   const [productList3, setProductList3] = useState<string[]>([
//     "Product 5",
//     "Product 6",
//   ])
//   const flipBookRef = useRef<any>(null)
//   const [isdraging, setIsDraging] = useState<boolean>(false)
//   const [pageNumber, setPageNumber] = useState<number>(0)
//   const [pages, setPages] = useState<string[][]>([[], []])

//   const sensors = useSensors()
//   // useSensor(MouseSensor, {
//   //   activationConstraint: {
//   //     // Require the mouse to move by 10 pixels before activating
//   //     distance: 1,
//   //   },
//   // })

//   const handleDragStart = (event: DragStartEvent) => {
//     setIsDraging(true)
//     if(flipBookRef && flipBookRef.current){
//      console.log( flipBookRef.current)
//     }
//   }

//   const handleDragEnd = (event: DragEndEvent) => {
//     setIsDraging(false)
//     const { active, over } = event
//     if (!over || !active) return
//     console.log({ active, over })

//     const activeContainer = active.data.current?.sortable.containerId as string
//     const overContainer =
//       (over.data.current?.sortable.containerId as string) || over.id
//   }

//   return (
//     <DndContext
//       collisionDetection={closestCenter}
//       onDragEnd={handleDragEnd}
//       onDragStart={handleDragStart}
//     >
//       <div style={{ display: "flex", flexDirection: "column" }}>
//         {/* Quyển sách */}

//         <button onClick={() => flipBookRef.current.pageFlip().flipPrev()}>
//           pre page
//         </button>
//         <button onClick={() => flipBookRef.current.pageFlip().flipNext()}>
//           Next page
//         </button>
//         <HTMLFlipBook
//           style={{}}
//           // children={{}}
//           startPage={0}
//           width={300}
//           height={500}
//           drawShadow={true}
//           flippingTime={800}
//           usePortrait={true}
//           startZIndex={0}
//           autoSize={true}
//           clickEventForward={false}
//           useMouseEvents={!isdraging}
//           swipeDistance={0}
//           showPageCorners={false}
//           disableFlipByClick={true}
//           size="fixed"
//           minWidth={315}
//           maxWidth={1000}
//           minHeight={400}
//           maxHeight={533}
//           maxShadowOpacity={0.5}
//           showCover={true}
//           mobileScrollSupport={true}
//           onFlip={(e) => {console.log('onFlip')}}
//           onChangeOrientation={()=>{console.log('onChangeOrietation')}}
//           onChangeState={(e)=>{
//             console.log('onChange')
//             console.log(e)
//             e.object.setting.useMouseEvents = false
//             if(isdraging){
//               console.log('isDraging onChange')
//             }
//           }}
//           className="demo-book"
//           ref={flipBookRef}
//         >
//           <Page number="1">
//             <SortableContext
//               items={productList3}
//               strategy={verticalListSortingStrategy}
//             >
//               {productList3.map((product) => (
//                 <SortableItem key={product} id={product}>
//                   {product}
//                 </SortableItem>
//               ))}
//             </SortableContext>
//           </Page>
//           <Page number="2">
//             <div>Pag 2</div>
//           </Page>

//           <Page number="3">
//             <div>Pag 3</div>
//             <button>Click</button>
//           </Page>
//           <Page number="4">
//             <div>Pag 4</div>
//           </Page>
//           <Page number="5">
//             <div>Pag 5</div>
//           </Page>
//           <Page number="6">
//             <div>Pag 6</div>
//           </Page>
//           <Page number="7">
//             <div>Pag 7</div>
            
//           </Page>
//         </HTMLFlipBook>
//       </div>
//     </DndContext>
//   )
// }

// export default MyBookCusTom
