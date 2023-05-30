import React, { useEffect, useState, useReducer } from "react";
import {
  createBrowserRouter,
  RouteObject,
  RouterProvider,
} from "react-router-dom";
import EditGymPage from "./pages/EditGym";
import ErrorPage from "./pages/Error";
import RootLayout from "./pages/RootLayout";
import HomePage from "./pages/Home";
import GymsPage, { loader as gymsLoader } from "./pages/Gyms";
import GymsDetailPage, { loader as gymDetailLoader } from "./pages/GymsDetail";
import GymsRootLayout from "./pages/GymsRoot";

import "./App.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

// const initialState: Boulder = {
//   boulder: [],
// };

// type boulder_array = {
//   type: "BOULDER_SCALE";
//   boulder: [];
// };

// type ReducerAction = boulder_array;

// const reducer = (prevState: typeof initialState, action: ReducerAction) => {
//   // const { type } = action;
//   switch (action.type) {
//     case "BOULDER_SCALE":
//       return {
//         ...prevState,
//         boulder: action.boulder,
//       };
//     default:
//       return initialState;
//   }
// };

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "gyms",
        element: <GymsRootLayout />,
        children: [
          {
            index: true,
            element: <GymsPage />,
            loader: gymsLoader,
          },
          {
            path: ":gymId",
            id: "gyms-detail",
            loader: gymDetailLoader,
            children: [
              {
                index: true,
                element: <GymsDetailPage />,
              },
              {
                path: "edit",
                element: <EditGymPage />,
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

// function App() {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   // console.log(state);

//   useEffect(() => {
//     const fetchClimbingArea = async function () {
//       try {
//         const boulderScaleUrl =
//           "https://global-justice-384816-default-rtdb.europe-west1.firebasedatabase.app/boulder.json";

//         const responseBoulderScale = await fetch(boulderScaleUrl);

//         if (!responseBoulderScale.ok) {
//           throw new Error("Custom Error");
//         }
//         const boulderData = await responseBoulderScale.json();

//         dispatch({
//           type: "BOULDER_SCALE",
//           boulder: boulderData,
//         });

//         return "DataFetched";
//       } catch (err) {
//         console.log(err);
//         throw new Error("customError");
//       }
//     };
//     fetchClimbingArea();
//   }, []);

//   return <RouterProvider router={router}></RouterProvider>;
// }

// export default App;
