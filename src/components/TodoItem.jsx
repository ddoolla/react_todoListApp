import { useContext, memo } from "react";
import { TodoDispatchContext } from "../App";

const TodoItem = ({ id, isDOne, content, date }) => {
  const { updateTodo, deleteTodo } = useContext(TodoDispatchContext);

  const onChange = () => {
    updateTodo(id);
  };

  const onClick = () => {
    deleteTodo(id);
  };

  return (
    <div>
      <input type="checkbox" onChange={onChange} checked={isDOne} />
      <div>{content}</div>
      <div>{new Date(date).toLocaleDateString()}</div>
      <button onClick={onClick}>삭제</button>
    </div>
  );
};

export default memo(TodoItem);
