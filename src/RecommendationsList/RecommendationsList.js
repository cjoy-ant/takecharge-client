import React from "react";
import { Link } from "react-router-dom";
import ApiContext from "../ApiContext";
import Recommendation from "../Recommendation/Recommendation";
import "./RecommendationsList.css";

export default class RecommendationsList extends React.Component {
  static contextType = ApiContext;

  makeRecommendationsList = () => {
    const recommendationsList = this.context.recommendations.map((rec) => {
      return (
        <li key={rec.recommendation_id} id={rec.recommendation_id}>
          <Recommendation
            recommendation_id={rec.recommendation_id}
            recommendation_type={rec.recommendation_type}
            recommendation_notes={rec.recommendation_notes}
          />
        </li>
      );
    });

    return recommendationsList;
  };

  render() {
    return (
      <div className="RecommendationsList">
        <h2>Recommendations for You</h2>
        <div className="RecommendationsList__button-add">
          <Link to="/add-recommendation">
            <button
              className="RecommendationsList__button-add"
              id="add-recommendation"
            >
              Add Recommendation
            </button>
          </Link>
        </div>
        <ul id="RecommendationsList">{this.makeRecommendationsList()}</ul>
      </div>
    );
  }
}
