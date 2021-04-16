import React, { Component } from "react";
import { Route } from "react-router-dom";
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ApiContext from "../ApiContext";
import STORE from "../STORE";
// import ThemeContext from "../ThemeContext";
// import LanguageContenxt from "../LanguageContext";
// import config from "../config";
// import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Nav from "../Nav/Nav";
import Home from "../Home/Home";
import About from "../About/About";
import ProvidersList from "../ProvidersList/ProvidersList";
import ProviderPage from "../ProviderPage/ProviderPage";
import ProviderAdd from "../ProviderAdd/ProviderAdd";
import ProviderEdit from "../ProviderEdit/ProviderEdit";
import VisitsList from "../VisitsList/VisitsList";
import VisitPage from "../VisitPage/VisitPage";
import VisitAdd from "../VisitAdd/VisitAdd";
import VisitEdit from "../VisitEdit/VisitEdit";
import RecommendationsList from "../RecommendationsList/RecommendationsList";
import RecommendationPage from "../RecommendationPage/RecommendationPage";
import RecommendationAdd from "../RecommendationAdd/RecommendationAdd";
import RecommendationEdit from "../RecommendationEdit/RecommendationEdit";
import "./App.css";

class App extends Component {
  state = {
    providers: [],
    visits: [],
    recommendations: [],
  };

  setInitialState = () => {
    this.setState({
      providers: STORE.providers,
      visits: STORE.visits,
      recommendations: STORE.recommendations,
    });
  };

  componentDidMount() {
    this.setInitialState();
  }

  // PROVIDERS events
  addProvider = (newProvider) => {
    this.setState({
      providers: [...this.state.providers, newProvider],
    });
  };

  deleteProvider = (provider_id) => {
    const newProviders = this.state.providers.filter(
      (p) => p.hcp_id !== provider_id
    );
    this.setState({
      providers: newProviders,
    });
  };

  editProvider = (updatedProvider) => {
    // this.setState({
    //   providers: this.state.providers.map((p) =>
    //     p.hcp_id !== updatedProvider.hcp_id ? p : updatedProvider
    //   ),
    // });
  };

  // VISITS events
  addVisit = (newVisit) => {
    this.setState({
      visits: [...this.state.visits, newVisit],
    });
  };

  deleteVisit = (visit_id) => {
    const newVisits = this.state.visits.filter((v) => v.visit_id !== visit_id);
    this.setState({
      visits: newVisits,
    });
  };

  editVisit = (updatedVisit) => {
    // this.setState({
    //   visits: this.state.visits.map((v) =>
    //     v.visit_id !== updatedVisit.visit_id ? v : updatedVisit
    //   ),
    // });
  };

  // RECOMMENDATIONS events
  addRecommendation = (newRecommendation) => {
    this.setState({
      recommendations: [...this.state.recommendations, newRecommendation],
    });
  };

  deleteRecommendation = (rec_id) => {
    const newRecommendations = this.state.recommendations.filter(
      (r) => r.recommendation_id !== rec_id
    );
    this.setState({
      recommendations: newRecommendations,
    });
  };

  editRecommendation = (updatedRecommendation) => {
    // this.setState({
    //   recommendations: this.state.recommendations.map((r) =>
    //     r.recommendation_id !== updatedRecommendation.recommendation_id
    //       ? r
    //       : updatedRecommendation
    //   ),
    // });
  };

  render() {
    const value = {
      providers: this.state.providers,
      visits: this.state.visits,
      recommendations: this.state.recommendations,
      addProvider: this.addProvider,
      deleteProvider: this.deleteProvider,
      editProvider: this.editProvider,
      addVisit: this.addVisit,
      deleteVisit: this.deleteVisit,
      editVisit: this.editVisit,
      addRecommendation: this.addRecommendation,
      deleteRecommendation: this.deleteRecommendation,
      editRecommendation: this.editRecommendation,
    };

    return (
      <ApiContext.Provider value={value}>
        <div className="App">
          <Route path="/" component={Nav} />
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/providers" component={ProvidersList} />
          <Route path="/providers/:provider_id" component={ProviderPage} />
          <Route exact path="/add-provider" component={ProviderAdd} />
          <Route path="/edit-provider/:provider_id" component={ProviderEdit} />
          <Route exact path="/visits" component={VisitsList} />
          <Route path="/visits/:visit_id" component={VisitPage} />
          <Route exact path="/add-visit" component={VisitAdd} />
          <Route path="/edit-visit/:visit_id" component={VisitEdit} />
          <Route
            exact
            path="/recommendations"
            component={RecommendationsList}
          />
          <Route
            path="/recommendations/:rec_id"
            component={RecommendationPage}
          />
          <Route
            exact
            path="/add-recommendation"
            component={RecommendationAdd}
          />
          <Route
            path="/edit-recommendation/:rec_id"
            component={RecommendationEdit}
          />
        </div>
      </ApiContext.Provider>
    );
  }
}

export default App;
