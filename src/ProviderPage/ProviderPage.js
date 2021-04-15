import React from "react";
import { Link } from "react-router-dom";
import ApiContext from "../ApiContext";
import Provider from "../Provider/Provider";
import "./ProviderPage.css";

export default class ProviderPage extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };

  static contextType = ApiContext;

  handleClickDelete = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to remove this provider?\nClick OK to remove."
      )
    ) {
      const { provider_id } = this.props.match.params;
      this.context.deleteProvider(provider_id);
      this.props.history.push(`/providers`);
    }
  };

  render() {
    const { providers } = this.context;
    const { provider_id } = this.props.match.params;
    const findProvider = (providers, provider_id) =>
      providers.find((provider) => provider.hcp_id == provider_id);
    const provider = findProvider(providers, provider_id);
    const encodedAddress = provider.hcp_address_street.split(" ").join("+");

    return (
      <div className="ProviderPage">
        <div className="Provider">
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
        </div>
        <div className="ProviderPage__buttons">
          <Link to={`/edit-provider/${provider_id}`}>
            <button>Edit</button>
          </Link>
          <button
            className="Provider__button-delete"
            id="delete-provider__button"
            onClick={this.handleClickDelete}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }
}
