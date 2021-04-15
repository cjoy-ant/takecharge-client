import React from "react";
import ApiContext from "../ApiContext";
import "./RecommendationEdit.css";

export default class RecommendationEdit extends React.Component {
  static contextType = ApiContext;

  makeRecTypeList = () => {
    const recTypeList = this.context.providers.map((provider) => {
      return <option value={provider.hcp_type}>{provider.hcp_type}</option>;
    });

    return recTypeList;
  };

  handleEditRecommendation = (rec_id) => {
    this.context.editRecommendation(rec_id);
    this.props.history.push(`/recommendations`);
  };

  render() {
    const { recommendations } = this.context;
    const { rec_id } = this.props.match.params;
    const findRecommendation = (recommendations, rec_id) =>
      recommendations.find((rec) => rec.recommendation_id == rec_id);
    const rec = findRecommendation(recommendations, rec_id);

    return (
      <div className="RecommendationEdit">
        <h1>Edit a Recommendation</h1>
        <form className="RecommendationEdit__form">
          <label for="recommendation-type">Specialty:</label>
          <select id="recommendation-type" value={rec.recommendation_type}>
            {this.makeRecTypeList()}
          </select>
          <br />

          <label for="recommendation-notes">Notes:</label>
          <textarea
            id="recommendation-notes"
            aria-label="Note text area"
            rows="10"
            cols="50"
            value={rec.recommendation_notes}
            required
          ></textarea>
          <div className="RecommendationEdit__button-container">
            <button
              class="RecommendationEdit__button-submit"
              onClick={this.handleEditRecommendation}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
