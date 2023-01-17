import { useState, useEffect } from "react";

const localCache = {};

export default function useBreedList(animal) {
  const [breedList, setBreedList] = useState([]);
  const [status, setStatus] = useState("unloaded");

  useEffect(() => {
    if (!animal) {
      setBreedList([]);
    } else if (localCache[animal]) {
      setBreedList(localCache[animal]);
    } else {
      requestBreedList();
    }

    async function requestBreedList() {
      setBreedList([]);
      setStatus("loading");
      const res = await fetch(
        `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
      );
      const json = await res.json();
      localCache[animal] = json.breeds || [];
      setBreedList(localCache[animal]);
      setStatus("loaded");
    }
  }, [animal]);

  return [breedList, status];
}
/**
 * We're using hooks inside of our custom hook.
 * Generally a custom hook we would make that always uses someother hooks .
 * We're tossing in localCache so if it loads once, it won't have to reload the same API call in the same session.
 * advance :use local storage
 *
 * React has the ability to render, make a request to an async data source (like an API),
 * and then re-render after the new data comes in. useEffect accomplishes this goal precisely.
 *
 *
 *react-query from tenstack :  react-query is going to do for you: it's a built in caching layer for these async data stores that works really well within the constraints of React
 *
 */
