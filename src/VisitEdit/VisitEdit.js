import React from "react";
import { zonedTimeToUtc } from "date-fns-tz";
import ApiContext from "../ApiContext";
import config from "../config";
import PropTypes from "prop-types";
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
    const { visit_id } = this.props.match.params;
    fetch(`${config.API_ENDPOINT}/visits/${visit_id}`, {
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
          visit_id: res.visit_id,
          visit_type: res.visit_type,
          visit_provider_name: res.visit_provider_name,
          visit_location: res.visit_location,
          visit_date: res.visit_date,
          visit_reason: res.visit_reason,
          visit_notes: res.visit_notes,
          visit_date_modified: res.visit_date_modified,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
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
    const { visit_id } = this.props.match.params;
    const updatedVisit = {
      visit_id: this.state.visit_id,
      visit_type: this.state.visit_type,
      visit_provider_name: this.state.visit_provider_name,
      visit_location: this.state.visit_location,
      visit_date: this.state.visit_date,
      visit_reason: this.state.visit_reason,
      visit_notes: this.state.visit_notes,
    };

    fetch(`${config.API_ENDPOINT}/visits/${visit_id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedVisit),
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
        this.resetFields(updatedVisit);
        this.context.editProvider(updatedVisit);
        this.props.history.push(`/visits/${updatedVisit.visit_id}`);
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  };

  resetFields = (newFields) => {
    this.setState({
      visit_id: newFields.visit_id || "",
      visit_type: newFields.visit_type || "",
      visit_provider_name: newFields.visit_provider_name || "",
      visit_location: newFields.visit_location || "",
      visit_date: newFields.visit_date || "",
      visit_reason: newFields.visit_reason || "",
      visit_notes: newFields.visit_notes || "",
      visit_date_modified: newFields.visit_date_modified || "",
    });
  };

  render() {
    const {
      visit_type,
      visit_provider_name,
      visit_location,
      visit_date,
      visit_reason,
      visit_notes,
    } = this.state;

    return (
      <div className="VisitEdit">
        <h1>Edit a Visit</h1>
        <form className="VisitEdit__form" onSubmit={this.handleSubmit}>
          <label htmlFor="visit-type">Specialty</label>
          <select
            id="visit-type"
            defaultValue={visit_type}
            onChange={this.handleChangeType}
          >
            {this.makeVisitTypeList()}
          </select>
          <br />

          <label htmlFor="visit-provider-name">Provider Name</label>
          <select
            id="visit-provider-name"
            defaultValue={visit_provider_name}
            onChange={this.handleChangeName}
          >
            {this.makeProvidersList()}
          </select>
          <br />

          <label htmlFor="visit-location">Location</label>
          <select
            id="visit-location"
            defaultValue={visit_location}
            onChange={this.handleChangeLocation}
          >
            {this.makeLocationsList()}
          </select>
          <br />

          <label htmlFor="visit-date">Date {"&"} Time</label>
          <input
            type="datetime-local"
            id="visit-date"
            defaultValue={visit_date}
            onChange={this.handleChangeDate}
            required
          ></input>
          <br />

          <label htmlFor="visit-reason">Reason for visit</label>
          <input
            type="text"
            id="visit-reason"
            defaultValue={visit_reason}
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
            defaultValue={visit_notes}
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

VisitEdit.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
