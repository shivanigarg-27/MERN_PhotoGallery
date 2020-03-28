
import React, {Component, createContext, useContext} from 'react';
import createAuth0Client from '@auth0/auth0-spa-js'


//create context
export const AuthContext = createContext();
export const useAuth0 = () => useContext(AuthContext);

//create provider
export class AuthProvider extends Component {
    state = {
        auth0Client : null,
        isLoading : true,
        isAuthenticated : false,
        user : null
    }

    config = {
        domain: process.env.REACT_APP_AUTH0_DOMAIN,
        client_id: process.env.REACT_APP_AUTH0_CLIENT_ID,
        redirect_uri: window.location.origin
    }

    componentDidMount() {
        this.initilizeAuth0()
    }

    handleRedirectCallback = async() => {
        this.setState({ isLoading : true })
        await this.state.auth0Client.handleRedirectCallback();
        const user = await this.state.auth0Client.getUser();

        this.setState({
            user,
            isAuthenticated: true,
            isLoading: false
        })

        window.history.replaceState({}, document.title, window.location.pathname)
        console.log(this.state.user)
    }

    initilizeAuth0 = async () => {
        const auth0Client = await createAuth0Client(this.config);
        this.setState({auth0Client})

        if(window.location.search.includes('code=')) {
            return this.handleRedirectCallback();
        }

        const isAuthenticated = await auth0Client.isAuthenticated();
        const user = isAuthenticated ? await auth0Client.getUser() : null;
        this.setState({
                auth0Client,
                isLoading : false,
                isAuthenticated,
                user
            })
    }

    render() {
        const { children } = this.props;
        const { auth0Client, isLoading, isAuthenticated, user } = this.state;

        const configObject = { 
            isLoading, 
            isAuthenticated, 
            user,
            loginWithRedirect : (...p) => auth0Client.loginWithRedirect(...p),
            getTokenSilently : (...p) => auth0Client.getTokenSilently(...p),
            getIdTokenClaims : (...p) => auth0Client.getIdTokenClaims(...p),
            logout : (...p) => auth0Client.logout(...p)
         };

        return (
            <AuthContext.Provider value={configObject}>
                {children}
            </AuthContext.Provider>
        )
    }
}

