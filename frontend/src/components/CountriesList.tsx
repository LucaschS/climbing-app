import { Country } from "../models/interface-models";

interface CountryListProps {
  countries: Country[];
}

function GymContriesList({ countries }: CountryListProps) {
  return (
    <div>
      <h1>Country</h1>
      <ul>
        {countries.map((country) => (
          <li key={country["alpha-3"]}>{country.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default GymContriesList;
