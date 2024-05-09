import { TodoItem } from "@/interfaces/ToDo";
import { TODO_TYPE } from "@/types";
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import dayjs from "dayjs";

// todosView: TodoItem[];
interface TodoStoreState {
  todos: TodoItem[];
  trash: TodoItem[];
  currentTodoType: TODO_TYPE;
  updateCurrentTodoType: (type: TODO_TYPE) => void;
  getTodosByType: (type?: TODO_TYPE) => TodoItem[];
  addTodo: (todo: TodoItem) => void;
  deleteTodo: (todoId: string) => void;
  reverseTodo: (todoId: string) => void;
  completeTodo: (todoId: string) => void;
}

const STORAGE_NAME = "todo-storage";

export const useTodoStore = create<TodoStoreState>()(
  persist(
    (set, get) => ({
      todos: [],
      trash: [],
      currentTodoType: TODO_TYPE.today,
      updateCurrentTodoType: (type: TODO_TYPE) =>
        set(() => ({
          currentTodoType: type,
        })),
      addTodo: (todo: TodoItem) =>
        set((state) => ({
          todos: [
            ...state.todos,
            {
              ...todo,
            },
          ],
        })),
      deleteTodo: (todoId: string) => {
        const todoDeleted = get().todos.find(
          (todo: TodoItem) => todo.id === todoId
        );
        if (todoDeleted) {
          set((state) => ({
            todos: state.todos.filter((todo) => todo.id !== todoId),
            trash: [...state.trash, todoDeleted],
          }));
        }
      },
      reverseTodo: (todoId: string) => {
        const todReversed = get().trash.find(
          (todo: TodoItem) => todo.id === todoId
        );
        if (todReversed) {
          set((state) => ({
            trash: state.trash.filter((todo) => todo.id !== todoId),
            todos: [...state.todos, todReversed],
          }));
        }
      },
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
      getTodosByType: (type?: TODO_TYPE) => {
        const _type = type ?? get().currentTodoType;
        switch (_type) {
          case TODO_TYPE.completed: {
            const todoIsCompleted = get().todos.filter((todo) => {
              if (todo.isCompleted) {
                return todo;
              }
            });
            return todoIsCompleted;
          }
          case TODO_TYPE.incomplete: {
            const todoIsCompleted = get().todos.filter((todo) => {
              if (!todo.isCompleted) {
                return todo;
              }
            });
            return todoIsCompleted;
          }
          case TODO_TYPE.overdue: {
            const todoIsOverdue = get().todos.filter((todo) => {
              if (dayjs().isAfter(dayjs(todo.dueDate))) {
                return todo;
              }
            });
            return todoIsOverdue;
          }
          case TODO_TYPE.today: {
            const todayItem = get().todos.filter((todo) => {
              if (dayjs().isSame(dayjs(todo.dueDate), "day")) {
                return todo;
              }
            });
            return todayItem.sort((a, b) => {
              return a.isCompleted >= b.isCompleted ? 1 : -1;
            });
          }
          case TODO_TYPE.tomorrow: {
            const tomorrowItem = get().todos.filter((todo) => {
              if (dayjs().isBefore(dayjs(todo.dueDate), "day")) {
                return todo;
              }
            });
            return tomorrowItem.sort((a, b) => {
              return a.isCompleted >= b.isCompleted ? 1 : -1;
            });
          }
          default:
            return get().todos.sort((a, b) => {
              return a.isCompleted >= b.isCompleted ? 1 : -1;
            });
        }
      },
    }),
    {
      name: STORAGE_NAME,
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
