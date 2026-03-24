import type { Task } from "../store/useTaskStore";   

const statuses= ["todo","in-progress","review","done"] as const;
const priorities= ["low","medium" ,"high","critical"] as const;
const users=["AY","RK","PS","AM","JS","VK"];

export function generateTasks(count = 500):Task[]{
    return Array.from ({length:count}).map((_,i)=>({
        id:String(i),
        title:`Task ${i}`,
        status:statuses[Math.floor(Math.random()*4)],
        priority : priorities[Math.floor(Math.random()*4)],
        assignee:users[Math.floor(Math.random() * users.length)],
        dueDate:new Date(
            Date.now() +Math.random()  *10 *86400000
        ).toISOString()
    }))
}