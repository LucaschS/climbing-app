import { Link } from "react-router-dom";

import { Gym } from "../models/interface-models";

interface GymListProps {
  gyms: Gym[];
}

function GymsList({ gyms }: GymListProps) {
  console.log(gyms, "gyms");
  return (
    <div>
      <h1>All Events</h1>
      <ul>
        {gyms.map((gym) => (
          <li key={gym.id}>
            <Link to={`/gyms/${gym.id}`}>
              <div>
                <h2>name: {gym.tags.name}</h2>
                <h3>address: {gym.tags["addr:city"]}</h3>
                <h4>city: {gym.cities}</h4>
                <time>lat: {gym.lat}</time>
                <time>lon: {gym.lon}</time>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default GymsList;
