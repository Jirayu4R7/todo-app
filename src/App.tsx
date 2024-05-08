import "./App.css";
import { DialogNewToDo } from "./components/dialog-new-todo";
import ToDoList from "./components/todo-list";
function App() {
  return (
    <div className="mx-auto md:max-w-lg">
      <h1 className="mb-2 text-3xl font-bold underline">To-Do List</h1>
      <div className="flex flex-col">
        <div className="w-full py-1 border-b border-gray-500">
          <DialogNewToDo />
        </div>
        <ToDoList />
      </div>
    </div>
  );
}

export default App;
