
import SearchAndAddComponent from "../Components/SearchAndAddComponent";
import Task from "../Components/Task.jsx";
import TaskItemForm from "../Components/TaskItemForm.jsx";
function TaskPage() {
    return(
      <>
            <SearchAndAddComponent/>
            <Task/>
            <TaskItemForm/>
      </>
    )
}
export default TaskPage;