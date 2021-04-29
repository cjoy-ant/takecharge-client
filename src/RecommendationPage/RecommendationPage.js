import React from "react";
import { Link } from "react-router-dom";
import ApiContext from "../ApiContext";
import config from "../config";
import PropTypes from "prop-types";
import Recommendation from "../Recommendation/Recommendation";
import "./RecommendationPage.css";

export default class RecommendationPage extends React.Component {
  state = {
    error: null,
    recommendation_id: "",
    recommendation_type: "",
    recommendation_notes: "",
    recommendation_date_modified: "",
  };

  static contextType = ApiContext;

  componentDidMount() {
    const { rec_id } = this.props.match.params;
    fetch(`${config.API_ENDPOINT}/recommendations/${rec_id}`, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => Promise.reject(error));
        }
        return res.json();
      })
      .then((res) => {
        this.setState({
          recommendation_id: res.recommendation_id,
          recommendation_type: res.recommendation_type,
          recommendation_notes: res.recommendation_notes,
          recommendation_date_modified: res.recommendation_date_modified,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  handleClickDelete = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to remove this recommendation?\nClick OK to remove."
      )
    ) {
      const { rec_id } = this.props.match.params;
      fetch(`${config.API_ENDPOINT}/recommendations/${rec_id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then(() => {
          this.context.deleteRecommendation(rec_id);
          this.props.history.push(`/recommendations`);
        })
        .catch((error) => {
          console.error(error);
          this.setState({ error });
        });
    }
  };

  render() {
    const {
      recommendation_id,
      recommendation_type,
      recommendation_notes,
    } = this.state;
    const rec_id = recommendation_id;

    return (
      <div className="RecommendationPage">
        <div className="RecommendationPage__recommmendation">
          <Recommendation
            recommendation_id={recommendation_id}
            recommendation_type={recommendation_type}
            recommendation_notes={recommendation_notes}
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

RecommendationPage.defaultProps = {
  match: {
    params: {}
  },
  history: {
    push: () => {}
  }
}

RecommendationPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
