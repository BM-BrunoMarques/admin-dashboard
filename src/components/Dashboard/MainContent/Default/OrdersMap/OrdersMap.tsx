import React, { useEffect, useState } from "react";
import { forwardLocation, groupObjsBy } from "../../../../../helpers/helpers";
import ReactTooltip from "react-tooltip";

import RenderMarker from "./Markers/Markers";

import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import * as SI from "../../../../../helpers/consts";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

interface OrdersMapProps {
  visibleRows: SI.OrderState[];
  Markers: SI.Markers[];
  setMarkers: React.Dispatch<React.SetStateAction<SI.Markers[]>>;
}

const OrdersMap: React.FC<OrdersMapProps> = (props) => {
  const { visibleRows, Markers, setMarkers } = props;
  const [GroupedOrders, setGroupOrders] = useState<any>(null);
  const [toolTip, setToolTip] = useState<string>("");

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

        {Markers &&
          Markers.map((marker) => (
            <RenderMarker marker={marker} setToolTip={setToolTip} />
          ))}
      </ComposableMap>
      <ReactTooltip>{toolTip}</ReactTooltip>
    </>
  );
};

export default OrdersMap;
