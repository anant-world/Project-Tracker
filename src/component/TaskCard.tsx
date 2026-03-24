import { useRef } from "react";
import { useTaskStore } from "../store/useTaskStore";
import type { Task } from "../store/useTaskStore";

export default function TaskCard({task,users=[]}: {task : Task;
    users?:[]
}){
    const setDraggingTask= useTaskStore ((s)=> s.setDraggingTask);
    const draggingTaskId= useTaskStore((s) => s.draggingTaskId);
    const cardRef= useRef<HTMLDivElement>(null);
    
    const isOverdue= new Date(task.dueDate) < new Date();
    const isToday= new Date(task.dueDate).toDateString() === new Date().toDateString();
    
    const getPriorityColor=()=>{
        switch(task.priority){
            case "critical":
                return "bg-red-500";
                case "high":
                    return "bg-orange-500";
                    case "medium":
                        return "bg-yellow-500";
                        default:
                    return "bg-green-500";
                }
            }
            
            const handlePointerDown= ()=>{
                setDraggingTask(task.id);
                
                const el= cardRef.current;
                if(!el) return ;
                
                const rect= el.getBoundingClientRect();
                
                const clone = el.cloneNode(true) as HTMLElement;
                clone.style.position= "fixed";
                clone.style.top= rect.top+"px";
                clone.style.left=rect.left+"px";
        clone.style.width= rect.width+"px";
        clone.style.pointerEvents= "none";
        clone.style.opacity= "0.8";
        clone.style.zIndex="999";
        clone.id="drag-preview"

        
        document.body.appendChild(clone);
        
        const move = (e:PointerEvent) => {
            clone.style.top=e.clientY +"px";
            clone.style.left=e.clientX + "px";
        }
        const up=(e:PointerEvent)=>{
            const el= document.elementFromPoint(e.clientX,e.clientY);
            
            const columnEl=el?.closest("[data-column]") as HTMLElement | null;
            
            if(columnEl){
                const column= columnEl.getAttribute("data-column");
                if(column){
                    const updateTask= useTaskStore.getState().updateTask;
                    updateTask(task.id,{status:column as any});
                }
            }
            
            clone.remove();
            setDraggingTask(null);
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup" , up)
        }
        window.addEventListener("pointermove" , move);
        window.addEventListener("pointerup",up);
        
        

      
    }
    return (
        <div ref={cardRef} onPointerDown={handlePointerDown} 
        className={`bg-white p-2 mb-2 rounded shadow cursor-grab ${draggingTaskId===task.id ? "opacity-0": ""}`}
        >
            <div className="font-medium">{task.title}</div>
            <div className="text-xs">{task.assignee}</div>
            
            <div className="flex justify-between items-center mt-2">
                <span
                className={`text-xs px-2 py-1 rounded text-white ${getPriorityColor()}`}>{task.priority}</span>
                
                <span className={`text-xs ${isOverdue ?"text-red-500" : ""}`}>
                    {isToday? "Due Today" : task.dueDate}
                </span>
            </div>
        </div>
    )
}