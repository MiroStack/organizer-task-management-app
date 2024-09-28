import { useState, useContext, useEffect } from 'react';
import './TaskItemForm.css';
import { AnimatePresence, motion } from 'framer-motion';
import { ContextValue } from '../App';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
function TaskItemForm(){
    const{isAddTaskVisible,
         setIsSortOptionVisible,
         setIsAddTaskVisible,
         tasks,
         setTasks,
         taskMode,
         setTaskMode,
         selectedId,
         setSelectedId,
        } = useContext(ContextValue);

    const[task, setTask] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [label, setLabel] = useState("Personal");
    const [date, setDate] = useState("");
    const [hours, setHours] = useState(11);
    const [minutes, setMinutes] = useState(59);
    const [meridiem, setMeridiem] = useState("pm");
  
     const dates = new Date();
     const month = dates.getMonth() + 1;
     const today = dates.getDate();
     const year = dates.getFullYear();
     const dateToday = `${year}-${month}-${today}`;
     
useEffect(()=>{
    if(taskMode === "Edit Mode"){
        tasks.map((item)=>{
         const schedule = new Date(item.schedule);
         const hours = schedule.getHours();
         const minutes = schedule.getMinutes();
         const meridiem = hours >= 12 ? "pm":"am"
         const day = schedule.getDate();
         const months = schedule.getMonth() +1;
         const years = schedule.getFullYear();
          if(item.id === selectedId){
             setTask(item.task)
             setPriority(item.priority)
             setLabel(item.label)
             setHours(hours >= 12? hours-12 : hours);
             setMinutes(minutes);
             setDate(`${year}-${months < 10? String(months).padStart(2, "0"): months}-${day < 10? String(day).padStart(2, "0"): day}`);
          }
        })
      }
},[taskMode])
     //
            const handleTask = (e) =>{
                setTask(e.target.value);
            }
            const handlePriority = (e) =>{
                setPriority(e.target.value);
            }
            const handleLabel = (e) =>{
            setLabel(e.target.value);
            }
            const handleDate = (e) =>{
            setDate(e.target.value);
            }
            const handleHours = (e)=>{
            const hours = e.target.value;
            if(hours > 12){
                setHours(12);
            }
            else if(hours.length >=3){
                const newhours = String(hours).substring(1, 3);
                setHours(newhours)
            }
            else if(hours.length != 2 && hours < 10){
                const paddedhours = String(hours).padStart(2, "0");
                setHours(paddedhours);
            }
            else{
                setHours(hours);
            }

            }
            const handleMinutes = (e)=>{
            const minutes = e.target.value;
            if(minutes > 59){
                setMinutes(59);
            }
            else if(minutes.length >= 3){
                const newminutes = String(minutes).substring(1, 3);
                setMinutes(newminutes);
            }
            else if(minutes.length != 2 && minutes < 10){
                const paddedminutes = String(minutes).padStart(2, "0");
                setMinutes(paddedminutes);
            }
            else{
            setMinutes(minutes);
            }

            }

            const handleMeridiem = (e)=>{
            setMeridiem(e.target.value)
            } 



    const handleCancelClick = ()=>{
        setIsAddTaskVisible(false);
        setIsSortOptionVisible(false);
        setTaskMode("Add Mode");
        setSelectedId("");
        setTask("");
        setPriority("Medium");
        setLabel("Personal");
        setDate("dd/mm/yyyy");
        setHours(11);
        setMinutes(59);
        setMeridiem("pm");

    }
 //   
    const handleAddTask = ()=>{
        if(task != "" && date != ""){
           if(Date.parse(date) > Date.parse(dateToday)){
                    const taskId = "id" + Math.random().toString(16).slice(2);
                    const taskDetails = {
                        "isDone":false,
                        "id":taskId,
                        "task":task,
                        "priority":priority,
                        "label":label,
                        "schedule":`${date} ${hours}:${minutes} ${meridiem}`
                        }
                                   if (localStorage.length != 0) {
                                           const prevTasks = tasks; // return objects
                                           const newTasks = JSON.stringify([...prevTasks, taskDetails]);
                                           localStorage.setItem("tasks", newTasks);
                                           setTasks(JSON.parse(newTasks));
                                   }
                                   else{
                                       const newTasks = JSON.stringify([taskDetails]);
                                       localStorage.setItem("tasks", newTasks);
                                       setTasks(JSON.parse(newTasks));
                                       
                                   }
                            toast.success("Congratulations your task added succesfully.");
                            handleCancelClick();
                                
                        }
           else {
                   toast.warn(`Sorry you can't select previous dates.`)
           }
       }
       else{
               toast.warn("Sorry your task can't be saved. Please ensure to input your task or set the dates properly.");
       }
   }
//
   const handleEditTask=()=>{
    if(task != "" && date != ""){
        if(Date.parse(date) > Date.parse(dateToday)){
               const updatedTask = tasks.map((item, index)=>{
                    const temp = {...item};
                    if(temp.id === selectedId){
                        temp.task = task;
                        temp.priority = priority;
                        temp.label = label;
                        temp.schedule = `${date} ${hours}:${minutes} ${meridiem}`;
                    }
                    return temp;
                })
                localStorage.setItem("tasks", JSON.stringify(updatedTask));
                setTasks(updatedTask);
                toast.success("Your task is succesfully updated");
                handleCancelClick();
              
        }
        else {
                toast.warn(`Sorry you can't select previous dates.`)
        }
    }
    else{
            toast.warn("Sorry your task can't be saved. Please ensure to input your task or set the dates properly.");
    }
   }

   //
   const priorityOptions = ["Low", "Medium", "High"];
   const labelOptions = ["Personal", "Work", "Business"];


    return(
        <AnimatePresence mode="popLayout">
            {
                isAddTaskVisible &&(
                    
                    <motion.div 
                    initial={{
                        opacity:0,
                        scale:0.8,
                        x:"-50%",
                        y:"-50%",
                     
                    }}
                    animate={{
                        opacity:1,
                        scale:1,
                        x:"-50%",
                        y:"-50%",
                    }}
                    exit={{
                        opacity:0,
                        scale:0.8,
                        x:"-50%",
                        y:"-60%",

                    }}
                    transition={{
                        ease:"easeIn",
                        duration:.2,
                        

                    }}
                    className="task-form-container">
                    <h2>TASK FORM</h2>
                    
                    <div className='task-input-container'>
                        <h3>Task</h3>
                        <span className='input-wrapper'>
                            <input type="text" 
                                   placeholder='Task...' 
                                   value={task} 
                                   onChange={handleTask}/>
                        </span>
                    </div>
                  
                    
                    <div className='priority-container'>
                        <h3>Priority</h3>
                        <span className='input-wrapper'>
                            {
                                priorityOptions.map((item, index)=> priority != item?
                                <>
                                  <input type="radio" name='priority' key={index} value={item} onClick={handlePriority}/><label>{item}</label>

                                </>
                                         :
                                <>
                                  <input type="radio" name='priority' key={index} value={item} onClick={handlePriority} defaultChecked/><label>{item}</label>
       
                                </>                                    
                                )
                            }
                        </span>
                    </div>
                  
                
                    <div className='label-container'>
                        <h3>Label</h3>
                        <span className='input-wrapper'>
                        {
                                labelOptions.map((item, index)=> label != item?
                                <>
                                  <input type="radio" name='label' key={index} value={item} onClick={handleLabel}/><label>{item}</label>

                                </>
                                         :
                                <>
                                  <input type="radio" name='label' key={index} value={item} defaultChecked onClick={handleLabel}/><label>{item}</label>
                                </>                                    
                                )
                            }
            
                        </span>
                                    </div>
                  
                    <div className='date-container'>
                        <h3>Date</h3>
                        <span className='input-wrapper'>
                            <input type="date" className='date-input' value={date} onChange={handleDate}/> 
                        </span>     
                    </div>
                  
                    <div className='time-container'>
                        <h3>Time</h3>
                        <span className='input-wrapper'>
                                <input type="number"  maxLength={2} className='hours-input' min={1} max={12} value={hours} onChange={handleHours}/> 
                                <span>:</span>
                                <input type="number" maxLength={2} className='minutes-input' min={0} max={59} value={minutes} onChange={handleMinutes}/>
                                <select name="mediem" id="mediem" onChange={handleMeridiem}>
                                    <option value="pm">PM</option>        
                                    <option value="am">AM</option>
                                </select> 
                        </span>
                        
                    </div>
                  
                    <div className='btn-container'>
                        <button className='btn-cancel' onClick={handleCancelClick}>
                            CANCEL
                        </button>
                        <button  className='btn-edit' onClick={
                           taskMode === "Add Mode"? handleAddTask : handleEditTask
                        }>
                            ADD TASK
                        </button>
                    </div>
                  
            
                </motion.div>
                )
            }
       
        </AnimatePresence>
        
    )
}
export default TaskItemForm;