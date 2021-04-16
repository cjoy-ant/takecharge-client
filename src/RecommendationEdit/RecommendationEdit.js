import React from "react";
import ApiContext from "../ApiContext";
import "./RecommendationEdit.css";

export default class RecommendationEdit extends React.Component {
  static contextType = ApiContext;

  state = {
    recommendation_id: "",
    recommendation_type: "",
    recommendation_notes: "",
  };

  componentDidMount() {
    const { recommendations } = this.context;
    const { rec_id } = this.props.match.params;
    const findRecommendation = (recommendations, rec_id) =>
      recommendations.find((rec) => rec.recommendation_id === Number(rec_id));
    const rec = findRecommendation(recommendations, rec_id);

    this.setState({
      recommendation_id: rec.recommendation_id,
      recommendation_type: rec.recommendation_type,
      recommendation_notes: rec.recommendation_notes,
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

    const updatedRecommendation = {
      recommendation_id: this.state.recommendation_id,
      recommendation_type: this.state.recommendation_type,
      recommendation_notes: this.state.recommendation_notes,
    };

    this.context.editRecommendation(updatedRecommendation);
    this.props.history.push(
      `/recommendations/${updatedRecommendation.recommendation_id}`
    );
  };

  render() {
    const { recommendations } = this.context;
    const { rec_id } = this.props.match.params;
    const findRecommendation = (recommendations, rec_id) =>
      recommendations.find((rec) => rec.recommendation_id === Number(rec_id));
    const rec = findRecommendation(recommendations, rec_id);

    return (
      <div className="RecommendationEdit">
        <h1>Edit a Recommendation</h1>
        <form className="RecommendationEdit__form" onSubmit={this.handleSubmit}>
          <label for="recommendation-type">Specialty:</label>
          <select
            id="recommendation-type"
            defaultValue={rec.recommendation_type}
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
            defaultValue={rec.recommendation_notes}
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
