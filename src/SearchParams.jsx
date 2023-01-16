const SearchParams = () => {
  return (
    <div className="searach-Params">
      <form>
        <label htmlFor="location">
          Location{" "}
          <input id="location" value={location} placeholder={location} />
        </label>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default SearchParams;

/*
className, htmlFor is used because for is a reserved word in JS.
onChange={(e) => updateLocation(e.target.value)} it will render at every event 

*/
