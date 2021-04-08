import React, { useEffect, useState } from "react";
import { forwardLocation } from "../../../../../helpers/apiHelper";

import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

import { rowStruct, Markers } from "../../../../../helpers/consts";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

interface OrdersMapProps {
  rowsSliced: rowStruct[];
  Markers: Markers[];
  setMarkers: React.Dispatch<React.SetStateAction<Markers[]>>;
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
  const { rowsSliced, Markers, setMarkers } = props;
  const [GroupedOrders, setGroupOrders] = useState<any>(null);

  useEffect(() => {
    if (rowsSliced.length) {
      setGroupOrders(groupObjsBy(rowsSliced, "country"));
    }
  }, [rowsSliced]);

  useEffect(() => {
    if (GroupedOrders) {
      const keys = Object.keys(GroupedOrders);
      keys.map(async (key, ind) => {
        const geoData = await forwardLocation(key);
        console.log(geoData);

        if (geoData.latitude && geoData.longitude) {
          setMarkers((prevMarkers) =>
            prevMarkers.concat({
              country: key,
              total: GroupedOrders[key].length,
              geoLocation: { lat: geoData.latitude, long: geoData.longitude },
            })
          );
        }
      });
    }
  }, [GroupedOrders]);

  const renderMarker = (marker: Markers) => {
    const { country, geoLocation, total } = marker;
    const { lat, long } = geoLocation;

    return (
      <Marker key={country} coordinates={[long, lat]}>
        <circle r={total} fill="#F53" />
      </Marker>
    );
  };

  return (
    <ComposableMap style={{ maxHeight: "550px" }}>
      <Geographies geography={geoUrl} fill="#BBB" stroke="#FFF">
        {({ geographies }) =>
          geographies.map((geo) => (
            <Geography key={geo.rsmKey} geography={geo} />
          ))
        }
      </Geographies>
      {Markers && Markers.map((marker) => renderMarker(marker))}
    </ComposableMap>
  );
};

export default OrdersMap;
