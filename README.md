# Study React - TodoListApp

> ## 개발 환경 설정

### \* 코드 편집기

- Visual Studio Code

<br/>

### \* VSCode 플러그인

- Error lens
- EsLint
- Live Server
- Material Icon Theme
- Prettier-Code formatter

<br/>

### 1. 프로젝트 생성

- node.js 설치 (자바스크립트 실행 환경)
- npm 설치 (Node Package Manager) // node.js 설치 시 자동 설치

```
> node -v // node.js 버전 확인 - v22.11.0
> npm -v // npm 버전 확인 - 10.9.0

> npm create vite@latest // 기본 설정이 적용된 React App 생성
> React // 프레임워크 선택
> JavaScript // 프레임워크 버전 선택
```

※ Vite: 개발 서버 및 최적화된 번들링 제공

<br/>

### 2. 모듈 설치 (package.json 에 정의된 모든 의존성)

```
> npm i // npm install
```

<br/>

### 3. eslint.config.js rules 프로퍼티 설정 추가

```
"no-unused-vaes": "off",
"react/prop-type": "off
```

<br/>

### 4. main.jsx

- \<App /> 감싸고 있는 \<StrictMode> 태그 제거

<br/>

---

> ## 리액트 컴포넌트 (Component)

- UI 를 구성하는 독립적이고 재사용 가능한 단위
- UI 의 구성 요소인 HTML, CSS, JavaScript 를 컴포넌트로 결합하여 재사용성을 높인다.

### \* 컴포넌트 정의

1. 컴포넌트 export
2. 함수 정의
3. 마크업 반환

```
export default Header () => {
    return (<header>Header</header>);
}
```

<br/>

---

> ## JSX (JavaScript Extensions)

- 자바스크립트를 확장한 문법
- 중괄호 내부에는 자바스크립트 표현식만 사용 가능
- 숫자, 문자열, 배열 값만 렌더링 됨 (boolean, undefined, null, 객체 값은 X)
- 모든 태그는 닫혀있어야 함
- 최상위 태그는 반드시 하나여야만 함 (빈 태그 가능 <></>)

```
// Header 컴포넌트 정의
const Header = () => {
return <div>Header</div>; // jsx
}
export defatul Header;
```

<br/>

### \* 스타일 적용법

1. stlye 속성 직접 적용 (가독성 안좋음)
2. css 파일 별도 생성 후 import 해서 사용 ✅

```

import '../components/Button.css'; // import 하면 적용됨

    ...
    <button className="default_button"></button>
    // className 속성은 class 로 렌더링 (class는 js 예약어라 사용 X)
    ...

```

<br/>

---

> ## Props (Properties)

- 상위 컴포넌트에서 하위 컴포넌트에 속성 전달
- DOM 요소, 컴포넌트도 전달 가능 (children props)

### \* props.defaultProps

- 기본 속성 설정

```
function App() {
    retrun (<>
            <Header title={'Hello'}/> // title props 전달
        </>);
}

// 1. props 변수 사용
function Header(props) { // Header 컴포넌트에서 props 전달 받기
    return (<header>{props.title}</header>);
}

Header.defaultProps = { title: 'header' } // 기본 속성 설정

// 2. 디스트럭처링 ✅
function Header({ title }) {
    return (<header>{title}</header>);
}
```

<br/>

---

> ## 상태 관리

### \* useState (Hook)

- 렌더링간에 기억해야할 데이터를 저장하는 컴포넌트별 메모리
- useState 가 제공하는 상태 변수의 값이 변경되면 해당 컴포넌트가 리렌더링된다.

```
import { useState } from 'react';
const [state, setState] = useState(initialState); // 인수 값으로 초기값을 세팅한다.
// 첫 번째 요소: 상태를 저장할 변수
// 두 번째 요소: 상태를 변경할 함수
```

### ※ 리액트 컴포넌트가 리렌더링 되는 상황? (Re-rendering)

1. 해당 컴포넌트의 state 값이 변경되는 경우
2. 전달받은 props 값이 변경되는 경우
3. 부모 컴포넌트가 리렌더링 되었을 경우 자식 컴포넌트도 리렌더링  
   -> 불필요한 state 를 상위 컴포넌트에서 몽땅 가지고 있으면 불필요한 렌더링이 발생한다.  
   -> 컴포넌트 분리 필요!

<br/>

---

### ※ 크롬 확장 프로그램 사용

- `React Develop Tools`
  - Props, 상태 값 관찰 및 렌더링되는 컴포넌트 하이라이트 기능 제공

<br/>

---

### \* useReducer (Hook)

- 컴포넌트 외부에서 단일 함수로 state 값 업데이트 로직을 관리할 수 있다.
- 두 번째 요소인 dispatch 함수는 액션 객체를 reducer 함수에 전달한다.
- 액션 객체는 type, data 프로퍼티를 갖는다.

