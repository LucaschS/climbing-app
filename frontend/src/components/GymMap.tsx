import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { Gym } from "../models/interface-models";

interface GymMapProps {
  gym?: Gym;
  gyms?: Gym[];
  icon: string;
}

function GymMap({ gym, gyms, icon }: GymMapProps) {
  const customIcon = new Icon({
    iconUrl: icon,
    iconSize: [28, 28],
  });
  // console.log(gym, gyms, "gym, gyms");

  const markers =
    gyms &&
    gyms.map((gym) => (
      <Marker key={gym.id} position={[gym.lat, gym.lon]} icon={customIcon} />
    ));

  const marker = gym && (
    <Marker position={[gym.lat, gym.lon]} icon={customIcon} />
  );

  return (
    <>
      <h1 style={{ textAlign: "center" }}>My Map</h1>
      <MapContainer
        style={{
          width: "60vw",
          height: "50vh",
        }}
        center={gym ? [gym.lat, gym.lon] : [51.977056, 19.352638]}
        zoom={9}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {gym ? marker : <MarkerClusterGroup>{markers}</MarkerClusterGroup>}
      </MapContainer>
    </>
  );
}

export default GymMap;
