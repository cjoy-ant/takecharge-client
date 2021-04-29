import React from "react";
import { Link } from "react-router-dom";
import ApiContext from "../ApiContext";
import config from "../config";
import PropTypes from "prop-types";
import Provider from "../Provider/Provider";
import "./ProviderPage.css";

export default class ProviderPage extends React.Component {
  state = {
    error: null,
    hcp_id: "",
    hcp_type: "",
    hcp_name: "",
    hcp_location: "",
    hcp_phone: "",
    hcp_address_street: "",
    hcp_address_city: "",
    hcp_address_state: "",
    hcp_address_zip: "",
    hcp_date_modified: "",
  };

  static contextType = ApiContext;

  componentDidMount() {
    const { provider_id } = this.props.match.params;
    fetch(`${config.API_ENDPOINT}/providers/${provider_id}`, {
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
          hcp_id: res.hcp_id,
          hcp_type: res.hcp_type,
          hcp_name: res.hcp_name,
          hcp_location: res.hcp_location,
          hcp_phone: res.hcp_phone,
          hcp_address_street: res.hcp_address_street,
          hcp_address_city: res.hcp_address_city,
          hcp_address_state: res.hcp_address_state,
          hcp_address_zip: res.hcp_address_zip,
          hcp_date_modified: res.hcp_date_modified,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  handleClickDelete = (e) => {
    e.preventDefault();
    const { provider_id } = this.props.match.params;

    if (
      window.confirm(
        "Are you sure you want to remove this provider?\nClick OK to remove."
      )
    ) {
      fetch(`${config.API_ENDPOINT}/providers/${provider_id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then(() => {
          this.context.deleteProvider(provider_id);
          this.props.history.push(`/providers`);
        })
        .catch((error) => {
          console.error(error);
          this.setState({ error });
        });
    }
  };

  render() {
    const {
      hcp_id,
      hcp_type,
      hcp_name,
      hcp_location,
      hcp_phone,
      hcp_address_street,
      hcp_address_city,
      hcp_address_state,
      hcp_address_zip,
    } = this.state;
    const encodedAddress = hcp_address_street.split(" ").join("+");
    const provider_id = hcp_id;

    return (
      <div className="ProviderPage">
        <div className="ProviderPage__provider">
          <Provider
            hcp_id={hcp_id}
            hcp_type={hcp_type}
            hcp_name={hcp_name}
            hcp_location={hcp_location}
            hcp_phone={hcp_phone}
            hcp_address_street={hcp_address_street}
            hcp_address_city={hcp_address_city}
            hcp_address_state={hcp_address_state}
            hcp_address_zip={hcp_address_zip}
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

ProviderPage.defaultProps = {
  match: {
    params: {}
  },
  history: {
    push: () => {}
  }
}

ProviderPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.object,
  }),
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