```
import { useReducer } from 'react';

function reducer(state, action) {
    switch (action.type) {
        case 'UPDATE': return action.data; // 반환 값으로 state가 업데이트 된다.

        ... // 로직이 추가되면 컴포넌트 외부에서 관리
    }
    return state;
}

function App() {
    let initialArg = 0;
    const [state, dispatch] = useReducer(reducer, initialArg);

    const updateState = () => {
        dispatch({ // 액션 객체
            type: 'UPDATE',
            data: 1
        });
    }
    ... // 로직 추가
}
```

<br/>

---

### \* useRef (Hook)

- 컴포넌트 내부의 값이 유지되는 변수로 활용
- 마크업 요소의 참조 값으로도 사용 가능 (ref 속성)
- useState 와의 차이점은 변수 값이 변하더라도 리렌더링을 유발하지 않음
- current 프로퍼티

#### ※ 왜 useRef 를 사용해야할까 ?

1. 지역 변수

   - 리렌더링 마다 컴포넌트를 호출하면 초기화 됨

2. 전역 변수

   - 한 컴포넌트가 여러 번 호출되면 변수를 공유함

3. useRef 객체
   - 리렌더링 되어도 값을 유지함
   - 컴포넌트를 여러 번 호출해도 각 컴포넌트 별개의 값을 유지함

<br/>

```
import { useRef } from 'react';

// 마크업 요소 참조 및 조작 예시
export default Input = () => {
    const inputRef = useRef(null); // useRef 객체의 current 프로퍼터 초기 설정
    inputRef.current.value = 'hello';
    inputRef.current.focus();

    return (<input type="text" ref={inputRef} />);
}
```

<br/>

---

> ## 리액트 라이프사이클

### 1. 마운트 (Mount)

- 컴포넌트가 화면에 처음 렌더링되는 순간
- ex) 서버에서 데이터를 불러오는 작업

### 2. 업데이트 (Update)

- 컴포넌트가 리렌더링 되는 순가
- ex) 어떤 값이 변경되었는지 콘솔에 출력

### 3. 언마운트 (UnMount)

- 컴포넌트가 렌더링에서 제외되는 순간
- ex) 컴포넌트가 사용하던 메모리 정리

<br/>

### \* useEffect (Hook)

- 사이드 이펙트 제어
- 외부 시스템과 동기화

예를 들어, 특정 컴포넌트가 리렌더링 (Update)될 때 상태 값을 서버에 전송한다고 할 때,  
컴포넌트 내부에서 전송 코드를 작성하게 되면 예상한 값이 아닌 다른 값을 전송할 수 있다.  
그 이유는 상태 값을 변경하는 setState 함수는 비동기로 작동하기 때문에 전송 코드가 실행될 때  
상태 값이 아직 변경이 안되었을 수도 있다.

(설치한 크롬 확장 프로그램으로 상태 값을 변경하면 바로바로 반영되지 않는 것을 볼 수 있다.)

상태가 변경되면 리렌더링이 발생한다. 즉 Update 가 발생한 시점에 서버 전송 코드를 작성하면  
변경된 상태를 전송할 수 있다.

```
import { userEffect } from 'react';

useEffect(setup, depedencies?);

// setup: 실행할 함수
// dependencies: setup 함수 내부에 참조되는 모든 상태 값 (배열) - deps라 부름
// return: clean up 함수 (정리 함수)
```

<br />

---

### \* 컴포넌트 라이프사이클 제어

#### 1. 마운트

- 두 번째 인수에 변경을 감지할 상태 값을 전달하지 않으면 처음 렌더링 했을 경우에만 호출

```
useEffect(() => {
    console.log("첫 렌더링 이후에만 실행");
}, []);
```

<br/>

#### 2. 업데이트

- 두 번째 인수를 전달하지 않으면 해당 컴포넌트가 렌더링 될 때마다 호출 (마운트 포함)

```
// 마운트 + 업데이트 제어 (모든 렌더링 시)
useEffect(() => {
    console.log("렌더링 이후마다 실행");
});

// 마운트는 제외하고 업데이트만 제어
const isMount = useRef(false);
useEffect(() => {
    if (!isMount.current) {
        isMount = true;
        return;
    }
    console.log("업데이트");
});
```

<br/>

#### 3. 언마운트

- 첫 번째 인수로 전달한 콜백함수의 리턴문으로 함수를 전달하면 언마운트 시 실행  
  -> 이 리턴 함수를 클린 업, 정리 함수라고 한다.

```
useEffect(() => {
    console.log("마운트");

    return () => { // 클린 업
        console.log("언마운트");
    }
}, []); // 마운트에 useEffect가 호출되고 반환 값으로 전달한 클린 업이 언마운트 때 호출된다.
```

<br/>

---

> ## 최적화 기법

### \* useMemo (Hook)

- memoization 기법 (리렌더링 사이에 계산 결과를 캐싱)
- 실행하고 싶은 연산을 기억하고 있다가 특정 상태에서 수행
- 불필요한 연산을 최적화하는 리액트 훅

