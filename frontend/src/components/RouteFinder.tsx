import React, { useState, useRef, useEffect, useImperativeHandle } from "react";
import { useLoaderData } from "react-router-dom";
import {
  CountriesDetailPageRouteData,
  Route,
} from "../models/interface-models";

interface RoutesFinderProps {
  setFilteredRoutes: (Routes: Route[]) => void;
}

type DefaultState = {
  name: string;
  rockType: string;
  country: string;
  rate: string;
};

const RoutesFinder = ({ setFilteredRoutes }: RoutesFinderProps) => {
  const inputElement = useRef<string>();
  const { routes } = useLoaderData() as CountriesDetailPageRouteData;

  const optionsValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Dobra praktyka, często wkłada się w stan jeżeli jest potrzeba

  const [selectedValues, setSelectedValues] = useState<any>({
    name: "",
    rockType: "",
    country: "",
    rate: "",
  }); // Tutaj stan potrzebny, bo chcemy wyświetlić dane w kontencie
  console.log(selectedValues, "selectedValues");

  const rockCategory = Array.from(
    new Set(routes.map((route) => route.tags["climbing:rock"]))
  );

  // const type = Array.from(new Set(routes.map((route) => route.tags.alt_name)));
  // console.log(type, "type");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElements = [...e.currentTarget.elements];
    console.log(formElements, "formElements");

    const selectNameElement = formElements.find(
      (formElement) => formElement.id === "name"
    )! as HTMLSelectElement;

    const selectedInputNameElements = [selectNameElement.value];

    setSelectedValues((prevState:any) => ({
      ...prevState,
      name: selectedInputNameElements,
    }));

    const selectRockTypeElements = formElements.find(
      (formElement) => formElement.id === "rockType"
    )! as HTMLSelectElement;

    const selectedRockTypeElements = [selectRockTypeElements.value];

    setSelectedValues((prevState:any) => ({
      ...prevState,
      rockType: selectedRockTypeElements,
    }));
    // console.log(e.target[0].value);
    // console.log(e.target.elements.name.value);
    // console.log(e.target.name.value);

    // const data = new FormData(e.target);

    // console.log(data.get("country"));
    // console.log(data.get("name"));
    // console.log(e.target[3].value, "e.currentTarget.value");
  };

  useEffect(() => {
    setFilteredRoutes(
      routes.filter((route) => {
        const { rockType, country, name, rate } = selectedValues;
        return (
          (!rockType || rockType === route.tags["climbing:rock"]) &&
          (!country || country === route.country[0]) &&
          (!name ||
            (route.tags.name &&
              route.tags.name.toLowerCase().includes(name.toLowerCase())))
        );
      })
    );
  }, [selectedValues.country, selectedValues.rockType, selectedValues.name]);

  const clearFilters = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSelectedValues({
      name: "",
      rockType: "",
      country: "",
      rate: "",
    });
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
        <select name="country" id="country">
          <option value="">Any</option>
          <option value="POL">Poland</option>
          <option value="ITA">Italy</option>
          <option value="DEU">Deu</option>
        </select>

        <label htmlFor="rate"></label>
        <select name="rate" id="rate">
          <option value="">Any</option>
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
