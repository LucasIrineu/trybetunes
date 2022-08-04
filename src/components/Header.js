import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      userName: '',
      loading: true,
    };
  }

  componentDidMount() {
    this.getUserName();
  }

  async getUserName() {
    this.loadingStarted();
    const userData = await getUser();
    const { name } = userData;
    this.setState({ userName: name });
    this.loadingEnded();
  }

  loadingStarted() {
    this.setState({ loading: true });
  }

  loadingEnded() {
    this.setState({ loading: false });
  }

  render() {
    const { userName, loading } = this.state;
    return (
      <header data-testid="header-component">
        {loading && <Loading />}
        <h3 data-testid="header-user-name">
          { userName }
        </h3>
      </header>
    );
  }
}

export default Header;
