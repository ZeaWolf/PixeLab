import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
// import EditToolbar from './EditToolbar'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import Avatar from '@mui/material/Avatar';

export default function AppBanner() {
    const { auth } = useContext(AuthContext);
    const { store } = "store";
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        handleMenuClose();
        auth.logoutUser(store);
    }

    const menuId = 'primary-search-account-menu';

    const loggedOutMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}><Link to='/login/'>Login</Link></MenuItem>
            <MenuItem onClick={handleMenuClose}><Link to='/register/'>Create New Account</Link></MenuItem>
            {/* <MenuItem onClick={handleGuest}><Link to='/'>Continue as Guest</Link></MenuItem> */}
        </Menu>
    );
    const loggedInMenu = 
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>        

    // let editToolbar = "";
    let menu = loggedOutMenu;
    if (auth.loggedIn) {
        menu = loggedInMenu;
    }
    // if(auth.guest){
    //     menu = guestMenu;
    // }
    
    // --------------------------- if user is login or not --------------------
    function getAccountMenu(loggedIn) {
        if(loggedIn){
            let firstInitial = auth.user.userName.charAt(0).toUpperCase();
            return  <Avatar sx={{ m: 1, bgcolor: 'secondary.main', 
                    borderStyle: 'solid', borderColor: 'black', 
                    color:'wihte',fontSize:20, fontWeight:'normal',
                    width: 50, height: 50 }}
                    >
                        {firstInitial}
                    </Avatar>;
        }
        return <AccountCircleOutlinedIcon />;
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary" 
            style={{ height: 70 ,background:"linear-gradient(to bottom right, #64cdfa 20%, #f6f5dd)",color:"#2fb2e6"}}>
                <Toolbar>
                    <Typography                        
                        variant="h3"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block', flexGrow: 1 } }}                        
                    >
                        <Link style={{ textDecoration: 'none', color: '#e7cb75'}} to='/'>PixeLab</Link>
                    </Typography>
                    {/* <Box sx={{ flexGrow: 1 }}>{editToolbar}</Box> */}
                    {/* <Box sx={{ flexGrow: 1 }}></Box> */}
                    <Box sx={{ display: { xs: 'none', md: 'flex'} }}>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            {getAccountMenu(auth.loggedIn)}
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {
                menu
            }
        </Box>
    );
}