import React from "react";
import { Link } from "react-router-dom";
import ApiContext from "../ApiContext";
import config from "../config";
import Visit from "../Visit/Visit";
import "./VisitPage.css";

export default class VisitPage extends React.Component {
  static defaultProps = {
    match: {
      params: {},
    },
  };

  state = {
    error: null,
    visit_id: "",
    visit_type: "",
    visit_provider_name: "",
    visit_location: "",
    visit_date: "",
    visit_reason: "",
    visit_notes: "",
    visit_date_modified: "",
  };

  static contextType = ApiContext;

  componentDidMount() {
    const { visit_id } = this.props.match.params;
    fetch(`${config.API_ENDPOINT}/visits/${visit_id}`, {
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
          visit_id: res.visit_id,
          visit_type: res.visit_type,
          visit_provider_name: res.visit_provider_name,
          visit_location: res.visit_location,
          visit_date: res.visit_date,
          visit_reason: res.visit_reason,
          visit_notes: res.visit_notes,
          visit_date_modified: res.visit_date_modified,
        });
      })
      .catch((error) => {
        console.error(error);
        this.setState({ error });
      });
  }

  handleClickDelete = (e) => {
    e.preventDefault();
    if (
      window.confirm(
        "Are you sure you want to remove this visit?\nClick OK to remove."
      )
    ) {
      const { visit_id } = this.props.match.params;
      fetch(`${config.API_ENDPOINT}/visits/${visit_id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then(() => {
          this.context.deleteVisit(visit_id);
          this.props.history.push(`/visits`);
        })
        .catch((error) => {
          console.error(error);
          this.setState({ error });
        });
    }
  };

  render() {
    const {
      visit_id,
      visit_type,
      visit_provider_name,
      visit_location,
      visit_date,
      visit_reason,
      visit_notes,
    } = this.state;

    const vis_id = visit_id;

    return (
      <div className="VisitPage">
        <div className="Visit">
          <Visit
            visit_id={visit_id}
            visit_type={visit_type}
            visit_provider_name={visit_provider_name}
            visit_location={visit_location}
            visit_date={visit_date}
            visit_reason={visit_reason}
            visit_notes={visit_notes}
          />
        </div>
        <div className="VisitPage__buttons">
          <Link to={`/edit-visit/${vis_id}`}>
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
