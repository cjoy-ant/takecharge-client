import React from "react";
import ApiContext from "../ApiContext";
import config from "../config";
import "./RecommendationEdit.css";

export default class RecommendationEdit extends React.Component {
  static contextType = ApiContext;

  state = {
    recommendation_id: "",
    recommendation_type: "",
    recommendation_notes: "",
  };

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
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  makeRecTypeList = () => {
    const recTypeList = this.context.providers.map((provider) => {
      return (
        <option key={provider.hcp_id} value={provider.hcp_type}>
          {provider.hcp_type}
        </option>
      );
    });

    return recTypeList;
  };

  handleChangeType = (e) => {
    this.setState({ recommendation_type: e.target.value });
  };

  handleChangeNotes = (e) => {
    this.setState({ recommendation_notes: e.target.value });
  };

  handleClickCancel = () => {
    this.props.history.push(`/recommendations`);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { rec_id } = this.props.match.params;
    const updatedRecommendation = {
      recommendation_id: this.state.recommendation_id,
      recommendation_type: this.state.recommendation_type,
      recommendation_notes: this.state.recommendation_notes,
    };

    fetch(`${config.API_ENDPOINT}/recommendations/${rec_id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedRecommendation),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => Promise.reject(error));
        }
      })
      .then((res) => {
        this.resetFields(updatedRecommendation);
        this.context.editProvider(updatedRecommendation);
        this.props.history.push(
          `/recommendations/${updatedRecommendation.recommendation_id}`
        );
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });

    this.context.editRecommendation(updatedRecommendation);
    this.props.history.push(
      `/recommendations/${updatedRecommendation.recommendation_id}`
    );
  };

  resetFields = (newFields) => {
    this.setState({
      recommendation_id: newFields.recommendation_id || "",
      recommendation_type: newFields.recommendation_type || "",
      recommendation_notes: newFields.recommendation_notes || "",
      recommendation_date_modified:
        newFields.recommendation_date_modified || "",
    });
  };

  render() {
    const { recommendation_type, recommendation_notes } = this.state;

    return (
      <div className="RecommendationEdit">
        <h1>Edit a Recommendation</h1>
        <form className="RecommendationEdit__form" onSubmit={this.handleSubmit}>
          <label for="recommendation-type">Specialty:</label>
          <select
            id="recommendation-type"
            defaultValue={recommendation_type}
            onChange={this.handleChangeType}
          >
            {this.makeRecTypeList()}
          </select>
          <br />

          <label htmlFor="recommendation-notes">Notes:</label>
          <textarea
            id="recommendation-notes"
            aria-label="Note text area"
            rows="10"
            cols="50"
            defaultValue={recommendation_notes}
            onChange={this.handleChangeNotes}
            required
          ></textarea>
          <div className="RecommendationEdit__button-container">
            <button
              type="button"
              id="cancel-add-provider__button"
              onClick={this.handleClickCancel}
            >
              Cancel
            </button>
            <button
              className="RecommendationEdit__button-submit"
              id="edit-recommendation__button-submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
