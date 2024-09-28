import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { IoAdd } from "react-icons/io5";
import {motion, AnimatePresence} from "framer-motion";
import { useEffect, useContext} from "react";
import { ContextValue} from "../App";
import "./SearchAndAddComponent.css"
import { toast } from "react-toastify";
import { useState } from "react";
function SearchAndAddComponent() {
   
    const{sortOptionVisible,
         setIsSortOptionVisible,
         setIsAddTaskVisible,
         sortMode,
         setSortMode,
         tasks,
         setTasks} = useContext(ContextValue);
    const sortOptions = ["All Task", "Today Task", "Upcoming Task", "Due Task", "Completed Task"];
    const[searchTask, setSearchTask]= useState("");
   
    const handleOptionClick =()=>{
        setIsSortOptionVisible(prev => prev===true? false:true);
    }
    const hadnleAddTaskFormClick = ()=>{
        setIsAddTaskVisible(prev => prev === true? false:true);
    }
    const handleSortMode = (e)=>{
        const sortOption = document.querySelectorAll('.sort-option li');
        const selectedOption = e.target.closest('li');
        const optionValue = selectedOption.textContent;
        sortOption.forEach((item)=>{
            item.classList.remove('active-sort-option');
        })
        selectedOption.classList.add('active-sort-option')
        setSortMode(optionValue);
        handleOptionClick();
    }
    const handleSearch = (e)=>{
         setSearchTask(e.target.value);
    }
    useEffect(()=>{
        if(searchTask.trim() != ""){
            const filteredTask = tasks.filter((item, index)=> item.task.toLowerCase().includes(searchTask.toLowerCase()));
            setTasks(filteredTask);
        }
        else{
            const originalTasks = JSON.parse(localStorage.getItem("tasks")) || [];
            setTasks(originalTasks);
        }
       
    },[searchTask])
   
 
    return(
       
        <div className="search-add-container">
            <div className="search-container">
                <input
                  type="text" 
                  placeholder="Search..."
                  value={searchTask}
                  onChange={handleSearch}
                  />
                <motion.span 
                     whileHover={{scale: 1.2}}
                     onClick={handleOptionClick}
                     className="sort-icons-container">
                    <IoEllipsisVerticalSharp 
                     className="sort-icons"
                    />  
              
                </motion.span>

                <AnimatePresence mode="popLayout">
                    {
                        sortOptionVisible &&(
                            <motion.ul 
                            initial={
                                {
                                
                                    opacity:0,
                                    scale:.8,
                                    }
                                }
                            animate={
                                {
                                    opacity:1,
                                    scale:1,

                                }
                            }
                            exit={
                                {
                                    opacity:0,
                                    scale:.8,

                                }
                            }
                            transition={
                                {
                                    duration: .2,
                                    ease: "backInOut",
                                }
                            }
                            className="sort-option"
                                         >
                                            {
                                                sortOptions.map((option, index)=>{
                                                    if(option === sortMode){
                                                       return(
                                                         <li key={index} className="active-sort-option" onClick={handleSortMode}>
                                                            {option}
                                                        </li>
                                                       ) 
                                                    }else{
                                                        return(
                                                            <li key={index} onClick={handleSortMode}>
                                                               {option}
                                                           </li>
                                                          ) 
                                                    }
                                                })
                                            }
                            </motion.ul>      
                        )
                    }
                </AnimatePresence>
                 
                
            </div>
            <motion.button
               whileTap={{scale:.9}}
               className="add-button-mobile"
               onClick={hadnleAddTaskFormClick}
              
                >
               <IoAdd className="icons"/>
            </motion.button>
            <motion.button
             whileTap={{scale:.9}}
             onClick={hadnleAddTaskFormClick}
             className="add-button">
             ADD TASK
        </motion.button>
   </div>
  
    )
}
export default SearchAndAddComponent