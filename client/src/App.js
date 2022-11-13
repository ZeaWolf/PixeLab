import './App.css';  // using the css
import {React} from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

// ** functions not implemented
import { AuthContextProvider } from './auth';
import { GlobalStoreContextProvider } from './store'
import {
    AppBanner,
    WelcomeScreen,
    RegisterScreen,
    LoginScreen,
    NavigationBar,
    HomeScreen,
    CommunityScreen,
    MapScreen,
    TilesetScreen,
    ResourceScreen,
    WindowDialog,
    ForgotPasswordScreen,
    ResetPasswordScreen,
} from './components'

// ** components no implemented
const App = () => {
    return (
        <BrowserRouter>
            <AuthContextProvider>
                <GlobalStoreContextProvider>              
                    <AppBanner />
                    <Switch>
                        <Route path="/" exact component={WelcomeScreen} />
                        <Route path="/register/" exact component={RegisterScreen} />
                        <Route path="/login/" exact component={LoginScreen} />
                        <Route path="/home/" exact component={HomeScreen}/>
                        <Route path="/community/" exact component={CommunityScreen} />
                        <Route path="/tileset-editor/" exact component={TilesetScreen} />
                        <Route path="/resource/" exact component={ResourceScreen} />
                        <Route path="/map/" exact component={MapScreen} />
                        <Route path='/window-dialog' exact component={WindowDialog} />
                        <Route path='/forgot-password' exact component={ForgotPasswordScreen} />
                        <Route path='/reset-password' exact component={ResetPasswordScreen} />
                    </Switch>
                </GlobalStoreContextProvider>
            </AuthContextProvider>
        </BrowserRouter>
    )
}

export default App