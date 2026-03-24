import React from 'react'

export default function FilterBar({filters, setFilters}:any) {

    const toggle= (key:string,value:string)=>{
        setFilters((prev:any)=>{
            const exists= prev[key].includes(value);
            return {
                ...prev,
                [key]:exists
                ? prev[key].filter((v:string)=> v!==value)
                :[...prev[key],value]
            }
        })
    }
  return (
    <div className='flex gap-2 mb-4'>
      {["todo","in-progress","review","done"].map((s)=>(
        <button key={s}
        onClick={()=> toggle("status",s)}
        className={`px-2 py-1 border ${
            filters.status.includes(s) ? "bg-blue-300":""}`
        }>{s}</button>
      ))}
      {["low","medium","high","critical"].map((p)=>(
        <button
        key={p}
        onClick={()=>toggle("priority",p)}
        className={`px-2 py-1 border ${
            filters.priority.includes(p) ? "bg-green-300":""
        }`}>
            {p}
        </button>
      ))}
    </div>
  )
}


