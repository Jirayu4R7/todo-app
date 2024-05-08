import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { TodoItem } from "@/interfaces/ToDo";
import { MessageSquareTextIcon } from "./ui/icon";
import { useTodoStore } from "@/store/useTodoStore";
import dayjs from "dayjs";

interface DialogTodoDetailProps {
  todo: TodoItem;
}

export default function DialogTodoDetail({ todo }: DialogTodoDetailProps) {
  const { completeTodo } = useTodoStore((state) => state);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon">
          <MessageSquareTextIcon className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-left">
            {todo.title}
          </AlertDialogTitle>
          <div className="text-left">
            {todo.dueDate ? (
              <p className="text-sm text-gray-800">
                Due date: {dayjs(todo.dueDate).format("DD MMMM YYYY")}
              </p>
            ) : null}
            {todo.description ? <p>{todo?.description}</p> : null}
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              completeTodo(todo.id);
            }}
          >
            {todo.isCompleted ? "InCompleted" : "Completed"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
