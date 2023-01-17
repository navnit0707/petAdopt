import { useEffect, useState } from "react";
import Results from "./Results";
import useBreedList from "./useBreedList";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [location, updateLocation] = useState("bihar");
  const [animal, updateAnimal] = useState("");
  const [breed, setBreed] = useState("");
  const [pets, setPets] = useState([]);

  //custom hooks
  const [breeds] = useBreedList(animal);

  useEffect(() => {
    requestPets();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  async function requestPets() {
    const res = await fetch(
      `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
    );
    const json = await res.json();

    setPets(json.pets);
  }

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => updateLocation(e.target.value)}
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={animal}
            onChange={(e) => {
              updateAnimal(e.target.value);
              updateBreed("");
            }}
            onBlur={(e) => {
              updateAnimal(e.target.value);
              updateBreed("");
            }}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!breeds.length}
            id="breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            onBlur={(e) => setBreed(e.target.value)}
          >
            <option />
            {breeds.map((breed) => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
};

export default SearchParams;

/*
1. className, htmlFor is used because for is a reserved word in JS..
2. onChange={(e) => updateLocation(e.target.value)} it will render at every event 

3. useEffect allows you to say "do a render of this component first so the user can see 
   something then as soon as the render is done, then do something

4.  const [breeds] = useBreedList(animal); since animal wil be updated so this custoomhook will return 
    a list of breeds (including an empty list when it doesn't have anything in it) and an enumerated type 
    of the status of the hook: unloaded, loading, or loaded.



*/
