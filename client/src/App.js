import './App.css';  // using the css
import {React} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// ** functions not implemented
// import { AuthContextProvider } from './auth';
// import { GlobalStoreContextProvider } from './store'
import {
    AppBanner,
    WelcomeScreen,
    RegisterScreen,
    LoginScreen,
    CommunityScreen
} from './components'

// ** components no implemented
const App = () => {
    return (
        <BrowserRouter>
            {/* <AuthContextProvider>
                <GlobalStoreContextProvider>               */}
                    <AppBanner />
                    <Switch>
                        <Route path="/" exact component={WelcomeScreen} />
                        <Route path="/register/" exact component={RegisterScreen} />
                        <Route path="/login/" exact component={LoginScreen} />
                        <Route path="/community/" exact component={CommunityScreen} />
                    </Switch>
                {/* </GlobalStoreContextProvider>
            </AuthContextProvider> */}
        </BrowserRouter>
    )
}

export default App