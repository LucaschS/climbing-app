import React, { Suspense } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { Await, defer, json, useLoaderData } from "react-router-dom";
import GymsList from "../components/GymsList";

import "leaflet/dist/leaflet.css";

import { GymsDetailPageRouteData } from "../models/interface-models";

import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

const GymsPage = () => {
  const { gyms } = useLoaderData() as GymsDetailPageRouteData;
  console.log(gyms, "gyms");
  return (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Await resolve={gyms}>
        {(loadedGyms) => <GymsList gyms={loadedGyms} />}
      </Await>
    </Suspense>
  );
};

export default GymsPage;

async function loadGyms(): Promise<GymsDetailPageRouteData> {
  const response = await fetch("http://localhost:8070/gyms");

  if (!response.ok) {
    throw json(
      {
        message: "Could not fetch gyms",
      },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.gyms;
  }
}

export function loader() {
  return defer({ gyms: loadGyms() });
}
