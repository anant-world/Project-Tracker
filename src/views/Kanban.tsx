import React from 'react'
import { useTaskStore } from '../store/useTaskStore'
import TaskCard from '../component/TaskCard';
import type{Task} from "../store/useTaskStore";
const columns=["todo","in-progress","review","done"];



export default function Kanban({tasks,users} : {tasks : Task[]
    users:{id:number ; name:string; taskId:string} [];
}) {
   
    const updateTask= useTaskStore((s) => s.updateTask)
    const draggingTaskId=useTaskStore((s)=>s.draggingTaskId);
    const setDraggingTask= useTaskStore((s)=>s.setDraggingTask);

  return (
    <div className='grid grid-cols-4 gap-4'>
        {columns.map((col)=>{
            const colTasks= tasks.filter((t)=> t.status===col);

            return (
                <div key={col}
                data-column={col}
                onPointerUp={()=>{
                    if(draggingTaskId){
                        updateTask(draggingTaskId,{status:col as any});
                        setDraggingTask(null)
                    }
                }}
                className='bg-gray-100 p-2 rounded h-[500px] overflow-y-auto'>
                    <h2 className='font-bold mb-2'>{col} ({colTasks.length})</h2>
                        {colTasks.length===0 && (
                            <div className='text-gray-400 text-sm'>No Tasks</div>
                        )}

                    {colTasks.map((task)=>(
                     <TaskCard key={task.id} task={task}/>
                    ))}
                </div>
            )
        })}
      
    </div>
  )
}

