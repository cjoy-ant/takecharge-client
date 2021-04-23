import React from "react";
import { Link } from "react-router-dom";
import ApiContext from "../ApiContext";
import PropTypes from "prop-types";
import "./Provider.css";

export default class Provider extends React.Component {
  static contextType = ApiContext;

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
      encodedAddress,
    } = this.props;

    return (
      <div className="Provider">
        {" "}
        <h3>
          <Link to={`/providers/${hcp_id}`}>{hcp_type}</Link>
        </h3>
        {hcp_name}
        <br />
        {hcp_location}
        <br />
        <a href={`tel: ${hcp_phone}`}>{hcp_phone}</a>
        <br />
        <br />
        <span className="hcp_address">Address</span>
        <br />
        {hcp_address_street}
        <br />
        {hcp_address_city}, {hcp_address_state} {hcp_address_zip}
        <br />
        <br />
        <a
          target="_blank"
          rel="noreferrer"
          href={`https://www.google.com/maps/place/${encodedAddress}+${hcp_address_city}+${hcp_address_state}+${hcp_address_zip}`}
        >
          Directions
        </a>
      </div>
    );
  }
}

Provider.defaultProps = {
  hcp_id: "",
  hcp_type: "",
  hcp_name: "",
  hcp_location: "",
  hcp_phone: "",
  hcp_address_street: "",
  hcp_address_city: "",
  hcp_address_state: "",
  hcp_address_zip: "",
  encodedAddress: "",
};

Provider.propTypes = {
  hcp_id: PropTypes.string.isRequired,
  hcp_type: PropTypes.string.isRequired,
  hcp_name: PropTypes.string.isRequired,
  hcp_location: PropTypes.string.isRequired,
  hcp_phone: PropTypes.string.isRequired,
  hcp_address_street: PropTypes.string.isRequired,
  hcp_address_city: PropTypes.string.isRequired,
  hcp_address_state: PropTypes.string.isRequired,
  hcp_address_zip: PropTypes.string.isRequired,
  encodedAddress: PropTypes.string.isRequired,
};
