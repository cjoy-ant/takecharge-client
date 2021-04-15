import React from "react";
import ApiContext from "../ApiContext";
import "./RecommendationAdd.css";

export default class RecommendationAdd extends React.Component {
  static contextType = ApiContext;

  makeRecTypeList = () => {
    const recTypeList = this.context.providers.map((provider) => {
      return <option value={provider.hcp_type}>{provider.hcp_type}</option>;
    });

    return recTypeList;
  };

  handleAddRecommendation = () => {
    this.context.addRecommendation();
    this.props.history.push(`/recommendations`);
  };

  render() {
    return (
      <div className="RecommendationAdd">
        <h1>Add a Recommendation</h1>
        <form className="RecommendationAdd__form">
          <label for="recommendation-type">Specialty:</label>
          <select id="recommendation-type">{this.makeRecTypeList()}</select>
          <br />

          <label for="recommendation-notes">Notes:</label>
          <textarea
            id="recommendation-notes"
            aria-label="Note text area"
            rows="10"
            cols="50"
            required
          ></textarea>
          <div className="RecommendationAdd__button-container">
            <button
              class="RecommendationAdd__button-submit"
              onClick={this.handleAddRecommendation}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
