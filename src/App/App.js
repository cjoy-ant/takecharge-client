import React, { Component } from "react";
import { Route } from "react-router-dom";
// import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import ApiContext from "../ApiContext";
// import STORE from "../STORE";
// import ThemeContext from "../ThemeContext";
// import LanguageContenxt from "../LanguageContext";
import config from "../config";
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
    Promise.all([
      fetch(`${config.API_ENDPOINT}/providers`),
      fetch(`${config.API_ENDPOINT}/recommendations`),
      fetch(`${config.API_ENDPOINT}/visits`),
    ])
      .then(([providersRes, recommendationsRes, visitsRes]) => {
        if (!providersRes.ok) {
          return providersRes.json().then((e) => Promise.reject(e));
        }
        if (!recommendationsRes.ok) {
          return recommendationsRes.json().then((e) => Promise.reject(e));
        }
        if (!visitsRes.ok) {
          return visitsRes.json().then((e) => Promise.reject(e));
        }
        return Promise.all([
          providersRes.json(),
          recommendationsRes.json(),
          visitsRes.json(),
        ]);
      })
      .then(([providers, recommendations, visits]) => {
        this.setState({ providers, recommendations, visits });
      })
      .catch((error) => {
        console.error({ error });
      });
  }

  // FETCH functions (for any changes to database)

  fetchProviders = () => {
    fetch(`${config.API_ENDPOINT}/providers`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((res) => {
        this.setState({
          providers: res,
        });
      });
  };

  fetchRecommendations = () => {
    fetch(`${config.API_ENDPOINT}/recommendations`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((res) => {
        this.setState({
          recommendations: res,
        });
      });
  };

  fetchVisits = () => {
    fetch(`${config.API_ENDPOINT}/visits`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        return res.json();
      })
      .then((res) => {
        this.setState({
          visits: res,
        });
      });
  };

  // PROVIDERS events
  addProvider = (newProvider) => {
    this.fetchProviders();
  };

  deleteProvider = (provider_id) => {
    this.fetchProviders();
  };

  editProvider = (updatedProvider) => {
    this.fetchProviders();
  };

  // RECOMMENDATIONS events
  addRecommendation = (newRecommendation) => {
    this.fetchRecommendations();
  };

  deleteRecommendation = (rec_id) => {
    this.fetchRecommendations();
  };

  editRecommendation = (updatedRecommendation) => {
    this.fetchRecommendations();
  };

  // VISITS events
  addVisit = (newVisit) => {
    this.fetchVisits();
  };

  deleteVisit = (visit_id) => {
    this.fetchVisits();
  };

  editVisit = (updatedVisit) => {
    this.fetchVisits();
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
