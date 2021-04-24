import React from "react";
import ApiContext from "../ApiContext";
import config from "../config";
import PropTypes from "prop-types";
import "./VisitAdd.css";

export default class VisitAdd extends React.Component {
  static contextType = ApiContext;

  state = {
    visit_type: "",
    visit_provider_name: "",
    visit_location: "",
    visit_date: "",
    visit_reason: "",
    visit_notes: "",
  };

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
    this.setState({
      visit_date: e.target.value,
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

    return (
      <select id="visit-type" onChange={this.handleChangeType}>
        <option value="">Select an option</option>
        {visitTypeList}
      </select>
    );
  };

  makeProvidersList = () => {
    const providersList = this.context.providers.map((provider) => {
      return (
        <option key={provider.hcp_id} value={provider.hcp_name}>
          {provider.hcp_name}
        </option>
      );
    });

    return (
      <select id="visit-provider-name" onChange={this.handleChangeName}>
        <option value="">Select an option</option>
        {providersList}
      </select>
    );
  };

  makeLocationsList = () => {
    const locationsList = this.context.providers.map((provider) => {
      return (
        <option key={provider.hcp_id} value={provider.hcp_location}>
          {provider.hcp_location}
        </option>
      );
    });
    return (
      <select id="visit-location" onChange={this.handleChangeLocation}>
        <option value="">Select an option</option>
        {locationsList}
      </select>
    );
  };

  validateType = (e) => {
    e.preventDefault();
    if (this.state.visit_type === "") {
      alert(`Select a specialty`);
    } else {
      this.validateName();
    }
  };

  validateName = () => {
    if (this.state.visit_provider_name === "") {
      alert(`Select a provider`);
    } else {
      this.validateLocation();
    }
  };

  validateLocation = () => {
    if (this.state.visit_location === "") {
      alert(`Select a location`);
    } else {
      this.handleSubmit();
    }
  };

  handleClickCancel = () => {
    this.props.history.push(`/visits`);
  };

  handleSubmit = () => {
    const newVisit = {
      visit_type: this.state.visit_type,
      visit_provider_name: this.state.visit_provider_name,
      visit_location: this.state.visit_location,
      visit_date: this.state.visit_date,
      visit_reason: this.state.visit_reason,
      visit_notes: this.state.visit_notes,
    };
    fetch(`${config.API_ENDPOINT}/visits`, {
      method: "POST",
      body: JSON.stringify(newVisit),
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`Something went wrong`);
        }
        return res.json();
      })
      .then((res) => {
        this.context.addVisit(newVisit);
        this.props.history.push(`/visits`);
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  render() {
    return (
      <div className="VisitAdd">
        <h1>Add a Visit</h1>
        <form className="VisitAdd__form" onSubmit={this.validateType}>
          <label htmlFor="visit-type">Specialty</label>
          {this.makeVisitTypeList()}

          <br />

          <label htmlFor="visit-provider-name">Provider Name</label>

          {this.makeProvidersList()}
          <br />

          <label htmlFor="visit-location">Location</label>
          {this.makeLocationsList()}
          <br />

          <label htmlFor="visit-date">Date {"&"} Time</label>
          <input
            type="datetime-local"
            id="visit-date"
            onChange={this.handleChangeDate}
            required
          ></input>
          <br />

          <label htmlFor="visit-reason">Reason for visit</label>
          <input
            type="text"
            id="visit-reason"
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
            onChange={this.handleChangeNotes}
            required
          ></textarea>
          <br />
          <br />

          <div className="VisitAdd__button-container">
            <button
              type="button"
              id="cancel-add-provider__button"
              onClick={this.handleClickCancel}
            >
              Cancel
            </button>
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

VisitAdd.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
