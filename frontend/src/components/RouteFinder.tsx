import React, { useState, useRef, useEffect, useImperativeHandle } from "react";
import { useLoaderData } from "react-router-dom";
import {
  CountriesDetailPageRouteData,
  Country,
  GymsDetailPageRouteData,
} from "../models/interface-models";

interface CollectedTrueKeys {
  rockType: string[];
  rate: string[];
}

interface State {
  searchTerm?: string;
  passingTags?:
    | {
        [key: string]: any;
        search?:
          | {
              inputTerm?: string;
            }
          | undefined;
        rate?:
          | {
              [key: number]: boolean;
              1: boolean;
              2: boolean;
              3: boolean;
              4: boolean;
              5: boolean;
              6: boolean;
              7: boolean;
              8: boolean;
              9: boolean;
              10: boolean;
            }
          | undefined;
        rockType?:
          | {
              [key: string]: boolean;
              sandstone: boolean;
              limestone: boolean;
              granithe: boolean;
            }
          | undefined;
      }
    | undefined;
}

const defaultState = {};

const Finder = () => {
  const { gyms, routes, caves, countries } =
    useLoaderData() as CountriesDetailPageRouteData;

  const [filteredRoutes, setFilteredRoutes] = useState(defaultState);

  const [rockType, setRockType] = useState<any>();
  const [country, setCountry] = useState<any>();
  const [name, setName] = useState<any>();
  console.log(country, "country");
  console.log(rockType, "rockType");
  console.log(name, "name");
  console.log(filteredRoutes, "filteredRoutes");

  const rockCategory = Array.from(
    new Set(routes.map((route) => route.tags["climbing:rock"]))
  );

  useEffect(() => {
    setFilteredRoutes(
      routes.filter((route) => {
        // console.log(route.tags.name);
        return (
          (!rockType || rockType === route.tags["climbing:rock"]) &&
          (!country || country === route.country[0]) &&
          (!name ||
            (route.tags.name &&
              name.toLowerCase() === route.tags.name.toLowerCase()))
        );
      })
    );
  }, [country, rockType, name]);

  const clearFilters = () => {
    setCountry("");
    setRockType("");
    setName("");
  };

  return (
    <>
      <h1>Gym Finder</h1>
      <form>
        <input
          name="name"
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label htmlFor="rockType"></label>
        <select
          name="rockType"
          id="rockType"
          value={rockType}
          onChange={(e) => setRockType(e.target.value)}
        >
          <option value="limestone">Limestone</option>
          <option value="sandstone">Sandstone</option>
          <option value="granithe">Granite</option>
        </select>

        <label htmlFor="country"></label>
        <select
          name="country"
          id="country"
          value={rockType}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="POL">Poland</option>
          <option value="ITA">Italy</option>
          <option value="DEU">Deu</option>
        </select>
        {/* <label htmlFor="rate"></label>
        <select
          name="rate"
          id="rate"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
        >
          <option value="1">1 of 10 stars</option>
          <option value="2">2 of 10 stars</option>
          <option value="3">3 of 10 stars</option>
          <option value="4">4 of 10 stars</option>
          <option value="5">5 of 10 stars</option>
          <option value="6">6 of 10 stars</option>
          <option value="7">7 of 10 stars</option>
          <option value="8">8 of 10 stars</option>
          <option value="9">9 of 10 stars</option>
          <option value="10">10 of 10 stars</option>
        </select> */}
        <button onClick={clearFilters}>Clear</button>
        {/* <button onClick={cancelSearchTag}>Cancel</button> */}
      </form>
      {/* <div>{searchProducts()}</div> */}
    </>
  );
};

export default Finder;
