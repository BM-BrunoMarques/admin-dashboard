import React, { useEffect, useRef } from "react";
import { animate } from "framer-motion";
interface props {
  from: number;
  to: number;
}
const AnimatedCounter: React.FC<props> = ({ from, to }) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = nodeRef.current!;

    const controls = animate(from, to, {
      duration: 1,
      onUpdate(value) {
        node.textContent = value.toFixed(2);
      },
    });

    return () => controls.stop();
  }, [from, to]);

  return <span ref={nodeRef} />;
};

export default AnimatedCounter;
