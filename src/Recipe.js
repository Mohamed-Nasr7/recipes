import React, {useState} from 'react';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles({
    media: {
        height: 0,
        paddingTop: '56.25%'
    },

    ingContainer:{
        display: 'flex',
        alignItems: 'center'
    },
    
    expand: {
        transform: 'rotate(0)',
        transition: 'all 0.4s ease'
    },
    didExpanded: {
        transform: 'rotate(180deg)',
        transition: 'all 0.4s ease'
    }
    
});


const Recipe = ({label, cal, image, ingredients}) => {

    const classes = useStyles();
    const [expanded, setExpanded] = useState(false);

    const handleExpanded = () => {
        setExpanded(!expanded);
    }

    return(
        
        <Card>
            <CardHeader title={label}  subheader={`Calories:  ${Math.round(cal)}`}  />
            
            <CardMedia image={image} title={label} className={classes.media}/>

            <CardContent className={classes.ingContainer}>
                
                <Typography variant="body1"> See Ingredients </Typography>
                <IconButton 
                    className={ expanded ? classes.didExpanded : classes.expand}
                    onClick={handleExpanded}
                    aria-expanded={expanded}
                    aria-label="show more" >
                    <ExpandMoreIcon />
                </IconButton>

            </CardContent>


            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <List component="nav" aria-label="main mailbox folders">
                        
                        {ingredients.map((ing, index )=> (
                            <ListItem button key={index}>
                                    <ListItemText primary={ing} />
                            </ListItem>
                        ))}

                    </List>
                    
                </CardContent>
            </Collapse>

        </Card>
        
    )

}


export default Recipe