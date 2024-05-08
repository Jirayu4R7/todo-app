import { TodoItem } from "@/interfaces/ToDo";
import { useTodoStore } from "@/store/useTodoStore";
import { Checkbox } from "./ui/checkbox";
import { cn } from "@/lib/utils";
import DialogTodoDetail from "./dialog-todo-detail";
import { DialogConfirmDelete } from "./dialog-confirm-delete";

export default function ToDoList() {
  const { todos, completeTodo } = useTodoStore((state) => state);
  return (
    <div className="mt-2 mb-1">
      {todos.length > 0 ? (
        <ul className="grid col-span-1 gap-2">
          {todos.map((todo: TodoItem) => {
            return (
              <li
                key={todo.id}
                className="flex flex-row items-end justify-between space-x-1"
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
                        todo.isCompleted
                          ? "line-through text-gray-500"
                          : "unset",
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
          })}
        </ul>
      ) : (
        <p className="">No Task Added.</p>
      )}
    </div>
  );
}
