import React from "react";
import ApiContext from "../ApiContext";
import "./RecommendationAdd.css";

export default class RecommendationAdd extends React.Component {
  static contextType = ApiContext;

  state = {
    recommendation_type: "",
    recommendation_notes: "",
  };

  makeRecTypeList = () => {
    const recTypeList = this.context.providers.map((provider) => {
      return <option value={provider.hcp_type}>{provider.hcp_type}</option>;
    });

    return (
      <select id="recommendation-type" onChange={this.handleChangeType}>
        <option value="">Select an option</option>
        {recTypeList}
      </select>
    );
  };

  handleChangeType = (e) => {
    this.setState({ recommendation_type: e.target.value });
  };

  handleChangeNotes = (e) => {
    this.setState({ recommendation_notes: e.target.value });
  };

  validateType = (e) => {
    e.preventDefault();
    if (this.state.recommendation_type === "") {
      alert(`Select a specialty`);
    } else {
      this.handleSubmit();
    }
  };

  handleSubmit = () => {
    const newRecommendation = {
      recommendation_id: this.context.recommendations.length + 1,
      recommendation_type: this.state.recommendation_type,
      recommendation_notes: this.state.recommendation_notes,
    };

    this.context.addRecommendation(newRecommendation);
    this.props.history.push(`/recommendations`);
  };

  render() {
    return (
      <div className="RecommendationAdd">
        <h1>Add a Recommendation</h1>
        <form className="RecommendationAdd__form" onSubmit={this.validateType}>
          <label for="recommendation-type">Specialty:</label>
          {this.makeRecTypeList()}
          <br />

          <label for="recommendation-notes">Notes:</label>
          <textarea
            id="recommendation-notes"
            aria-label="Note text area"
            rows="10"
            cols="50"
            onChange={this.handleChangeNotes}
            required
          ></textarea>
          <div className="RecommendationAdd__button-container">
            <button
              type="submit"
              class="RecommendationAdd__button-submit"
              id="add-rec-form__button-submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
