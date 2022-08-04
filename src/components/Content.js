import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import Search from '../pages/Search';
import Album from '../pages/Album';
import Favorites from '../pages/Favorites';
import Profile from '../pages/Profile';
import ProfileEdit from '../pages/ProfileEdit';
import NotFound from '../pages/NotFound';
import Loading from './Loading';

class Content extends React.Component {
  constructor() {
    super();
    this.loadingStarted = this.loadingStarted.bind(this);
    this.loadingEnded = this.loadingEnded.bind(this);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    this.loadingEnded();
  }

  loadingStarted() {
    this.setState({ loading: true });
  }

  loadingEnded() {
    this.setState({ loading: false });
  }

  render() {
    const { loading } = this.state;

    return (
      <div>
        {loading && <Loading />}
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" component={ Album } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route path="/" component={ NotFound } />
        </Switch>
      </div>
    );
  }
}

export default Content;
