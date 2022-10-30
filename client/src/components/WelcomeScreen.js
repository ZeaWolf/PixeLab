import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
//import { GlobalStoreContext } from '../store';
import { useContext, useState } from 'react'
//import AuthContext from '../auth'

const WelcomeButton = styled(Button)({
    background: 'linear-gradient(to bottom left, #DDB60A, #FFFEC3)',
    border: '2px solid',
    borderColor: '#FFFEC3',
    maxWidth: '250px', 
    maxHeight: '30px', 
    minWidth: '250px', 
    minHeight: '30px',
});


export default function WelcomeScreen() {
    //const { auth } = useContext(AuthContext);
    //const { store } = useContext(GlobalStoreContext);

    function handleGuest(){
        //auth.continueAsGuest(store);
    } 

    const WelcomeButton = styled(Button)({
        background: '#21B7B6',
        borderRadius: '10px',
        maxWidth: '230px', 
        maxHeight: '50px', 
        minWidth: '230px', 
        minHeight: '50px',
    });


    return (

        <div id="welcome-screen">
            <Box display="flex" justifyContent="center" alignItems="center">
                <Typography style={{color: '#0b3654', fontFamily: "Raleway", fontSize: 100, fontWeight: "bold", mt:1 }}>
                    PixeLab
                </Typography>
            </Box>
            <Box sx={{alignItems:'center', display:'flex', flexDirection:"column", my: 5}}>
                <WelcomeButton 
                    id = "login-button"
                    variant="contained" 
                    sx = {{my: 2}}
                    href = "/login/"
                >
                    <Typography style={{color: 'white', fontSize: 15, fontWeight: "bold"}}>
                        Login
                    </Typography>
                </WelcomeButton>

                <WelcomeButton 
                    id = "create-account-button"
                    variant="contained" 
                    sx = {{my: 2}}
                    href = '/register/'
                >
                    <Typography style={{color: 'white', fontSize: 15, fontWeight: "bold"}}>
                        Create Account
                    </Typography>
                </WelcomeButton>

                <WelcomeButton 
                    id = "continue-as-guest-button"
                    variant="contained" 
                    sx = {{my: 2}}
                    onClick = {handleGuest}
                >
                    <Typography style={{color: 'white', fontSize: 15, fontWeight: "bold"}}>
                        Continue as Guest
                    </Typography>
                </WelcomeButton>
            </Box>    
        </div>
        
        // <div id="welcome-screen">
        //     <Typography style={{color: '#FFFEC3', fontSize: 50, fontStyle: 'italic', fontWeight: "bold"}}>
        //         Welcome to The Top 5 Lister
        //     </Typography>

        //     <Box sx={{alignItems:'center', display:'flex', flexDirection:"column", my: 5}}>

        //         <WelcomeButton 
        //             id = "login-button"
        //             variant="contained" 
        //             sx = {{my: 2}}
        //             href = "/login/"
        //         >
        //             <Typography style={{color: 'black', fontSize: 15, fontWeight: "bold"}}>
        //                 Login
        //             </Typography>
        //         </WelcomeButton>

        //         <WelcomeButton 
        //             id = "create-account-button"
        //             variant="contained" 
        //             sx = {{my: 2}}
        //             href = '/register/'
        //         >
        //             <Typography style={{color: 'black', fontSize: 15, fontWeight: "bold"}}>
        //                 Create Account
        //             </Typography>
        //         </WelcomeButton>

        //         <WelcomeButton 
        //             id = "continue-as-guest-button"
        //             variant="contained" 
        //             sx = {{my: 2}}
        //             onClick = {handleGuest}
        //         >
        //             <Typography style={{color: 'black', fontSize: 15, fontWeight: "bold"}}>
        //                 Continue as Guest
        //             </Typography>
        //         </WelcomeButton>

        //     </Box>
        //     <Box sx={{my: 8, mx: 20}}>
        //         <Typography style={{color: '#FFFFFF', fontWeight: 'bold', fontSize: 20}}>
        //         Use the Top 5 Lister to list your five favorite anything 
        //         as well as see lists made by other users and even see the 
        //         aggregate top 5 lists of all  users for a given category.
        //         </Typography>
        //     </Box>
        //     <Box sx={{mt: 1}}>
        //         <Typography align='right' style={{fontSize: 15, fontStyle: 'italic', fontWeight: "bold"}}>
        //             Developed by Chengzhi Dong
        //         </Typography>
        //     </Box>
        // </div>
    )
}