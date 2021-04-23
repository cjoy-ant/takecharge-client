import React from "react";
import ApiContext from "../ApiContext";
import config from "../config";
import PropTypes from "prop-types";
import states from "../states";
import "./ProviderAdd.css";

export default class ProviderAdd extends React.Component {
  static contextType = ApiContext;

  state = {
    hcp_type: "",
    hcp_name: "",
    hcp_location: "",
    hcp_phone: "",
    hcp_address_street: "",
    hcp_address_city: "",
    hcp_address_state: "",
    hcp_address_zip: "",
  };

  handleChangeType = (e) => {
    this.setState({
      hcp_type: e.target.value,
    });
  };

  handleChangeName = (e) => {
    this.setState({
      hcp_name: e.target.value,
    });
  };

  handleChangeLocation = (e) => {
    this.setState({
      hcp_location: e.target.value,
    });
  };

  handleChangePhone = (e) => {
    this.setState({
      hcp_phone: e.target.value,
    });
  };

  handleChangeStreet = (e) => {
    this.setState({
      hcp_address_street: e.target.value,
    });
  };

  handleChangeCity = (e) => {
    this.setState({
      hcp_address_city: e.target.value,
    });
  };

  handleChangeState = (e) => {
    this.setState({
      hcp_address_state: e.target.value,
    });
  };

  handleChangeZip = (e) => {
    this.setState({
      hcp_address_zip: e.target.value,
    });
  };

  makeStatesListHTML = () => {
    const statesList = states.map((state) => {
      return (
        <option key={state} value={state}>
          {state}
        </option>
      );
    });

    return statesList;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const newProvider = {
      hcp_type: this.state.hcp_type,
      hcp_name: this.state.hcp_name,
      hcp_location: this.state.hcp_location,
      hcp_phone: this.state.hcp_phone,
      hcp_address_street: this.state.hcp_address_street,
      hcp_address_city: this.state.hcp_address_city,
      hcp_address_state: this.state.hcp_address_state,
      hcp_address_zip: this.state.hcp_address_zip,
    };

    fetch(`${config.API_ENDPOINT}/providers`, {
      method: "POST",
      body: JSON.stringify(newProvider),
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
        this.context.addProvider(newProvider);
        this.props.history.push(`/providers`);
      })
      .catch((error) => {
        this.setState({ error });
      });
  };

  handleClickCancel = () => {
    this.props.history.push("/providers");
  };

  render() {
    return (
      <div className="ProviderAdd">
        <h1>Add a Health Care Provider</h1>
        <form
          className="ProviderAdd__form"
          id="add-provider-form"
          onSubmit={this.handleSubmit}
        >
          <h2>General Information</h2>
          <label htmlFor="hcp-type">Specialty</label>
          <input
            id="hcp-type"
            placeholder="(e.g., Primary Care Physician)"
            onChange={this.handleChangeType}
            required
          ></input>
          <br />

          <label htmlFor="hcp-name">Name</label>
          <input
            id="hcp-name"
            placeholder="First and Last Name"
            onChange={this.handleChangeName}
            required
          ></input>
          <br />

          <label htmlFor="hcp-location">Location</label>
          <input
            id="hcp-location"
            placeholder="Hospital or Facility Affiliation"
            onChange={this.handleChangeLocation}
            required
          ></input>
          <br />

          <h2>Contact</h2>

          <label htmlFor="hcp-phone">Phone Number</label>
          <input
            id="hcp-phone"
            type="tel"
            placeholder="xxx-xxx-xxxx"
            onChange={this.handleChangePhone}
            required
          ></input>
          <br />
          <label htmlFor="hcp-address-street">Street Address</label>
          <input id="hcp-address-street" required></input>
          <br />

          <label htmlFor="hcp-address-city">City</label>
          <input
            id="hcp-address-city"
            onChange={this.handleChangeCity}
            required
          ></input>

          <label htmlFor="hcp-address-state">State</label>
          <select id="hcp-address-state" onChange={this.handleChangeState}>
            {this.makeStatesListHTML()}
          </select>

          <label htmlFor="hcp-address-zip">Zip Code</label>
          <input
            id="hcp-address-zip"
            onChange={this.handleChangeZip}
            required
          ></input>
          <br />
          <br />
          <div className="ProviderAdd__button-container">
            <button
              type="button"
              id="cancel-add-provider__button"
              onClick={this.handleClickCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ProviderAdd__button-submit"
              id="add-provider__button-submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}

ProviderAdd.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
