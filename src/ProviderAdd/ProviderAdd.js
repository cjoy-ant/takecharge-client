import React from "react";
import ApiContext from "../ApiContext";
import states from "../states";
import "./ProviderAdd.css";

export default class ProviderAdd extends React.Component {
  static contextType = ApiContext;

  makeStatesListHTML = () => {
    const statesList = states.map((state) => {
      return <option value={state}>{state}</option>;
    });

    return <select id="hcp-address-state">{statesList}</select>;
  };

  handleAddProvider = (e) => {
    e.preventDefault();
    this.context.addProvider();
    this.props.history.push(`/providers`);
  };

  render() {
    return (
      <div className="ProviderAdd">
        <h1>Add a Health Care Provider</h1>
        <form className="ProviderAdd__form" id="add-provider-form">
          <h2>General Information</h2>
          <label for="hcp-type">Specialty</label>
          <input
            id="hcp-type"
            placeholder="(e.g., Primary Care Physician)"
            required
          ></input>
          <br />

          <label for="hcp-name">Name</label>
          <input
            id="hcp-name"
            placeholder="First and Last Name"
            required
          ></input>
          <br />

          <label for="hcp-location">Location</label>
          <input
            id="hcp-location"
            placeholder="Hospital or Facility Affiliation"
            required
          ></input>
          <br />

          <h2>Contact</h2>

          <label for="hcp-phone">Phone Number</label>
          <input
            id="hcp-phone"
            type="tel"
            placeholder="xxx-xxx-xxxx"
            required
          ></input>
          <br />
          <label for="hcp-address-street">Street Address</label>
          <input id="hcp-address-street" required></input>
          <br />

          <label for="hcp-address-city">City</label>
          <input id="hcp-address-city" required></input>

          <label for="hcp-address-state">State</label>
          {this.makeStatesListHTML()}

          <label for="hcp-address-zip">Zip Code</label>
          <input id="hcp-address-zip" required></input>
          <br />
          <br />
          <div className="ProviderAdd__button-container">
            <label for="add-provider__button-submit" />
            <button
              type="submit"
              className="ProviderAdd__button-submit"
              id="add-provider__button-submit"
              onClick={this.handleAddProvider}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
