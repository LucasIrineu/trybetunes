import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';
import Loading from '../components/Loading';

class Login extends React.Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.onLoginButtonClick = this.onLoginButtonClick.bind(this);
    this.loadingStarted = this.loadingStarted.bind(this);
    this.loadingEnded = this.loadingEnded.bind(this);

    this.state = {
      name: '',
      isLoginButtonDisabled: true,
      loading: true,
    };
  }

  componentDidMount() {
    this.loadingEnded();
  }

  handleLoginButtonDisable() {
    const { name } = this.state;
    const NAME_MIN_LENGTH = 3;

    if (name.length >= NAME_MIN_LENGTH) {
      this.setState({ isLoginButtonDisabled: false });
    } else {
      this.setState({ isLoginButtonDisabled: true });
    }
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => {
      this.handleLoginButtonDisable();
    });
  }

  async onLoginButtonClick(event) {
    event.preventDefault();

    const { name } = this.state;
    const { history } = this.props;
    const { push } = history;

    this.loadingStarted();
    await createUser({ name });
    this.loadingEnded();
    push('/search');
  }

  loadingStarted() {
    this.setState({ loading: true });
  }

  loadingEnded() {
    this.setState({ loading: false });
  }

  render() {
    const { name, isLoginButtonDisabled, loading } = this.state;

    return (
      <section>
        {loading && <Loading />}

        <div data-testid="page-login">
          <form>
            <label htmlFor="input-name">
              <input
                type="text"
                data-testid="login-name-input"
                id="input-name"
                name="name"
                placeholder="Name"
                value={ name }
                onChange={ this.onInputChange }
              />
            </label>
            <button
              type="submit"
              data-testid="login-submit-button"
              disabled={ isLoginButtonDisabled }
              onClick={ this.onLoginButtonClick }
            >
              Entrar
            </button>
          </form>
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Login;
