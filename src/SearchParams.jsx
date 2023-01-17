import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import Results from "./Results";
import useBreedList from "./useBreedList";

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  const [animal, updateAnimal] = useState("");
  let [pets, setPets] = useState([]);

  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
  });
  const results = useQuery(["search", requestParams], fetchSearch);
  pets = results?.data?.pets ?? [];

  //custom hooks
  const [breeds] = useBreedList(animal);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        <label htmlFor="location">
          <input id="location" placeholder="Location" name="location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select id="animal" name="animal">
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
          <select disabled={!breeds.length} id="breed" name="breed">
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

5.  We no longer have any useEffect calls in our code. 
    This won't always be the case but it's a nice thing to have. 
    useEffect calls are a lot more difficult to get  head around.
    Where we have alternatives (like react-query) 
    avoiding useEffect calls and offload  async code to a smart library like react-query is always good
    because now we dont have to control the form , but currently we dont have validation
    in our code but if validation needed then we have to think about using react query 



*/
