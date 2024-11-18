import { useState, useRef, memo, useContext } from "react";
import { TodoDispatchContext } from "../App";

const Editor = () => {
  const [content, setContent] = useState("");
  const inputRef = useRef();
  const { createTodo } = useContext(TodoDispatchContext);

  const onChange = (e) => {
    setContent(e.target.value);
  };

  const onSubmit = () => {
    if (content === "") {
      return;
    }
    createTodo(content);
    inputRef.current.value = "";
    inputRef.current.focus();
    setContent("");
  };

  return (
    <div>
      <div>
        <input
          ref={inputRef}
          type="text"
          onChange={onChange}
          placeholder="새로운 Todo..."
        />
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  );
};

export default memo(Editor);

/* 
  * Editor 컴포넌트를 memoized 했는데도 리렌더링이 되는이유는 ??
    - 전달 받은 Props 가 변경이 되었기 때문이다.
    
    - createTodo -> 참조 타입 (call-by-reference)
    - App 컴포넌트(루트 컴포넌트)가 리렌더링 될 때마다 createTodo를 새로 생성해서 전달하기 때문에 
      Props가 변경되어 Editor 컴포넌트에 리렌더링이 발생한다.

    -> useCallback을 사용하여 함수 정의를 캐싱해주어야 한다.
*/
