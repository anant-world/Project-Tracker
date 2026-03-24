import  { useRef, useState } from 'react'
import { useTaskStore } from '../store/useTaskStore'
import type {Task} from "../store/useTaskStore"
export default function List({tasks} : {tasks:Task[]}) {


    const updateTask= useTaskStore((s)=>s.updateTask);

    const [sortKey, setSortKey]=useState<"title" | "priority" | "dueDate">("title");
    const [sortDir, setSortDir]=useState<"asc" | "desc">("asc");


    const ROW_HEIGHT=50;
    const BUFFER=5;
    
    const containerRef= useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);

    const handleScroll= ()=>{
        if(containerRef.current){
            setScrollTop(containerRef.current.scrollTop);
        }
    };
    
    const sortedTasks= [...tasks].sort((a,b)=>{
      let valA:any=a[sortKey];
      let valB: any= b[sortKey];
      
      if(sortKey === "priority"){
        const order= {critical : 4, high : 3 , medium:2 ,low:1};
        valA= order[a.priority];
        valB=order[b.priority];
      }
      if(sortKey==="dueDate"){
        valA=new Date(a.dueDate).getTime();
        valB= new Date(b.dueDate).getTime();
      }
      if(valA < valB) return sortDir==="asc" ? -1 :1 ;
      if(valA > valB) return sortDir==="asc" ? 1 : -1;
      return 0;
    })
    
    const total= sortedTasks.length;
    const handleSort= (key:typeof sortKey)=>{
      if(sortKey === key){
        setSortDir(sortDir === "asc" ? "desc": "asc");
      }
      else{
        setSortKey(key);
        setSortDir("asc")
      }
    }

    const startIndex= Math.floor(scrollTop / ROW_HEIGHT);
    const containerHeight=500;
    const visibleCount= Math.ceil(containerHeight/ROW_HEIGHT);

    const endIndex=Math.min (startIndex+visibleCount + BUFFER,total);

    const visibleTasks= sortedTasks.slice(startIndex,endIndex);

    const offsetY= startIndex*ROW_HEIGHT;


  return (
    <div>
      <div className='flex border-b font-bold'>
        <div onClick={()=>handleSort("title")} className='w-1/4 cursor-pointer'>
          Title {sortKey==="title" ? (sortDir === "asc" ? "↑":"↓"):""}
        </div>

        <div className='w-1/4 '>Status</div>
         
        <div onClick={()=>handleSort("priority")}className='w-1/4 cursor-pointer'>
          Priority {sortKey==="priority" ? (sortDir ==="asc" ? "↑" : "↓"): ""}
          </div> 
          <div onClick={()=>handleSort("dueDate")} className='w-1/4 cursor-pointer'>
            DueDate {sortKey=== "dueDate" ? (sortDir==="asc" ? "↑" :"↓"):""}
          </div>
      </div>

      <div ref={containerRef}
      onScroll={handleScroll}
      className='h-[500px] overflow-auto border'
      >
        <div style={{height:total * ROW_HEIGHT , position:"relative"}}>
          <div style={{transform : `translateY(${offsetY}px)`}}>
          {visibleTasks.map((t)=>(
            <div key={t.id}
            className='h-[50px] border-b flex items-center px-2'>
              <div className='w-1/4'>{t.title}</div>

              <div className='w-1/4' >
              <select value={t.status} onChange={(e) => updateTask(t.id,{status:e.target.value as any}) } className='border rounded px-1'>
                <option value={"todo"}>Todo</option>
                <option value={"in-progress"}>In Progress</option>
                <option value="review">Review</option>
                <option value="done">Done</option>
                </select>
                </div>
                 <div className='w-1/4'>{t.priority}</div>

                 <div className='w-1/4'>{t.dueDate}</div>
            </div>
          ))}
          </div>

        </div>

      </div>
    </div>
  );
}