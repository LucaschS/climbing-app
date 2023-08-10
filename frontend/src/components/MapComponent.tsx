import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Gym, Cave, Route } from "../models/interface-models";

interface GymMapProps {
  mapItem?: Gym | Cave | Route;
  mapItems?: Gym[] | Cave[] | Route[];
  icon: string;
}

function MapComponent({ mapItem, mapItems, icon }: GymMapProps) {
  const customIcon = new Icon({
    iconUrl: icon,
    iconSize: [28, 28],
  });

  // const gymPosition = gym && [gym.lat, gym.lon];
  // const gymsPosition = gyms && [gyms[0].lat, gyms[0].lon];

  const markers =
    mapItems &&
    mapItems.map((gym) => (
      <Marker key={gym.id} position={[gym.lat, gym.lon]} icon={customIcon} />
    ));

  const marker = mapItem && (
    <Marker position={[mapItem.lat, mapItem.lon]} icon={customIcon} />
  );

  return (
    <>
      <h1 style={{ textAlign: "center" }}>My Map</h1>
      <MapContainer
        style={{
          width: "60vw",
          height: "50vh",
          zIndex: 1,
        }}
        center={
          mapItem
            ? [mapItem.lat, mapItem.lon]
            : mapItems && [mapItems[0].lat, mapItems[0].lon]
        } //to zmodyfikować
        zoom={9}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapItem ? marker : <MarkerClusterGroup>{markers}</MarkerClusterGroup>}
      </MapContainer>
    </>
  );
}

export default MapComponent;