```
import { useMemo } from 'react';

useMemo(calculateValue, dependencies);
// arg1: 캐시하려는 값을 계산하는 함수
// arg2: 상태 배열 (deps)
// return: 콜백 함수에서 반환하는 값을 그대로 반환

// 한 번만 초기화
useMemo(() => {}, []); // deps에 아무것도 전달 X
```

<br/>

### \* React.memo

- 리액트 내장 함수
- 고차 컴포넌트 (HOC, Higher Order Component) - 컴포넌트에 기능을 추가해서 반환하는 메서드
- Props 가 변경되지 않은 경우 리렌더링 방지

#### ※ 주의!

- 전달받는 Props가 객체 타입일 경우 상위 컴포넌트가 리렌더링되어 전달 받는 객체도 새로 생성해서 보내줄 경우 참조 값이 매번 변하여 리렌더링이 발생한다. (call by reference)  
  -> 1. 상위 컴포넌트에서 useMemo, useCallback 등을 사용해서 재생성을 막은 후 전달 ✅  
  -> 2. memo 내장 함수의 두 번째 인수 커스텀

```
import { memo } from 'react';

memo(Component, arePropsEqual?);

memo(Component, (preProps, newProps) => { return preProps === newProps });
// 두 번째 인수 반환 값 true: 리렌더링 X, false: 리렌더링 O
```

<br/>

### \* useCallback (Hook)

- 리렌더링 간에 함수 정의를 캐싱
- 첫 번째 인수로 전달한 함수를 그대로 반환해준다.

```
import { useCallback } from 'react';

useCallback(fn, dependencise);
// arg1: 캐시하려는 함수 값
// arg2: 상태 배열 (deps)
// return: 함수 값 그대로 반환

const updateData = useCallback(() => { ... }, []); // 마운트 시 초기화
```

#### ※ 기능을 구현하는 것이 먼저다. 기능이 완성된 이후 필요한 경우에만 최적화를 진행하자.

<br/>

---

> ## Context

- 컴포넌트 간의 데이터를 전달하는 Props 말고 또 다른 방법
- Props 의 단점인 Props Drilling 을 개선하기 위한 기능  
  (Props 를 하위의 하위 계층에 전달할 때 중간다리 역할이 필요없다.)
- 데이터 보관소 (객체)

```
import { useState, createContext } from 'react'; // 1. createContext import

function App() {
    const [state, setState] = useState('Hello');
    export const stateContext = createContext(); // 2. context 생성
    export const dispatchContext = createContext();

    return <>
        <stateContext.Provider value={ state }> // 3. 하위 컴포넌트 감싸기, value 전달
            <dispatchContext.Provider value={ ... }>
                <Header />
            <dispatchContext.Provider />
        <stateContext.Provider />
    </>
}

---------------------------------------------------------------------------------------
import { stateContext } from '../App'; // 4. 하위 컴포넌트에서 context import
import { useContext } from 'react'; // 5. 하위 컴포넌트에서 useContext import

function Header() {
    const state = useContext(stateContext); // 6. useContext 에 context 를 인수로 전달
    retrun <header>{state}</header> // 7. value 로 전달한 값 사용
}

```

<br/>

#### ※ context 를 정의할 때 상태값이 변하는 값과 변하지 않는 값을 따로 만들어서 관리하는 하는 것이 일반적이다.

- 상태가 변하는 값을 관리하는 컨텍스트 - stateContext
- 상태가 변하지 않는 값을 관리하는 컨텍스트 - dispatchContext

예를 들어, createDate, updateDate, deleteDate 같은 기능을 가진 함수들을 하위 컴포넌트에 Props로 전달할 때, 기능은 변하지 않는데 재생성되어 참조 값이 바뀌어 전달되면 하위 컴포넌트는 불필요한 리렌더링이 발생하게된다.

따라서 memoized 기법을 사용하여 마운트 이후에는 재성성되지 않도록 하여 컨택스트에 저장하도록 한다.

<br/>

```
const createData = useCallback(() => { ... }, []);
const updateData = useCallback(() => { ... }, []);
const deleteData = useCallback(() => { ... }, []);

const dispatchData = { createData, updateData, deleteData }; // memoized X

const memoizedDispatchData = useMemo(() => {
    return { createData, updateData, deleteData }; }, []); // memoized O

return (<>
    <dispatchContext.Provider value={ memoizedDispatchData }>
        <Editor />
    <dispatchContext.Provider />
</>);
```

#### ※ 위 예시에서 주의할 점

createData, updateData, deleteData 는 memoized 하였지만 dispatchContext 의 value 로 전달할 dispatchData 는 memoized 되지 않았다. 그러면 하위 컨택스트에서는 dispatchContext 에서 사용할 데이터의 참조 값이 매번 변하기 때문에 memoizedDispatchData 처럼 전달할 값도 memoized 해주어야 한다.
