import React from "react";
import { Link } from "react-router-dom";
import ApiContext from "../ApiContext";
import Recommendation from "../Recommendation/Recommendation";
import "./RecommendationPage.css";

export default class RecommendationPage extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };

  static contextType = ApiContext;

  handleClickDelete = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to remove this recommendation?\nClick OK to remove."
      )
    ) {
      const { rec_id } = this.props.match.params;
      this.context.deleteRecommendation(rec_id);
      this.props.history.push(`/recommendations`);
    }
  };

  render() {
    const { recommendations } = this.context;
    const { rec_id } = this.props.match.params;

    const findRecommendation = (recommendations, rec_id) =>
      recommendations.find((rec) => rec.recommendation_id == rec_id);
    const rec = findRecommendation(recommendations, rec_id);

    return (
      <div className="RecommendationPage">
        <div className="Recommendation">
          <Recommendation
            recommendation_id={rec.recommendation_id}
            recommendation_type={rec.recommendation_type}
            recommendation_notes={rec.recommendation_notes}
          />
        </div>
        <div className="RecommendationPage__buttons">
          <Link to={`/edit-recommendation/${rec_id}`}>
            <button className="RecommendationPage__button-edit">Edit</button>
          </Link>
          <button
            className="Recommendation__button-delete"
            id="delete-recommendation__button"
            onClick={this.handleClickDelete}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }
}
