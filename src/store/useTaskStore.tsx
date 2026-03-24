import {create} from "zustand"

export type Task= {
    id:string;
    title:string;
    status:"todo" | "in-progress" | "review" | "done";
    priority:"low" | "medium" | "high" | "critical";
    assignee:string;
    startDate?:string;
    dueDate:string;
};

type Store= {
    tasks:Task[];
    view:"kanban" | "list" | "timeline";
    draggingTaskId: string | null;
    setView:(v: Store ["view"]) => void;
    setDraggingTask:(id:string | null ) => void;
    updateTask:(id: string, updates:Partial<Task> )=> void;
};

export const useTaskStore= create<Store> ((set)=>({
    tasks:[],
    view:"kanban",
    draggingTaskId: null,
    
    setView: (view) => set({view}),

    setDraggingTask :(id) => set({draggingTaskId :id}),
    updateTask:(id,updates)=>
        set((state)=>({
            tasks:state.tasks.map((t)=>
            t.id===id?{...t,...updates}:t
        )
        }))
    
}))