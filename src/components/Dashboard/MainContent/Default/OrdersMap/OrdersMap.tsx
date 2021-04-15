import React, { useEffect, useState } from "react";
import { forwardLocation } from "../../../../../helpers/helpers";
import { motion } from "framer-motion";
import ReactTooltip from "react-tooltip";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

import * as SI from "../../../../../helpers/consts";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

interface OrdersMapProps {
  visibleRows: SI.OrderState[];
  Markers: SI.Markers[];
  setMarkers: React.Dispatch<React.SetStateAction<SI.Markers[]>>;
}

const groupObjsBy = (data: object[], key: string) => {
  return data.reduce((container: any, item: any) => {
    const group = item[key];
    container[group] = container[group] || [];
    container[group].push(item);

    return container;
  }, {});
};

const OrdersMap: React.FC<OrdersMapProps> = (props) => {
  const { visibleRows, Markers, setMarkers } = props;
  const [GroupedOrders, setGroupOrders] = useState<any>(null);
  const [toolTip, setToolTip] = useState<string>("");

  const populateMarkers = async (key: string, tryNum = 0) => {
    forwardLocation(key)
      .then((res) => {
        if (res.latitude && res.longitude) {
          setMarkers((prevMarkers) =>
            prevMarkers.concat({
              country: key,
              total: GroupedOrders[key].length,
              geoLocation: { lat: res.latitude, long: res.longitude },
            })
          );
        }
      })
      .catch(() => {
        if (tryNum < 5) {
          tryNum++;
          populateMarkers(key, tryNum);
        }
      });
  };

  useEffect(() => {
    if (visibleRows.length) {
      setGroupOrders(groupObjsBy(visibleRows, "country"));
    }
  }, [visibleRows]);

  useEffect(() => {
    (async () => {
      if (GroupedOrders) {
        const keys = Object.keys(GroupedOrders);
        setMarkers([]);
        for (const key of keys) {
          //disabled for saving api resources
          // await populateMarkers(key);
        }
      }
    })();
  }, [GroupedOrders]);

  const renderMarker = (marker: SI.Markers) => {
    const { country, geoLocation, total } = marker;
    const { lat, long } = geoLocation;

    return (
      <Marker
        name={country}
        key={country}
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
          animate={{ scale: 2 }}
          transition={{ delay: 0.2 }}
        />
      </Marker>
    );
  };

  return (
    <>
      <ComposableMap
        style={{ maxHeight: "550px" }}
        data-tip=""
        projectionConfig={{
          scale: 220,
          center: [5, 6],
        }}
      >
        <Geographies geography={geoUrl} fill="#BBB" stroke="#FFF">
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography key={geo.rsmKey} geography={geo} />
            ))
          }
        </Geographies>

        {Markers && Markers.map((marker) => renderMarker(marker))}
      </ComposableMap>
      <ReactTooltip>{toolTip}</ReactTooltip>
    </>
  );
};

export default OrdersMap;
