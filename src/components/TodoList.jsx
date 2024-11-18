import TodoItem from "./TodoItem";
import { TodoStateContext } from "../App";
import { useState, useContext, memo } from "react";

const TodoList = () => {
  const todos = useContext(TodoStateContext);

  const [searchKeyword, setSearchKeyword] = useState("");

  const onChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div>
      <h4>Todo List</h4>
      <div>
        <input
          type="text"
          onChange={onChange}
          placeholder="검색어를 입력하세요."
        />
      </div>
      {todos
        .filter((todo) => {
          return todo.content.includes(searchKeyword);
        })
        .map((todo) => {
          return <TodoItem key={todo.id} {...todo} />;
        })}
    </div>
  );
};

export default memo(TodoList);
/* 
    * 현재 TodoItem 컴포넌트는 memoized 상태이다.

    Props로 스프레드 문법을 사용하여 '...todo' 를 전달하면 변경이 있는 TodoItem 컴포넌트만 리렌더링 되고,
    'todo' 를 그대로 넘겨주면 모든 TodoItem 컴포넌트가 리렌더링 된다.

    그 이유는 App 컴포넌트의 reducer 함수에 정의된 UPDATE 코드를 확인해야한다.

    UPDATE 코드에서는 Array.property.map 메서드를 통해 새로운 배열을 반환하고 있다.
    그리고 첫 번째 인수인 콜백함수에서는 스프레드 연산자를 사용하여 객체를 반환한다.

    스프레드 연산자를 사용하여 객체를 반환하면 프로퍼티의 내용은 같아보여도 새로운 객체를 반환하는 것이기 때문에
    TodoItem의 Props로 전달한 'todo'들은 모두 새로운 객체 참조 값이 전달되어 리렌더링이된 것이다.
*/
