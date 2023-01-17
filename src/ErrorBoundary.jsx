import { Component } from "react";
import { Link } from "react-router-dom";

import ErrorBoundary from "./ErrorBoundary";

class ErrorBoundary extends Component {
  state = { hasError: false };
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error("ErrorBoundary caught an error", error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <h2>
          There was an error with this listing. <Link to="/">Click here</Link>{" "}
          to back to the home page.
        </h2>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

/**
 * 1. componentDidCatch : some times APIs with malformatted or otherwise weird data comes with error and we cant control it 
                         when we get errors . so in that case we uses this life cycle method 
                         This is something you can't do with hooks so if you needed this sort of functionality you'd have to use a class component.

                         note : a component cant catch its own error , it will always cathc child error
    2.A static method is one that can be called on the constructor. You'd call this method like this: ErrorBoundary.getDerivedStateFromError(error).
     This method must be static.
    3. If we want to call an error logging service, componentDidCatch would be an amazing place to do that.
 */
