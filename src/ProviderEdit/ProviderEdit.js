import React from "react";
import ApiContext from "../ApiContext";
import states from "../states";
import "./ProviderEdit.css";

export default class ProviderEdit extends React.Component {
  static contextType = ApiContext;

  state = {
    hcp_id: "",
    hcp_type: "",
    hcp_name: "",
    hcp_location: "",
    hcp_phone: "",
    hcp_address_street: "",
    hcp_address_city: "",
    hcp_address_state: "",
    hcp_address_zip: "",
  };

  componentDidMount() {
    const { providers } = this.context;
    const { provider_id } = this.props.match.params;
    const findProvider = (providers, provider_id) =>
      providers.find((provider) => provider.hcp_id === Number(provider_id));
    const provider = findProvider(providers, provider_id);

    this.setState({
      hcp_id: provider.hcp_id,
      hcp_type: provider.hcp_type,
      hcp_name: provider.hcp_name,
      hcp_location: provider.hcp_location,
      hcp_phone: provider.hcp_phone,
      hcp_address_street: provider.hcp_address_street,
      hcp_address_city: provider.hcp_address_city,
      hcp_address_state: provider.hcp_address_state,
      hcp_address_zip: provider.hcp_address_zip,
    });
  }

  makeStatesListHTML = () => {
    const statesList = states.map((state) => {
      return (
        <option key={state} value={state}>
          {state}
        </option>
      );
    });

    return statesList;
  };

  handleChangeType = (e) => {
    this.setState({
      hcp_type: e.target.value,
    });
  };

  handleChangeName = (e) => {
    this.setState({
      hcp_name: e.target.value,
    });
  };

  handleChangeLocation = (e) => {
    this.setState({
      hcp_location: e.target.value,
    });
  };

  handleChangePhone = (e) => {
    this.setState({
      hcp_phone: e.target.value,
    });
  };

  handleChangeStreet = (e) => {
    this.setState({
      hcp_address_street: e.target.value,
    });
  };

  handleChangeCity = (e) => {
    this.setState({
      hcp_address_city: e.target.value,
    });
  };

  handleChangeState = (e) => {
    this.setState({
      hcp_address_state: e.target.value,
    });
  };

  handleChangeZip = (e) => {
    this.setState({
      hcp_address_zip: e.target.value,
    });
  };

  handleClickCancel = () => {
    const { provider_id } = this.props.match.params;
    this.props.history.push(`/providers/${provider_id}`);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const updatedProvider = {
      hcp_id: this.state.hcp_id,
      hcp_type: this.state.hcp_type,
      hcp_name: this.state.hcp_name,
      hcp_location: this.state.hcp_location,
      hcp_phone: this.state.hcp_phone,
      hcp_address_street: this.state.hcp_address_street,
      hcp_address_city: this.state.hcp_address_city,
      hcp_address_state: this.state.hcp_address_state,
      hcp_address_zip: this.state.hcp_address_zip,
    };

    this.context.editProvider(updatedProvider);
    this.props.history.push(`/providers/${updatedProvider.hcp_id}`);
  };

  render() {
    const { providers } = this.context;
    const { provider_id } = this.props.match.params;
    const findProvider = (providers, provider_id) =>
      providers.find((provider) => provider.hcp_id === Number(provider_id));
    const provider = findProvider(providers, provider_id);

    return (
      <div className="ProviderEdit">
        <h1>Edit Provider Information</h1>
        <form
          className="ProviderEdit__form"
          id="edit-provider-form"
          onSubmit={this.handleSubmit}
        >
          <h2>General Information</h2>
          <label htmlFor="hcp-type">Specialty</label>
          <input
            id="hcp-type"
            defaultValue={provider.hcp_type}
            onChange={this.handleChangeType}
            required
          ></input>
          <br />

          <label htmlFor="hcp-name">Name</label>
          <input
            id="hcp-name"
            defaultValue={provider.hcp_name}
            onChange={this.handleChangeName}
            required
          ></input>
          <br />

          <label htmlFor="hcp-location">Location</label>
          <input
            id="hcp-location"
            defaultValue={provider.hcp_location}
            onChange={this.handleChangeLocation}
            required
          ></input>
          <br />

          <h2>Contact</h2>

          <label htmlFor="hcp-phone">Phone Number</label>
          <input
            id="hcp-phone"
            type="tel"
            defaultValue={provider.hcp_phone}
            onChange={this.handleChangePhone}
            required
          ></input>
          <br />

          <label htmlFor="hcp-address-street">Address</label>
          <input
            id="hcp-address-street"
            defaultValue={provider.hcp_address_street}
            onChange={this.handleChangeStreet}
            required
          ></input>
          <br />

          <label htmlFor="hcp-address-city">City</label>
          <input
            id="hcp-address-city"
            defaultValue={provider.hcp_address_city}
            onChange={this.handleChangeCity}
            required
          ></input>

          <label htmlFor="hcp-address-state">State</label>
          <select
            id="hcp-address-state"
            defaultValue={provider.hcp_address_state}
            onChange={this.handleChangeStreet}
          >
            {this.makeStatesListHTML()}
          </select>

          <label htmlFor="hcp-address-zip">Zip Code</label>
          <input
            id="hcp-address-zip"
            defaultValue={provider.hcp_address_zip}
            onChange={this.handleChangeZip}
            required
          ></input>
          <br />
          <br />

          <div className="ProviderEdit__button-container">
            <button
              type="button"
              id="cancel-add-provider__button"
              onClick={this.handleClickCancel}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="ProviderEdit__button-submit"
              id="edit-provider__button-submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    );
  }
}
