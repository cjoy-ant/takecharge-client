import React from "react";
import ProvidersList from "../ProvidersList/ProvidersList";
import VisitsList from "../VisitsList/VisitsList";
import RecommendationsList from "../RecommendationsList/RecommendationsList";

export default class Home extends React.Component {
  render() {
    return (
      <div className="Home">
        <ProvidersList />
        <VisitsList />
        <RecommendationsList />
      </div>
    );
  }
}
