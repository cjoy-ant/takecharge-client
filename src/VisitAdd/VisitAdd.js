import { isMatchWithOptions } from "date-fns/fp";
import React from "react";
import ApiContext from "../ApiContext";
import "./VisitAdd.css";

export default class VisitAdd extends React.Component {
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

  render() {
    return (
      <div className="VisitAdd">
        <h1>Add a Visit</h1>
        <form className="VisitAdd__form">
          <label for="visit-type">Specialty</label>
          <select id="visit-type">{this.makeVisitTypeList()}</select>
          <br />

          <label for="visit-provider-name">Provider Name</label>
          <select id="visit-provider-name">{this.makeProvidersList()}</select>
          <br />

          <label for="visit-location">Location</label>
          <select id="visit-location">{this.makeLocationsList()}</select>
          <br />

          <label for="visit-date">Date</label>
          <input type="date" id="visit-date"></input>
          <br />

          <label for="visit-reason">Reason for visit</label>
          <input type="text" id="visit-reason"></input>
          <br />

          <label for="visit-notes">Visit Notes</label>
          <br />
          <textarea
            id="visit-notes"
            aria-label="visist notes text area"
            rows="10"
            cols="50"
            required
          ></textarea>
          <br />
          <br />

          <div className="VisitAdd__button-container">
            <button
              type="submit"
              className="VisitAdd__button-submit"
              id="add-visit-form__button-submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
