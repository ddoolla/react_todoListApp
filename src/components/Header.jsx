import { memo } from "react";
const Header = () => {
  return (
    <div>
      <h3>오늘은</h3>
      <div>{new Date().toDateString()}</div>
    </div>
  );
};

export default memo(Header);
// export default Header;

/* 
  * memo(Component) 
    - 불필요한 리렌더링 방지 
    - 잔달 받은 Props가 변경되지 않는 이상 리렌더링되지 않는다.
*/
