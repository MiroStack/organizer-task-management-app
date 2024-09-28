import { useState, useContext, createContext } from "react"
import TaskPage from "./Pages/TaskPage.jsx";
import { motion } from "framer-motion"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export const ContextValue = createContext();

function App() {
const[taskMode, setTaskMode] = useState("Add Mode");
const[selectedId, setSelectedId] = useState("");
const[sortOptionVisible, setIsSortOptionVisible]= useState(false);
const[isAddTaskVisible, setIsAddTaskVisible]= useState(false);
const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
const [sortMode, setSortMode] = useState("All Task");


  return (
    <div className="root" onDoubleClick={()=>{setIsSortOptionVisible(false);}}>
        <ToastContainer
                        position="top-center"
                        autoClose={4000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="light"
                        transition: Bounce/>
     <motion.h1
       whileHover={{scale:1.1}}>
      ⚡ORGANIZER
     </motion.h1>
     <ContextValue.Provider value={{sortOptionVisible, 
                                   setIsSortOptionVisible,
                                   isAddTaskVisible, 
                                   setIsAddTaskVisible, 
                                   tasks, 
                                   setTasks,
                                   sortMode,
                                   setSortMode,
                                   taskMode,
                                   setTaskMode,
                                   selectedId, setSelectedId}}>
            <TaskPage/>
     </ContextValue.Provider>
  
    </div>
  )
}

export default App
