import React, { useState, useRef, useEffect, useImperativeHandle } from "react";
import { useLoaderData } from "react-router-dom";
import {
  CountriesDetailPageRouteData,
  Route,
} from "../models/interface-models";

interface RoutesFinderProps {
  setFilteredRoutes: (Routes: Route[]) => void;
}


const RoutesFinder = ({ setFilteredRoutes }: RoutesFinderProps) => {
  const { routes } = useLoaderData() as CountriesDetailPageRouteData;

  const [state, setState] = useState<any>({
    name: "",
    rockType: "",
    country: "",
    rate: "",
  });

  // const [rockType, setRockType] = useState<string | undefined>();
  // const [country, setCountry] = useState<string | undefined>();
  // const [name, setName] = useState<string | undefined>();
  // const [rate, setRate] = useState<string | undefined>();

  console.log(state, "state");
  // console.log(rate, "rate");
  const rockCategory = Array.from(
    new Set(routes.map((route) => route.tags["climbing:rock"]))
  );

  // const type = Array.from(new Set(routes.map((route) => route.tags.alt_name)));
  // console.log(type, "type");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(e.target, "e");
    // setState({
    //   name: e.target[0].value,
    //   rockType: e.target[1].value,
    //   country: e.target[2].value,
    //   rate: e.target[3].value,
    // });

    console.log(e.currentTarget.name, "name");
  };

  useEffect(() => {
    setFilteredRoutes(
      routes.filter((route) => {
        const { rockType, country, name, rate } = state;
        return (
          (!rockType || rockType === route.tags["climbing:rock"]) &&
          (!country || country === route.country[0]) &&
          (!name ||
            (route.tags.name &&
              route.tags.name.toLowerCase().includes(name.toLowerCase())))
        );
      })
    );
  }, [state.country, state.rockType, state.name]);

  const clearFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setState({
      name: "",
      rockType: "",
      country: "",
      rate: "",
    });

    // setCountry("");
    // setRockType("");
    // setName("");
  };

  return (
    <>
      <h1>Gym Finder</h1>
      <form onSubmit={handleSubmit}>
        <input name="name" type="text" id="name"></input>
        <label htmlFor="rockType"></label>
        <select name="rockType" id="rockType">
          <option value="">Any</option>
          {rockCategory.map((category) => (
            <option value={category}>{category}</option>
          ))}
        </select>

        <label htmlFor="country"></label>
        <select name="country" id="country" value={state.country}>
          <option value="">Any</option>
          <option value="POL">Poland</option>
          <option value="ITA">Italy</option>
          <option value="DEU">Deu</option>
        </select>
        <label htmlFor="rate"></label>
        <select name="rate" id="rate">
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
        </select>
        <button onClick={clearFilters}>Clear</button>
        <button>Search</button>
      </form>
    </>
  );
};

export default RoutesFinder;
