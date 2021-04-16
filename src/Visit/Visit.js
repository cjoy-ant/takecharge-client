import React from "react";
import { Link } from "react-router-dom";
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
          <Link to={`/visits/${visit_id}`}>{visit_type}</Link>
        </span>
        <br />
        <span className="Visit__information">Provider: </span>
        {visit_provider_name}
        <br />
        <span className="Visit__information">Location: </span>
        {visit_location}
        <br />
        <span className="Visit__information">Date {"&"} Time:</span>{" "}
        {visit_date}
        <br />
        <span className="Visit__information">Reason for visit:</span>{" "}
        {visit_reason}
        <br />
        <span className="Visit__information">Notes:</span> {visit_notes}
      </div>
    );
  }
}
