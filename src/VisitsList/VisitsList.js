import React from "react";
import { Link } from "react-router-dom";
import ApiContext from "../ApiContext";
import Visit from "../Visit/Visit";
import "./VisitsList.css";
import { formatWithOptions } from "date-fns/fp";

export default class VisitsList extends React.Component {
  static contextType = ApiContext;

  makeVisitsList = () => {
    const visitsList = this.context.visits.map((visit) => {
      return (
        <li id={visit.visit_id}>
          <Visit
            visit_id={visit.visit_id}
            visit_type={visit.visit_type}
            visit_provider_name={visit.visit_provider_name}
            visit_location={visit.visit_location}
            visit_date={visit.visit_date}
            visit_reason={visit.visit_reason}
            visit_notes={visit.visit_notes}
          />
        </li>
      );
    });

    return visitsList;
  };

  render() {
    return (
      <div className="VisitsList">
        <h2>Your Visits</h2>
        <div className="VisitsList__button-add">
          <Link to="/add-visit">
            <button className="VisitsList__button-add">Add a Visit</button>
          </Link>
        </div>
        <ul id="VisitsList">{this.makeVisitsList()}</ul>
      </div>
    );
  }
}
