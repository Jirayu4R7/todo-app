import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FormControl } from "./ui/form";
import dayjs from "dayjs";
import { CalendarIcon } from '@/components/ui/icon';

interface DatePickerProps {
  value: Date | undefined;
  onChange: (date: Date | undefined) => void;
}

export function DatePicker({ onChange, value }: DatePickerProps) {
  const handleSelect = (date: Date) => {
    onChange(date);
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground"
            )}
          >
            {!value ? <CalendarIcon className="w-4 h-4 mr-2" /> : null}
            {value ? (
              dayjs(value).format("DD MMMM YYYY")
            ) : (
              <span>Pick a due date</span>
            )}
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="flex justify-start w-auto p-0">
        <Calendar
          mode="single"
          selected={value || new Date()}
          onDayClick={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  );
}
