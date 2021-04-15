import React from "react";
import ApiContext from "../ApiContext";
import "./VisitEdit.css";

export default class VisitEdit extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };

  static contextType = ApiContext;

  makeVisitTypeList = () => {
    const visitTypeList = this.context.providers.map((provider) => {
      return <option value={provider.hcp_type}>{provider.hcp_type}</option>;
    });

    return visitTypeList;
  };

  makeProvidersList = () => {
    const providersList = this.context.providers.map((provider) => {
      return <option value={provider.hcp_name}>{provider.hcp_name}</option>;
    });

    return providersList;
  };

  makeLocationsList = () => {
    const locationsList = this.context.providers.map((provider) => {
      return (
        <option value={provider.hcp_location}>{provider.hcp_location}</option>
      );
    });
    return locationsList;
  };

  handleEditVisit = (visit_id) => {
    this.context.editVist(visit_id);
    this.props.history.push(`/visits`);
  };

  render() {
    const { visits } = this.context;
    const { visit_id } = this.props.match.params;
    const findVisit = (visits, visit_id) =>
      visits.find((visit) => visit.visit_id == visit_id);
    const visit = findVisit(visits, visit_id);

    return (
      <div className="VisitEdit">
        <h1>Add a Visit</h1>
        <form className="VisitEdit__form">
          <label for="visit-type">Specialty</label>
          <select id="visit-type" value={visit.visit_type}>
            {this.makeVisitTypeList()}
          </select>
          <br />

          <label for="visit-provider-name">Provider Name</label>
          <select id="visit-provider-name" value={visit.visit_provider_name}>
            {this.makeProvidersList()}
          </select>
          <br />

          <label for="visit-location">Location</label>
          <select id="visit-location" value={visit.visit_location}>
            {this.makeLocationsList()}
          </select>
          <br />

          <label for="visit-date">Date</label>
          <input type="date" id="visit-date" value={visit.visit_date}></input>
          <br />

          <label for="visit-reason">Reason for visit</label>
          <input
            type="text"
            id="visit-reason"
            value={visit.visit_reason}
          ></input>
          <br />

          <label for="visit-notes">Visit Notes</label>
          <br />
          <textarea
            id="visit-notes"
            aria-label="visist notes text area"
            rows="10"
            cols="50"
            value={visit.visit_notes}
            required
          ></textarea>
          <br />
          <br />

          <div className="VisitEdit__button-container">
            <button
              type="submit"
              className="VisitEdit__button-submit"
              id="edit-visit-form__button-submit"
              onClick={this.handleEditVisit}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
