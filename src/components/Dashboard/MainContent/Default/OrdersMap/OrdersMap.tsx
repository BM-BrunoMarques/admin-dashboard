import React, { useEffect, useState } from "react";
import { groupObjsBy } from "../../../../../helpers/helpers";
import ReactTooltip from "react-tooltip";
import RenderMarker from "./Markers/Markers";
import csc from "country-state-city";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import * as SI from "../../../../../helpers/consts";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

interface OrdersMapProps {
  visibleRows: SI.OrderState[];
}

const OrdersMap: React.FC<OrdersMapProps> = (props) => {
  const { visibleRows } = props;
  const [GroupedOrders, setGroupOrders] = useState<any>(null);
  const [Markers, setMarkers] = useState<SI.Markers[]>([]);
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
        const markersGrp: any = [];
        for (const key of keys) {
          const { name } = GroupedOrders[key][0].country;
          markersGrp.push(await populateMarkers(key, name));
        }
        setMarkers(markersGrp);
      }
    })();
  }, [GroupedOrders]);

  const populateMarkers = async (key: string, name: string) => {
    const { latitude, longitude } = csc.getCountryByCode(key);
    return {
      country: name,
      total: GroupedOrders[key].length,
      geoLocation: { lat: +latitude, long: +longitude },
    };
  };

  return (
    <>
      <ComposableMap
        style={{ maxHeight: "650px" }}
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
        {Markers.length && (
          <RenderMarker Markers={Markers} setToolTip={setToolTip} />
        )}
      </ComposableMap>
      <ReactTooltip>{toolTip}</ReactTooltip>
    </>
  );
};

export default OrdersMap;
