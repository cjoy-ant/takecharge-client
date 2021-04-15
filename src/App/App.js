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

  componentDidMount() {
    this.fetchProviders();
    this.fetchVisits();
    this.fetchRecommendations();
  }

  fetchProviders = () => {
    this.setState({
      providers: STORE.providers,
    });
  };

  fetchVisits = () => {
    this.setState({
      visits: STORE.visits,
    });
  };

  fetchRecommendations = () => {
    this.setState({
      recommendations: STORE.recommendations,
    });
  };

  // PROVIDERS event handlers
  handleAddProvider = () => {};

  handleDeleteProvider = () => {};

  handleEditProvider = () => {};

  // VISITS event handlers
  handleAddVisit = () => {};

  handleDeleteVisit = () => {};

  handleEditVisit = () => {};

  // RECOMMENDATIONS event handlers
  handleAddRecommendation = () => {};

  handleDeleteRecommendation = () => {};

  handleEditRecommendation = () => {};

  render() {
    const value = {
      providers: this.state.providers,
      visits: this.state.visits,
      recommendations: this.state.recommendations,
      addProvider: this.handleAddProvider,
      deleteProvider: this.handleDeleteProvider,
      editProvider: this.handleEditProvider,
      addVisit: this.handleAddVisit,
      deleteVisit: this.handleDeleteVisit,
      editVisit: this.handleEditVisit,
      addRecommendation: this.handleAddRecommendation,
      deleteRecommendation: this.handleDeleteRecommendation,
      editRecommendation: this.handleEditRecommendation,
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
