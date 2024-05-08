import { TodoItem } from "@/interfaces/ToDo";
import { useTodoStore } from "@/store/useTodoStore";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import DialogTodoDetail from "./dialog-todo-detail";
import { DialogConfirmDelete } from "./dialog-confirm-delete";
import { TODO_TYPE } from "@/types";

export default function ToDoList() {
  const { todos, completeTodo, getTodosByType, currentTodoType } = useTodoStore(
    (state) => state
  );

  const TodoItem = (todo: TodoItem) => {
    return (
      <li
        key={todo.id}
        className="flex flex-row items-end justify-between p-4 space-x-1 border-gray-200 rounded-lg shadow-md border-opacity-20"
      >
        <div className="flex flex-row space-x-1">
          <Checkbox
            className="mt-1"
            checked={todo.isCompleted}
            onCheckedChange={() => {
              completeTodo(todo.id);
            }}
          />
          <div className="flex flex-col items-start justify-start text-left">
            <p
              className={cn(
                todo.isCompleted ? "line-through text-gray-500" : "unset",
                "line-clamp-2"
              )}
            >
              {todo.title}
            </p>
            <p
              className={cn(
                todo.isCompleted
                  ? "line-through text-gray-500"
                  : "unset text-gray-800",
                "line-clamp-1 text-sm "
              )}
            >
              {todo.description}
            </p>
          </div>
        </div>
        <div className="flex flex-row space-x-1">
          <DialogTodoDetail todo={todo} />
          <DialogConfirmDelete todo={todo} />
        </div>
      </li>
    );
  };

  if (todos.length === 0) {
    return (
      <div className="mt-2 mb-1">
        <p className="">No Task Added.</p>
      </div>
    );
  }

  return (
    <div className="mt-2 mb-1">
      {currentTodoType === TODO_TYPE.today ? (
        <div>
          <p className="pt-3 pb-1 text-xl font-semibold text-left ">ToDay</p>
          {
            <ul className="grid col-span-1 gap-1">
              {getTodosByType(TODO_TYPE.today).map((todo: TodoItem) => {
                return TodoItem(todo);
              })}
            </ul>
          }
          <p className="pt-4 pb-1 text-xl font-semibold text-left">Tomorrow</p>
          {
            <ul className="grid col-span-1 gap-1">
              {getTodosByType(TODO_TYPE.tomorrow).map((todo: TodoItem) => {
                return TodoItem(todo);
              })}
            </ul>
          }
        </div>
      ) : (
        <>
          <ul className="grid col-span-1 gap-2">
            {getTodosByType().map((todo: TodoItem) => {
              return TodoItem(todo);
            })}
          </ul>
        </>
      )}
    </div>
  );
}
