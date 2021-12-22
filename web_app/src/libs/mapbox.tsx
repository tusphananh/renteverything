import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Position } from "../constants/DashBoardConstants";
import { MarkerType } from "../constants/SearchConstants";
import styles from "../styles/Search.module.scss";

export const addMarker = (
  map: mapboxgl.Map,
  position: Position,
  type: MarkerType
) => {
  // Create Marker by HTML Element because mapboxgl.Marker doesn't support add custom React Component
  const marker = document.createElement("div");
  const markerPoint = document.createElement("div");
  const markerOutter = document.createElement("div");
  markerPoint.className = styles["map-marker__point"];
  markerOutter.className = styles["map-marker__outter"];
  marker.appendChild(markerOutter);
  marker.appendChild(markerPoint);

  type === MarkerType.GREEN &&
    (marker.className = styles["map__marker--green"]);
  type === MarkerType.RED && (marker.className = styles["map__marker--red"]);

  map &&
    new mapboxgl.Marker(marker)
      .setLngLat([position.lng, position.lat])
      .addTo(map);
};

export const getMap = (): mapboxgl.Map => {
  mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v10",
    zoom: 5,
  });
  if (map) {
    map.addControl(new mapboxgl.NavigationControl());
    map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        trackUserLocation: true,
      })
    );
    console.log(process.env.MAPBOX_TOKEN);
    console.log("Map loaded successfully");
  } else {
    console.log("Map load failed");
  }
  return map;
};


