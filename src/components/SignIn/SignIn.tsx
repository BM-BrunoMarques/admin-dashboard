import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  decrement,
  increment,
  incrementByAmount,
  incrementAsync,
  selectCount,
} from "../../features/counter/counterSlice";

const SignIn: React.FC = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [incrementAmount, setIncrementAmount] = useState(0);

  // const count = useAppSelector(selectCount);
  // const dispatch = useAppDispatch();

  return (
    <div>
      <div>{count}</div>
      <button onClick={() => dispatch(increment())}>increment</button>
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
