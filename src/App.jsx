import "./App.css";
import { memo, useCallback, useMemo, useReducer, useRef } from "react";
import Header from "./components/Header";
import Editor from "./components/Editor";
import TodoList from "./components/TodoList";
import { createContext } from "react";

export const TodoStateContext = createContext();
export const TodoDispatchContext = createContext();

const reducer = (todos, action) => {
  console.log("reducer called");
  switch (action.type) {
    case "CREATE":
      return [action.data, ...todos];
    case "UPDATE":
      return todos.map((todo) => {
        return todo.id !== action.targetId
          ? { ...todo }
          : { ...todo, isDone: !todo.isDone };
      });
    case "DELETE":
      return todos.filter((todo) => todo.id !== action.targetId);
    default:
      return todos;
  }
};

function App() {
  const [todos, todosDispatch] = useReducer(reducer, []);
  let todoIdRef = useRef(0);

  const createTodo = useCallback((content) => {
    todosDispatch({
      type: "CREATE",
      data: {
        id: todoIdRef.current++,
        isDone: false,
        content: content,
        date: new Date().getTime(),
      },
    });
  }, []);

  const updateTodo = useCallback((targetId) => {
    todosDispatch({
      type: "UPDATE",
      targetId: targetId,
    });
  }, []);

  const deleteTodo = useCallback((targetId) => {
    todosDispatch({
      type: "DELETE",
      targetId,
    });
  }, []);

  const memoizedDispatch = useMemo(() => {
    return { createTodo, updateTodo, deleteTodo };
  }, []);

  return (
    <div className="App">
      <Header />
      <TodoDispatchContext.Provider value={memoizedDispatch}>
        <TodoStateContext.Provider value={todos}>
          <Editor />
          <TodoList />
        </TodoStateContext.Provider>
      </TodoDispatchContext.Provider>
    </div>
  );
}

export default App;
