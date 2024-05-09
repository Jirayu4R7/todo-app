import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TODO_TYPE } from "@/types";
import { useTodoStore } from "@/store/useTodoStore";

export default function FilterTodo() {
  const { updateCurrentTodoType } = useTodoStore((state) => state);
  return (
    <div>
      <Select onValueChange={updateCurrentTodoType}>
        <SelectTrigger className="mt-1 bg-white">
          <SelectValue placeholder=" Filter todos" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value={TODO_TYPE.all}>{TODO_TYPE.all}</SelectItem>
            <SelectItem value={TODO_TYPE.today}>{TODO_TYPE.today}</SelectItem>
            <SelectItem value={TODO_TYPE.completed}>{TODO_TYPE.completed}</SelectItem>
            <SelectItem value={TODO_TYPE.incomplete}>{TODO_TYPE.incomplete}</SelectItem>
            <SelectItem value={TODO_TYPE.overdue}>{TODO_TYPE.overdue}</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
