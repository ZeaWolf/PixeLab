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
    NavigationBar,
    HomeScreen,
    CommunityScreen,
    MapScreen,
    TilesetScreen,
    ResourceScreen
} from './components'

// ** components no implemented
const App = () => {
    return (
        <BrowserRouter>
            {/* <AuthContextProvider>
                <GlobalStoreContextProvider>               */}
                    <AppBanner />
                    {/* <NavigationBar/> */}
                    <Switch>
                        <Route path="/" exact component={WelcomeScreen} />
                        <Route path="/register/" exact component={RegisterScreen} />
                        <Route path="/login/" exact component={LoginScreen} />
                        <Route path="/home/" exact component={HomeScreen}/>
                        <Route path="/community/" exact component={CommunityScreen} />
                        <Route path="/tileset-editor/" exact component={TilesetScreen} />
                        <Route path="/resource/" exact component={ResourceScreen} />
                        <Route path="/map/" exact component={MapScreen} />
                    </Switch>
                {/* </GlobalStoreContextProvider>
            </AuthContextProvider> */}
        </BrowserRouter>
    )
}

export default App