import React from "react";
import { zonedTimeToUtc } from "date-fns-tz";
import ApiContext from "../ApiContext";
import "./VisitEdit.css";

export default class VisitEdit extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };

  static contextType = ApiContext;

  state = {
    visit_id: "",
    visit_type: "",
    visit_provider_name: "",
    visit_location: "",
    visit_date: "",
    visit_reason: "",
    visit_notes: "",
  };

  componentDidMount() {
    const { visits } = this.context;
    const { visit_id } = this.props.match.params;
    const findVisit = (visits, visit_id) =>
      visits.find((visit) => visit.visit_id === Number(visit_id));
    const visit = findVisit(visits, visit_id);

    this.setState({
      visit_id: visit.visit_id,
      visit_type: visit.visit_type,
      visit_provider_name: visit.visit_provider_name,
      visit_location: visit.visit_location,
      visit_date: visit.visit_date,
      visit_reason: visit.visit_reason,
      visit_notes: visit.visit_notes,
    });
  }

  handleChangeType = (e) => {
    this.setState({ visit_type: e.target.value });
  };

  handleChangeName = (e) => {
    this.setState({
      visit_provider_name: e.target.value,
    });
  };

  handleChangeLocation = (e) => {
    this.setState({
      visit_location: e.target.value,
    });
  };

  handleChangeDate = (e) => {
    const dateTimeUtc = zonedTimeToUtc(e.target.value);
    this.setState({
      visit_date: dateTimeUtc,
    });
  };

  handleChangeReason = (e) => {
    this.setState({
      visit_reason: e.target.value,
    });
  };

  handleChangeNotes = (e) => {
    this.setState({
      visit_notes: e.target.value,
    });
  };

  makeVisitTypeList = () => {
    const visitTypeList = this.context.providers.map((provider) => {
      return (
        <option key={provider.hcp_id} value={provider.hcp_type}>
          {provider.hcp_type}
        </option>
      );
    });

    return visitTypeList;
  };

  makeProvidersList = () => {
    const providersList = this.context.providers.map((provider) => {
      return (
        <option key={provider.hcp_id} value={provider.hcp_name}>
          {provider.hcp_name}
        </option>
      );
    });

    return providersList;
  };

  makeLocationsList = () => {
    const locationsList = this.context.providers.map((provider) => {
      return (
        <option key={provider.hcp_id} value={provider.hcp_location}>
          {provider.hcp_location}
        </option>
      );
    });
    return locationsList;
  };

  handleClickCancel = () => {
    const { visit_id } = this.props.match.params;
    this.props.history.push(`/visits/${visit_id}`);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const updatedVisit = {
      visit_id: this.state.visit_id,
      visit_type: this.state.visit_type,
      visit_provider_name: this.state.visit_provider_name,
      visit_location: this.state.visit_location,
      visit_date: this.state.visit_date,
      visit_reason: this.state.visit_reason,
      visit_notes: this.state.visit_notes,
    };

    this.context.editVisit(updatedVisit);
    this.props.history.push(`/visits/${updatedVisit.visit_id}`);
  };

  render() {
    const { visits } = this.context;
    const { visit_id } = this.props.match.params;
    const findVisit = (visits, visit_id) =>
      visits.find((visit) => visit.visit_id === Number(visit_id));
    const visit = findVisit(visits, visit_id);

    return (
      <div className="VisitEdit">
        <h1>Edit a Visit</h1>
        <form className="VisitEdit__form" onSubmit={this.handleSubmit}>
          <label htmlFor="visit-type">Specialty</label>
          <select
            id="visit-type"
            defaultValue={visit.visit_type}
            onChange={this.handleChangeType}
          >
            {this.makeVisitTypeList()}
          </select>
          <br />

          <label htmlFor="visit-provider-name">Provider Name</label>
          <select
            id="visit-provider-name"
            defaultValue={visit.visit_provider_name}
            onChange={this.handleChangeName}
          >
            {this.makeProvidersList()}
          </select>
          <br />

          <label htmlFor="visit-location">Location</label>
          <select
            id="visit-location"
            defaultValue={visit.visit_location}
            onChange={this.handleChangeLocation}
          >
            {this.makeLocationsList()}
          </select>
          <br />

          <label htmlFor="visit-date">Date {"&"} Time</label>
          <input
            type="datetime-local"
            id="visit-date"
            defaultValue={visit.visit_date}
            onChange={this.handleChangeDate}
            required
          ></input>
          <br />

          <label htmlFor="visit-reason">Reason for visit</label>
          <input
            type="text"
            id="visit-reason"
            defaultValue={visit.visit_reason}
            onChange={this.handleChangeReason}
            required
          ></input>
          <br />

          <label htmlFor="visit-notes">Visit Notes</label>
          <br />
          <textarea
            id="visit-notes"
            aria-label="visit notes text area"
            rows="10"
            cols="50"
            defaultValue={visit.visit_notes}
            onChange={this.handleChangeNotes}
            required
          ></textarea>
          <br />
          <br />

          <div className="VisitEdit__button-container">
            <button
              type="button"
              id="cancel-add-provider__button"
              onClick={this.handleClickCancel}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="VisitEdit__button-submit"
              id="edit-visit-form__button-submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
