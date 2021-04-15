import React from "react";
import { Link } from "react-router-dom";
import "./Recommendation.css";

export default class Recommendation extends React.Component {
  render() {
    const {
      recommendation_id,
      recommendation_type,
      recommendation_notes,
    } = this.props;

    return (
      <div className="Recommendation">
        <div className="Recommendation__type">
          <Link to={`/recommendations/${recommendation_id}`}>
            {recommendation_type}
          </Link>
        </div>
        <br />
        <div className="Recommendation__notes">
          <span className="Recommendation__notes-title">Notes:</span>
          <br />
          {recommendation_notes}
        </div>
      </div>
    );
  }
}
