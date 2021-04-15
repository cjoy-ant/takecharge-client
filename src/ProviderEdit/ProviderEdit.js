import React from "react";
import ApiContext from "../ApiContext";
import states from "../states";
import "./ProviderEdit.css";

export default class ProviderEdit extends React.Component {
  static contextType = ApiContext;

  makeStatesListHTML = () => {
    const statesList = states.map((state) => {
      return <option value={state}>{state}</option>;
    });

    return statesList;
  };

  handleEditProvider = (provider_id) => {
    this.context.editProvider(provider_id);
    this.props.history.push(`/providers`);
  };

  render() {
    const { providers } = this.context;
    const { provider_id } = this.props.match.params;
    const findProvider = (providers, provider_id) =>
      providers.find((provider) => provider.hcp_id == provider_id);
    const provider = findProvider(providers, provider_id);

    return (
      <div className="ProviderEdit">
        <h1>Edit Provider Information</h1>
        <form className="ProviderEdit__form" id="edit-provider-form">
          <h2>General Information</h2>
          <label for="hcp-type">Specialty</label>
          <input id="hcp-type" value={provider.hcp_type} required></input>
          <br />

          <label for="hcp-name">Name</label>
          <input id="hcp-name" value={provider.hcp_name} required></input>
          <br />

          <label for="hcp-location">Location</label>
          <input
            id="hcp-location"
            value={provider.hcp_location}
            required
          ></input>
          <br />

          <h2>Contact</h2>

          <label for="hcp-phone">Phone Number</label>
          <input
            id="hcp-phone"
            type="tel"
            value={provider.hcp_phone}
            required
          ></input>
          <br />

          <label for="hcp-address-street">Address</label>
          <input
            id="hcp-address-street"
            value={provider.hcp_address_street}
            required
          ></input>
          <br />

          <label for="hcp-address-city">City</label>
          <input
            id="hcp-address-city"
            value={provider.hcp_address_city}
            required
          ></input>

          <label for="hcp-address-state">State</label>
          <select id="hcp-address-state" value={provider.hcp_address_state}>
            {this.makeStatesListHTML()}
          </select>

          <label for="hcp-address-zip">Zip Code</label>
          <input
            id="hcp-address-zip"
            value={provider.hcp_address_zip}
            required
          ></input>
          <br />
          <br />

          <div className="ProviderEdit__button-container">
            <label for="ProviderEdit__button-submit" />
            <button
              type="submit"
              id="edit-provider__button-submit"
              onClick={this.handleEditProvider}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
