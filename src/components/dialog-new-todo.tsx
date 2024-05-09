import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

import { TodoItem } from "@/interfaces/ToDo";
import { DatePicker } from "./date-picker";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "./ui/use-toast";
import { useTodoStore } from "@/store/useTodoStore";
import { PenIcon } from "./ui/icon";
import dayjs from "dayjs";
import { useState } from "react";

const yesterday = dayjs().subtract(1, "day");

const formSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(255),
  description: z
    .string()
    .trim()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  dueDate: z
    .date({
      required_error: "Due date is required",
    })
    .min(new Date(yesterday.toISOString()), { message: "Time has passed." })
    .optional(),
});

export function DialogNewToDo() {
  const [open, setOpen] = useState(false);
  const { addTodo } = useTodoStore((state) => state);
  const { toast } = useToast();

  function onSubmit(values: z.infer<typeof formSchema>) {
    const newToDo: TodoItem = {
      title: values.title,
      description: values.description,
      dueDate: values.dueDate,
      id: dayjs().valueOf().toString(),
      isCompleted: false,
    };
    addTodo(newToDo);
    form.reset();
    toast({
      duration: 1600,
      title: "New To-Do success.",
    });
    setOpen(false);
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: undefined,
      dueDate: undefined,
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <PenIcon className="w-4 h-4 mr-2" />
          New To-Do
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>New To-Do</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="flex flex-col items-center w-full gap-1"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="grid w-full gap-1">
                  <FormLabel htmlFor="title" className="sr-only">
                    Title
                  </FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Type To-Do title." />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="grid w-full gap-1">
                  <FormLabel htmlFor="description" className="sr-only">
                    Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Type To-Do description."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="grid w-full gap-1">
                  <FormLabel htmlFor="dueDate" className="sr-only">
                    Due Date
                  </FormLabel>
                  <DatePicker onChange={field.onChange} value={field.value} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter className="justify-end w-full gap-1 mt-2">
              <Button type="submit">
                <span>Add</span>
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
