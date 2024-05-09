import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useTodoStore } from "@/store/useTodoStore";
import { TrashIcon } from "./ui/icon";
import { TodoItem } from "@/interfaces/ToDo";
import { toast } from "sonner";

interface DialogConfirmDeleteProps {
  todo: TodoItem;
}

export function DialogConfirmDelete({ todo }: DialogConfirmDeleteProps) {
  const { deleteTodo, reverseTodo } = useTodoStore((state) => state);
  const DURATION_UNDO = 15000;

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="icon">
          <TrashIcon className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete confirmation.</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete "{todo.title}" ?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteTodo(todo.id);
              toast(
                `"${todo.title.slice(0, 20)}${
                  todo.title.length > 20 ? "..." : ""
                }" has been deleted.`,
                {
                  id: todo.id,
                  duration: DURATION_UNDO,
                  action: {
                    label: "Undo",
                    onClick: () => {
                      reverseTodo(todo.id);
                    },
                  },
                }
              );
            }}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
