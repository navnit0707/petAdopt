import { Component } from "react";

class Carousel extends Component {
  state = {
    active: 0,
  };

  static defaultProps = {
    images: ["http://pets-images.dev-apis.com/pets/none.jpg"],
  };
  handleIndexClick = (event) => {
    this.setState({
      active: +event.target.dataset.index,
    });
  };
  render() {
    const { active } = this.state;
    const { images } = this.props;
    return (
      <div className="carousel">
        <img src={images[active]} alt="animal" />
        <div className="carousel-smaller">
          {images.map((photo, index) => (
            // eslint-disable-next-line
            <img
              key={photo}
              src={photo}
              className={index === active ? "active" : ""}
              alt="animal thumbnail"
              onClick={this.handleIndexClick}
              data-index={index}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Carousel;

/**
 * 1. Every class component extends React.Component.
 *    Every class component must have a render method
 *    that returns some sort of JSX / markup / call to React.createElement.
 * 2. this.state is the mutable state of the component (like useState).
 *    we  use this.setState to mutate it (don't modify it directly.)
 *    this.props comes from the parent component, similar to parameter
 *    given to the render functions that we pull props out of.
 * 3. constructor isn't necessarily a React lifecylce method but we use it like one.
 *    It's where we do things that need to happen before the first render.
 *    Generally it's where we set the initial state.
 * 3. Class components have lifecycle methods.
 *    These for the most part are what useEffect does for function components.
 *          -> componentDidMount is a function that's called after the first rendering is completed.
 *              This pretty similar to a useEffect call that only calls the first time. This is typically
 *               where you want to do data fetching.
 *          -> componentDidUpdate is called after  state is updated.
 *          -> componentWillUnmount is typically a place for cleanup.This method is invoked whenever a component is about to be destroyed.
 *          ->getDerivedStateFromProps : used where a set of props that come in and  need to filter those props before  displaing them
 *          ->
 *          ->
 */
