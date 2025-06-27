import { Button, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

function App() {
  const [task,setTask]= useState('');
  const [tasks,setTasks]=useState([]);
  const [category,setCategory]=useState("Work");
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
    const newTask={
      text:task.trim(),
      category
    }
    setTasks([...tasks,newTask])
    // setTasks([...tasks,{text: task, category}]); -- can give like this also
    setTask('');
  }
  const deleteTask=(deleteIndex)=>{
    setTasks(tasks.filter((_,i)=>i!==deleteIndex));
  }
  return (
    <div>
      <div >
        <TextField placeholder='Enter the task' value={task} onChange={(e) => setTask(e.target.value)} />
          <select value={category} onChange={(e)=>setCategory(e.target.value)}>
            <option value="Work">Work</option>
            <option value="Home">Home</option>
            <option value="Fitness">Fitness</option>
            <option value="Others">Others</option>
          </select>
        <Button onClick={addTask}>+</Button>
      </div>
      <div>
        <h1>Todo Tamer</h1>
        <ul>
         {tasks.map((todo,i)=>(
          <li key={i}>
            {todo.text} <em>({todo.category})</em>
            <Button onClick={()=>deleteTask(i)}>❌</Button>
            </li>
         ))} 
         </ul>
      </div>
    </div>
  );
}

export default App;
