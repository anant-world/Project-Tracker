import React from 'react'
import { useTaskStore } from '../store/useTaskStore'
import type { Task } from '../store/useTaskStore';

export default function Timeline( {tasks}:{tasks:Task[]}) {

 

    const today= new Date();
    const year= today.getFullYear();
    const month=today.getMonth();

    const daysInMonth= new Date (year, month+1,0).getDate();
    const days= Array.from({length:daysInMonth}, (_,i)=>i+1);
    const getDay=(dateStr: string ) => new Date(dateStr).getDate();
    const getColor= (priority:string)=>{
      switch(priority){
        case "critical":
          return "bg-red-500";
        case "high":
          return "bg-orange-500";
        case "medium":
          return "bg-yellow-500";
        default:
          return "bg-green-500";
      }
    };
    const todayLeft= (today.getDate()-1)*80;

  return (
    <div className='overflow-x-auto border h-[400px] relative'>
     
     <div style={{position: "absolute",left:todayLeft,top:0,bottom:0,width:"2px"}} className='bg-red-500'/>

     <div className='flex sticky top-0 bg-white'>
      {days.map((d)=>(
        <div key={d} className='w-[80px] border text-center'>{d}
        </div>
      ))}
     </div>
     {tasks.map((task)=>{
      const start= task.startDate ?getDay(task.startDate) :getDay(task.dueDate);
      const end= getDay(task.dueDate);
      const left=(start-1) * 80;
      const width=(end-start +1) *80;

      return (
        <div key={task.id} className='relative h-[40px] border-b cursor-pointer'>
          <div style={{position:"absolute" , left , width}} className={`h-[30px] rounded  ${getColor(task.priority)}`}
          >{task.title}

          </div>
        </div>
      );
     })}
    </div>
  )
}


