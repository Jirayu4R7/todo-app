import { TodoItem } from "@/interfaces/ToDo";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

interface TodoStoreState {
  todos: TodoItem[];
  addTodo: (todo: TodoItem) => void;
  deleteTodo: (todoId: string) => void;
  completeTodo: (todoId: string) => void;
}

const STORAGE_NAME = "todo-storage";

export const useTodoStore = create<TodoStoreState>()(
  persist(
    (set, get) => ({
      todos: [],
      addTodo: (todo: TodoItem) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              ...todo,
            },
          ],
        })),
      deleteTodo: (todoId: string) =>
        set((state) => ({
          todos: state.todos.filter((todo) => todo.id !== todoId),
        })),
      completeTodo: (todoId: string) =>
        set((state) => ({
          todos: state.todos.map((todo) => {
            if (todo.id === todoId) {
              return {
                ...todo,
                isCompleted: !todo.isCompleted,
              };
            }
            return todo;
          }),
        })),
      getToday: () => {
        const todoToday = get().todos.filter;
        return todoToday;
      },
    }),
    {
      name: STORAGE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
