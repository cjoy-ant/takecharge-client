import React from "react";
import { Link } from "react-router-dom";
import ApiContext from "../ApiContext";
import Visit from "../Visit/Visit";
import "./VisitPage.css";

export default class VisitPage extends React.Component {
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
        "Are you sure you want to remove this visit?\nClick OK to remove."
      )
    ) {
      const { visit_id } = this.props.match.params;
      this.context.deleteVisit(visit_id);
      this.props.history.push(`/visits`);
    }
  };

  render() {
    const { visits } = this.context;
    const { visit_id } = this.props.match.params;
    const findVisit = (visits, visit_id) =>
      visits.find((visit) => visit.visit_id == visit_id);
    const visit = findVisit(visits, visit_id);

    return (
      <div className="VisitPage">
        <div className="Visit">
          <Visit
            visit_id={visit.visit_id}
            visit_type={visit.visit_type}
            visit_provider_name={visit.visit_provider_name}
            visit_location={visit.visit_location}
            visit_date={visit.visit_date}
            visit_reason={visit.visit_reason}
            visit_notes={visit.visit_notes}
          />
        </div>
        <div className="VisitPage__buttons">
          <Link to={`/edit-visit/${visit_id}`}>
            <button>Edit</button>
          </Link>
          <button
            className="Visit__button-delete"
            id="delete-visit__button"
            onClick={this.handleClickDelete}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }
}
