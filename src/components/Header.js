import React from 'react';
import { Link } from 'react-router-dom';
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
        <ul>
          <li>
            <Link to="/search" data-testid="link-to-search">
              Pesquisar
            </Link>
          </li>
          <li>
            <Link to="/favorites" data-testid="link-to-favorites">
              Favoritos
            </Link>
          </li>
          <li>
            <Link to="/profile" data-testid="link-to-profile">
              Perfil
            </Link>
          </li>
        </ul>
      </header>
    );
  }
}

export default Header;
