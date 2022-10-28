import './App.css';  // using the css
import {React} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// ** functions not implemented
// import { AuthContextProvider } from './auth';
// import { GlobalStoreContextProvider } from './store'


// ** components no implemented
const App = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>              
                    <AppBanner />
                    <Switch>
                        <Route path="/" exact component={HomeWrapper} />
                        <Route path="/register/" exact component={RegisterScreen} />
                        <Route path="/login/" exact component={LoginScreen} />
                    </Switch>
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App