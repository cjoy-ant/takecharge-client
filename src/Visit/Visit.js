import React from "react";
import { format } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Visit.css";

export default class Visit extends React.Component {
  render() {
    const {
      visit_id,
      visit_type,
      visit_provider_name,
      visit_location,
      visit_date,
      visit_reason,
      visit_notes,
    } = this.props;

    return (
      <div className="Visit">
        <span className="Visit__title">
          <Link to={`/visits/${visit_id}`}><h3>{visit_type}</h3></Link>
        </span>
        <br />
        <span className="Visit__information">Provider: </span>
        {visit_provider_name}
        <br />
        <span className="Visit__information">Location: </span>
        {visit_location}
        <br />
        <span className="Visit__information">Date {"&"} Time:</span>{" "}
        {format(utcToZonedTime(visit_date), "MMMM d, yyyy")} at{" "}
        {format(utcToZonedTime(visit_date), "hh:mm aaaa")}
        <br />
        <span className="Visit__information">Reason for visit:</span>{" "}
        {visit_reason}
        <br />
        <span className="Visit__information">Notes:</span> {visit_notes}
      </div>
    );
  }
}

Visit.defaultProps = {
  visit_id: "",
  visit_type: "",
  visit_provider_name: "",
  visit_location: "",
  visit_date: "",
  visit_reason: "",
  visit_notes: "",
};

Visit.propTypes = {
  visit_id: PropTypes.string.isRequired,
  visit_type: PropTypes.string.isRequired,
  visit_provider_name: PropTypes.string.isRequired,
  visit_location: PropTypes.string.isRequired,
  visit_date: PropTypes.string.isRequired,
  visit_reason: PropTypes.string.isRequired,
  visit_notes: PropTypes.string.isRequired,
};
