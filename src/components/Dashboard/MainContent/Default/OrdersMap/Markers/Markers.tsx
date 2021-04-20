import React from "react";
import { motion } from "framer-motion";
import { Marker } from "react-simple-maps";
import * as SI from "../../../../../../helpers/consts";

const variants = {
  initial: {
    y: -35,
    opacity: 0,
    scale: 0.3,
  },
  in: {
    y: 0,
    opacity: 1,
    scale: [2, 1.5],
    transition: {
      // delay: 0.4,
      ease: "easeIn",
      duration: 0.4,
    },
  },
  out: {
    opacity: 0,
    y: -35,
  },
};

type props = {
  marker: SI.Markers;
  setToolTip: React.Dispatch<React.SetStateAction<string>>;
};

const RenderMarker: React.FC<props> = ({ marker, setToolTip }) => {
  const { country, geoLocation, total } = marker;
  const { lat, long } = geoLocation;

  return (
    <Marker
      key={country}
      name={country}
      coordinates={[long, lat]}
      onMouseEnter={() => {
        setToolTip(`${country} : ${total} orders.`);
      }}
      onMouseLeave={() => {
        setToolTip("");
      }}
    >
      <motion.circle
        r={(total * 2) / 1.5}
        fill="#F53"
        variants={variants}
        initial="initial"
        animate="in"
        exit="out"
      />
    </Marker>
  );
};

export default RenderMarker;
