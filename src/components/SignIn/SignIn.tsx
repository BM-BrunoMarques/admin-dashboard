import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../features/UserManagement/usersSlice";

const SignIn: React.FC = () => {
  // const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [user, setUser] = useState({});

  const loggedUser = dispatch(getUser(1));
  console.log(loggedUser);

  return (
    <div>
      LOGIN
      {/* <div>{count}</div>
      <button onClick={() => dispatch(increment())}>increment</button> */}
    </div>
    // <div>
    //   <button onClick={() => dispatch({ type: increment })}> increment</button>
    //   <button onClick={() => dispatch({ type: decrement })}> increment</button>

    //   {/* <button onClick={handleClick}> increment</button> */}
    //   {/* Add Amount
    //   </button> */}
    //   <span> value is : {count}</span>
    // </div>
  );
};

export default SignIn;
