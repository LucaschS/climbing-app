import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/Error";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/Home";
import GymsRootLayout, { loader as countryGymsLoader } from "./pages/GymsRoot";
import CountryRootGymsDetailPage, {
  loader as countryGymsDetailLoader,
} from "./pages/CountryRootGymsDetail";
import "./App.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import CountriesNavigation from "./components/CountriesNavigation";
import GymsRootWithoutNav from "./pages/GymsRootWithoutNav";
import CountryRootGymsDetailWithoutNav from "./pages/CountryRootGymsDetailWithoutNav";
import GymsDetail, { loader as gymsDetailLoader } from "./pages/GymsDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "/gyms",
        element: <GymsRootLayout />,
        loader: countryGymsLoader,
      },
      {
        path: "/gyms",
        element: <GymsRootWithoutNav />,
        loader: countryGymsLoader,
        children: [
          {
            path: ":countryId",
            id: "country-root-detail",
            loader: countryGymsDetailLoader,
            element: <CountryRootGymsDetailPage />,
          },
          {
            path: ":countryId",
            element: <CountryRootGymsDetailWithoutNav />,
            loader: countryGymsDetailLoader,
            children: [
              {
                path: ":gymId",
                id: "gyms-detail",
                loader: gymsDetailLoader,
                element: <GymsDetail />,
              },
            ],
          },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
