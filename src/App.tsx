import { useState } from 'react'
import { useTaskStore } from './store/useTaskStore'
import Kanban from "./views/Kanban"
import List from './views/List'
import Timeline from './views/Timeline'
import { useEffect } from 'react'
import { generateTasks } from './utils/generateTasks'
import FilterBar from './component/FilterBar'

function App() {
 const {view , setView } = useTaskStore();
  const tasks= useTaskStore((s)=>s.tasks);

 const [filters, setFilters] = useState({
  status:[]as string[],
  priority:[] as string[],
  assignee:[] as string[],
 })

 const [activeUsers, setActiveUsers] = useState([
  {id:1, name:"A",taskId:""},
  {id:2,name:"B",taskId:""},
  {id:3,name:"C" , taskId:""}
 ]);

 useEffect(() => {
  if (tasks.length === 0) return;

  const interval = setInterval(() => {
    setActiveUsers((prev) =>
      prev.map((u) => ({
        ...u,
        taskId: tasks[Math.floor(Math.random() * tasks.length)]?.id,
      }))
    );
  }, 2000);

  return () => clearInterval(interval);
}, [tasks]);

 useEffect(()=>{
  const params= new URLSearchParams(window.location.search);

  setFilters({
    status: params.get("status")?.split(",") || [],
    priority:params.get("priority")?.split(",") || [],
    assignee:params.get("assignee")?.split(",") || [],
  })
 },[])

 useEffect(()=>{
  const params= new URLSearchParams();

  if(filters.status.length){
    params.set("status",filters.status.join(","));

  }
  if(filters.priority.length){
    params.set("priority",filters.priority.join(","));
  }
  if(filters.assignee.length)
    params.set("assignee", filters.assignee.join(","));
  window.history.pushState({},"" , `?${params.toString()}`)
 },[filters])

  useEffect (()=>{
    useTaskStore.setState({tasks :generateTasks(500)})
  },[])

  const filteredTasks= tasks.filter((t)=>{
    if(filters.status.length && !filters.status.includes(t.status))
      return false;
    if(filters.priority.length && !filters.priority.includes(t.priority))
      return false;
    if(filters.assignee.length && !filters.assignee.includes(t.assignee))
      return false;
    return true;
  })

  return (
    <>
      <div className='p-4'>
        <FilterBar filters={filters} setFilters={setFilters} />
        <div className='flex gap-2 mb-4'>
          {["kanban","list","timeline"].map((v)=>(
            <button
            key={v}
            onClick={()=>setView (v as any)} className='px-3 py-1 border rounded cursor-pointer'>{v}
            </button>
          ))}
        </div>

        {view === "kanban" && <Kanban tasks={filteredTasks} users={activeUsers}/>}
        {view === "list" && <List tasks={filteredTasks}/>}
        {view === "timeline" && <Timeline tasks={filteredTasks}/>}

      </div>
    </>
  )
}

export default App
