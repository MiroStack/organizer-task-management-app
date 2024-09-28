import { IoTrashBin } from "react-icons/io5";
import { IoPencil } from "react-icons/io5";
import {motion} from 'framer-motion';
import { useContext, useEffect, useState } from "react";
import './Task.css'
import { toast } from "react-toastify";
import { ContextValue } from "../App";
function Task() {
    const {tasks, setTasks, sortMode, setIsAddTaskVisible, setTaskMode,  setSelectedId} = useContext(ContextValue);
    const [sortedTask, setSortedTask] = useState(tasks);
    const dateToday = Date.parse(new Date());

    const TodayTask = ()=>{
        const todayTask = tasks.filter((task, index)=>{
            const dates = new Date();
            const month = dates.getMonth() + 1;
            const today = dates.getDate();
            const year = dates.getFullYear();
            const dateToday = `${year}-${month <= 9? String(month).padStart(2, "0"): month}-${today}`;
            const scheduleDate = task.schedule.split(" ");
            console.log(scheduleDate[0]);
            console.log(dateToday)
            if(Date.parse(scheduleDate[0]) == Date.parse(dateToday)){
                return task;
            }
        })
        console.log(todayTask);
        setSortedTask(todayTask)

    }
    const UpcomingTask = ()=>{
        const upcomingTask = tasks.filter((task, index)=>{
            if(Date.parse(task.schedule) > dateToday){
                return task;
            }
        })
      
            const sortTaskBaseOnTime = upcomingTask.sort((a, b)=> Date.parse(a.schedule) - Date.parse(b.schedule));
            setSortedTask(sortTaskBaseOnTime)
      
      
    }
    const DueTask = ()=>{
        const dueTask = tasks.filter((task, index)=>{
            if(Date.parse(task.schedule) < dateToday){
                return task;
            }
        })
        setSortedTask(dueTask)
    }
    const CompeletedTask = ()=>{
        const completedTask = tasks.filter((task, index)=> task.isDone === true)
        setSortedTask(completedTask)
    }
     
     
     
     
    useEffect(()=>{
           switch(sortMode){
               case "Today Task":
                    TodayTask(); 
                    console.log(sortedTask)
               break;

               case "Upcoming Task":
                UpcomingTask();
               break;

               case "Due Task":
                DueTask();
               break;

               case "All Task":
                setSortedTask(tasks);
               break;

               case "Completed Task":
                CompeletedTask();
               break;
           }
    },[sortMode, tasks])

    
 
    const handleDeleteItem = (id)=>{
        const updatedTask = JSON.stringify(tasks.filter((task, index)=> task.id != id));
        localStorage.setItem("tasks", updatedTask);
        console.log(updatedTask);
        setTasks(JSON.parse(updatedTask));
        toast.success("Task is successfully deleted.")
    }
    const handleCheckStatus = (id)=>{
        
        const updatedTask = JSON.stringify(tasks.map((task, index)=>{
            let temp = {...task};
            console.log(temp)
            if(temp.id === id){
               temp.isDone = !temp.isDone;
            }
            return temp;
        }));
        localStorage.setItem("tasks", updatedTask);
        console.log(updatedTask);
        setTasks(JSON.parse(updatedTask));
    }
    const handleEdit=(id)=>{
        setIsAddTaskVisible(true);
        setTaskMode("Edit Mode");
        setSelectedId(id);
    }

    return(
        <div className="task-container">
             <table className="table">
                 <thead>
                    <tr>
                        <th>Done</th>
                        <th>Task</th>
                        <th>Priority</th>
                        <th>Label</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                 </thead>
                 <tbody>
                        {
                            sortedTask && sortedTask.length > 0 ? (
                                sortedTask.map((item, index)=> 
                                    <tr key={item.id}>
                                           <td  data-label="Done">
                                            <motion.input 
                                               whileTap={{
                                                   scale:1.3,
                                               }}
                                               type="checkbox" checked={item.isDone} onChange={()=>handleCheckStatus(item.id)}/></td>
                                           <td data-label="Task" style={{textDecoration:`${item.isDone == true? `line-through`:`none`}`,
                                                                         color:`${item.isDone == true? `green`:`#252525`}`}}>
                                               {item.task}
                                           </td>
                                           <td data-label="Priority">
                                               {item.priority}
                                           </td>
                                           <td data-label="Label">
                                               {item.label}
                                           </td>
                                           <td data-label="Date" style={{color:`${Date.parse(item.schedule) < dateToday? `red`:`#252525`}`}}>
                                               {item.schedule}
                                           </td>
                                           <td data-label="Action"  >
                                               <span> <IoTrashBin className="action-icons delete" onClick={()=>handleDeleteItem(item.id)}/></span>
                                               <span><IoPencil className="action-icons edit" onClick={()=>handleEdit(item.id)}/></span>
                                       </td>
                                   </tr>
                                   )
                            )
                          :(
                            <tr></tr>
                          )
                        }
                       
                 </tbody>
             </table>
        </div>
    )
}
export default Task;