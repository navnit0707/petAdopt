import Carousel from "./Carousel";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import fetchPet from "./fetchPet";

const Details = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchPet);

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🌀</h2>
      </div>
    );
  }

  const pet = results.data.pets[0];
  return (
    <div className="details">
      <Carousel images={pet.images} />;
      <div>
        <h1>{pet.name}</h1>
        <h2>{`${pet.animal} — ${pet.breed} — ${pet.city}, ${pet.state}`}</h2>
        <button>Adopt {pet.name}</button>
        <p>{pet.description}</p>
      </div>
    </div>
  );
};

export default Details;

/**
 * 1. useQuery will  use the queryClient that we instantiated above via context
 * 2. The results object has a lot of booleans on it for isLoading, isError, isFetching, isPaused, etc.
 *    In this case react-query will make it start its first fetch (but not finish) and then continue rendering.
 *    Therefore we must handle the isLoading case.
 * 3. the first time it will load it and the second time it won't of we back and forward page ;
 *    it'll just pull it from the cache because of caching
 *
 */
