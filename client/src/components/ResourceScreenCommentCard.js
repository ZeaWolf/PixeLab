import ListItem from '@mui/material/ListItem'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';

function ResourceScreenCommentCard(props){
    let userName = "Example User"
    let commentText = "Example Comment Text Example Comment Text Example Comment Text Example Comment Text Example Comment Text Example Comment Text Example Comment Text Example Comment Text Example Comment Text "
    let separator = ": "
    let commentCard = 
        <ListItem>
            <Box className='resource-comment-border'>
                <Typography>{userName}{separator}{commentText}</Typography>
            </Box>
        </ListItem>
    return(
        commentCard
    )
}

export default ResourceScreenCommentCard;