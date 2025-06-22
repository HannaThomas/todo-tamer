import { useEffect, useRef, useState } from 'react';

function App() {
  const [task,setTask]= useState('');
  const [tasks,setTasks]=useState([]);
  const isFirstRender=useRef(true);
  // const [hasMounted,setHasMounted]=useState(false);
  //on mount
  useEffect(()=>{
    const savedTasks=JSON.parse(localStorage.getItem("tasks"));
    if(savedTasks) setTasks(savedTasks);
  },[]);
  //on update
  useEffect(()=>{
    // if(hasMounted){ localStorage.setItem("tasks",JSON.stringify(tasks));} else setHasMounted(true);
    if(isFirstRender.current){
      isFirstRender.current=false
      return;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
  },[tasks]);
  const addTask=()=>{
    if(task.trim()===""){ console.log("inside the if block");return};
    setTasks([...tasks,task]);
    setTask('');
  }
  const deleteTask=(deleteIndex)=>{
    setTasks(tasks.filter((_,i)=>i!==deleteIndex));
  }
  return (
    <div>
      <div >
        <input placeholder='Enter the task' value={task} onChange={(e) => setTask(e.target.value)} />
        <button onClick={addTask}>+</button>
      </div>
      <div>
        <h1>Todo Tamer</h1>
        <ul>
         {tasks.map((todo,i)=>(
          <li key={i}>
            {todo}
            <button onClick={()=>deleteTask(i)}>❌</button>
            </li>
         ))} 
         </ul>
      </div>
    </div>
  );
}

export default App;
