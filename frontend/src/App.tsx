import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/Error";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/Home";
import GymsRootLayout, {
  loader as countryGymsLoader,
} from "./pages/gyms/GymsRoot";
import CountryRootGymsDetailPage, {
  loader as countryGymsDetailLoader,
} from "./pages/gyms/CountryRootGymsDetail";
import "./App.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import GymsRootWithoutNav from "./pages/gyms/GymsRootWithoutNav";
import CountryRootGymsDetailWithoutNav from "./pages/gyms/CountryRootGymsDetailWithoutNav";
import GymsDetail, {
  loader as gymsDetailLoader,
} from "./pages/gyms/GymsDetail";
import EditGymPage from "./pages/gyms/EditGym";
import EditCavePage from "./pages/caves/EditCave";
import { action as manipulateGymAction } from "./components/GymForm";
import { action as rateObjectAction } from "./components/StarRating";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import { action as logoutAction } from "./pages/Logout";
import CavesRootLayout, {
  loader as countryCavesLoader,
} from "./pages/caves/CavesRoot";
import CavesRootWithoutNav from "./pages/caves/CavesRootWithoutNav";
import CountryRootCavesDetailPage, {
  loader as countryCavesDetailLoader,
} from "./pages/caves/CountryRootCavesDetail";
import CountryRootCavesDetailWithoutNav from "./pages/caves/CountryRootCavesDetailWithoutNav";
import CavesDetail, {
  loader as cavesDetailLoader,
} from "./pages/caves/CavesDetail";
import RoutesRootLayout, {
  loader as countryRoutesLoader,
} from "./pages/routes/RoutesRoot";
import RoutesRootWithoutNav from "./pages/routes/RoutesRootWithoutNav";
import CountryRootRoutesDetailPage, {
  loader as countryRoutesDetailLoader,
} from "./pages/routes/CountryRootRoutesDetail";
import CountryRootRoutesDetailWithoutNav from "./pages/routes/CountryRootRoutesDetailWithoutNav";
import RouteDetail, {
  loader as routesDetailLoader,
} from "./pages/routes/RouteDetail";
import EditRoutePage from "./pages/routes/EditRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },

      {
        path: "routes",
        element: <RoutesRootLayout />,
        loader: countryRoutesLoader,
      },
      {
        path: "routes",
        element: <RoutesRootWithoutNav />,
        loader: countryRoutesLoader,
        children: [
          {
            path: ":countryId",
            id: "country-root-routes-detail",
            loader: countryRoutesDetailLoader,
            element: <CountryRootRoutesDetailPage />,
          },
          {
            path: ":countryId",
            element: <CountryRootRoutesDetailWithoutNav />,
            children: [
              {
                path: ":routeId",
                id: "routes-detail",
                loader: routesDetailLoader,
                children: [
                  {
                    index: true,
                    element: <RouteDetail />,
                    action: rateObjectAction, //to zmienić
                  },
                  {
                    path: "edit",
                    element: <EditRoutePage />,
                    action: manipulateGymAction,
                    // loader: checkAuthLoader,
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        path: "gyms",
        element: <GymsRootLayout />,
        loader: countryGymsLoader,
      },
      {
        path: "gyms",
        element: <GymsRootWithoutNav />,
        loader: countryGymsLoader,
        children: [
          {
            path: ":countryId",
            id: "country-root-gyms-detail",
            loader: countryGymsDetailLoader,
            element: <CountryRootGymsDetailPage />,
          },
          {
            path: ":countryId",
            element: <CountryRootGymsDetailWithoutNav />,
            children: [
              {
                path: ":gymId",
                id: "gyms-detail",
                loader: gymsDetailLoader,
                children: [
                  {
                    index: true,
                    element: <GymsDetail />,
                    action: rateObjectAction, //to zmienić
                  },
                  {
                    path: "edit",
                    element: <EditGymPage />,
                    action: manipulateGymAction,
                    // loader: checkAuthLoader,
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: "caves",
        element: <CavesRootLayout />,
        loader: countryCavesLoader,
      },
      {
        path: "caves",
        element: <CavesRootWithoutNav />,
        loader: countryCavesLoader,
        children: [
          {
            path: ":countryId",
            id: "country-root-caves-detail",
            loader: countryCavesDetailLoader,
            element: <CountryRootCavesDetailPage />,
          },
          {
            path: ":countryId",
            element: <CountryRootCavesDetailWithoutNav />,
            children: [
              {
                path: ":caveId",
                id: "caves-detail",
                loader: cavesDetailLoader,
                children: [
                  {
                    index: true,
                    element: <CavesDetail />,
                    action: rateObjectAction, //to zmienić
                  },
                  {
                    path: "edit",
                    element: <EditCavePage />,
                    action: manipulateGymAction,
                    // loader: checkAuthLoader,
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        path: "logout",
        action: logoutAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
