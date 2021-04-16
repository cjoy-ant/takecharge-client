import React from "react";
import { Link } from "react-router-dom";
import ApiContext from "../ApiContext";
import Provider from "../Provider/Provider";
import "./ProvidersList.css";

export default class ProvidersList extends React.Component {
  static contextType = ApiContext;

  makeProvidersList = () => {
    const providersList = this.context.providers.map((provider) => {
      const encodedAddress = provider.hcp_address_street.split(" ").join("+");
      return (
        <li key={provider.hcp_id} id={provider.hcp_id}>
          <Provider
            hcp_id={provider.hcp_id}
            hcp_type={provider.hcp_type}
            hcp_name={provider.hcp_name}
            hcp_location={provider.hcp_location}
            hcp_phone={provider.hcp_phone}
            hcp_address_street={provider.hcp_address_street}
            hcp_address_city={provider.hcp_address_city}
            hcp_address_state={provider.hcp_address_state}
            hcp_address_zip={provider.hcp_address_zip}
            encodedAddress={encodedAddress}
          />
        </li>
      );
    });

    return providersList;
  };

  render() {
    return (
      <div className="ProvidersList">
        <h2>Your Health Care Providers</h2>
        <div className="ProvidersList__button-add">
          <Link to="/add-provider">
            <button className="ProvidersList__button-add">Add Provider</button>
          </Link>
        </div>
        <ul id="ProvidersList">{this.makeProvidersList()}</ul>
      </div>
    );
  }
}
