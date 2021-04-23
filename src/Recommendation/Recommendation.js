import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
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

Recommendation.defaultProps = {
  recommendation_id: "",
  recommendation_type: "",
  recommendation_notes: "",
};

Recommendation.propTypes = {
  recommendation_id: PropTypes.string.isRequired,
  recommendation_type: PropTypes.string.isRequired,
  recommendation_notes: PropTypes.string.isRequired,
};
