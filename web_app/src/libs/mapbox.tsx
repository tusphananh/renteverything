import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Position } from "../constants/DashBoardConstants";
import { MarkerType, SearchAddress } from "../constants/SearchConstants";
import styles from "../styles/Search.module.scss";
import axios from "axios";

export const generateMarker = (
  position: Position,
  type: MarkerType
): mapboxgl.Marker => {
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

  return new mapboxgl.Marker(marker).setLngLat([position.lng, position.lat]);
};

export const addMarker = (map: mapboxgl.Map, marker: mapboxgl.Marker) => {
  map && marker.addTo(map);
};

export const removeMarker = (marker: mapboxgl.Marker) => {
  marker.remove();
};
export const flyTo = (map: mapboxgl.Map, position: Position) => {
  map &&
    map.flyTo({
      center: [position.lng, position.lat],
      zoom: 15,
    });
};

export const zoomIn = (map: mapboxgl.Map) => {
  map && map.zoomIn();
};

export const zoomOut = (map: mapboxgl.Map) => {
  map && map.zoomOut();
};

export const getMap = (): mapboxgl.Map => {
  mapboxgl.accessToken = `${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`;
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v10",
    zoom: 5,
  });
  if (map) {
   
    console.log(process.env.MAPBOX_TOKEN);
    console.log("Map loaded successfully");
  } else {
    console.log("Map load failed");
  }
  return map;
};

export const getReverseGeocoding = async (
  position: Position
): Promise<string> => {
  const { data } = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${position.lng},${position.lat}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
  );
  if (data.features.length > 0) {
    return data.features[0].place_name;
  }
  return "";
};

export const getGeocoding = async (
  searchAddress: string
): Promise<Position> => {
  /**
   * Convert searchAddress to URL-encoded UTF-8 string.
   */
  const encodedSearchAddress = encodeURIComponent(searchAddress);
  const { data } = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedSearchAddress}.json?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
  );
  if (data.features.length > 0) {
    return {
      lat: data.features[0].center[1],
      lng: data.features[0].center[0],
    };
  }
  return {
    lat: 0,
    lng: 0,
  };
};

/**
 * Get geocoding by address in Vietnam.
 */
export const getGeocodings = async (
  searchAddress: string,
  curPos: Position
): Promise<SearchAddress[]> => {
  /**
   * Convert searchAddress to URL-encoded UTF-8 string.
   */
  const encodedSearchAddress = encodeURIComponent(searchAddress);
  // console.log(encodedSearchAddress);
  const result: SearchAddress[] = [];
  const { data } = await axios.get(
    `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodedSearchAddress}.json?country=VN&routing=true&limit=10&types=country,region,postcode,district,place,locality,neighborhood,address,poi&proximity=${curPos.lng},${curPos.lat}&access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`
  );
  if (data.features.length > 0) {
    // console.log(data);
    data.features.forEach(
      (features: { place_name: any; properties: any; center: any[] }) => {
        const address = features.place_name;
        address &&
          result.push({
            address: address,
            position: {
              lat: features.center[1],
              lng: features.center[0],
            },
          });
      }
    );
  }
  // console.log(result);
  return result;
};
