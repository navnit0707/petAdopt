import { Link } from "react-router-dom";

const Pet = (props) => {
  const { name, animal, breed, images, location, id } = props;

  let hero = "http://pets-images.dev-apis.com/pets/none.jpg";
  if (images.length) {
    hero = images[0];
  }

  return (
    <Link to={`/details/${id}`} className="pet">
      <div className="image-container">
        <img src={hero} alt={name} />
      </div>
      <div className="info">
        <h1>{name}</h1>
        <h2>{`${animal} — ${breed} — ${location}`}</h2>
      </div>
    </Link>
  );
};

export default Pet;

/**
 * Link vs a . <a> works, but with a flaw: every link we clicked would end
 * up in the browser navigating to a whole new page which means React
 *  would totally reload our entire app all over again.
 * With <Link> it can intercept this and just handle that all client-side.
 *
 * The useParams hook is how we get params from React Router
 */
