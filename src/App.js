import React, {useState, useEffect} from 'react';
import Recipe from './Recipe';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import SearchIcon from '@material-ui/icons/Search';
import Button from '@material-ui/core/Button';


const appID = '4c69f415';
const appKey = 'ee637c0ff7d282510c976320d94d7be0';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FFDF8D , #FFEAD4 80%)',
    overflow: 'auto',
    minHeight: '100vh',
    '& .MuiInputBase-input': {
      width: '450px',
      padding: '8px'
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: '#C39931',
    }
  },
  grid: {
    maxWidth: '100%',
    padding: '15px',
    margin: '0'
  },
  form: {
    textAlign: 'center',
    margin: '25px 0'
  },
  icon: {
    position: 'relative',
    top: '7px',
    marginRight: '3px'
  },
  button: {
    marginLeft: '10px'
  }

});



function App() {
  
  const [recipes, setRecipe] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  const url = `https://api.edamam.com/search?q=${query}&app_id=${appID}&app_key=${appKey}`;

  useEffect(() => {
    getRecipe();
  }, [query]);


  const classes = useStyles();


  const getRecipe = async () => {
    const response = await fetch(url);
    const data = await response.json();
    setRecipe(data.hits);
  }

  const searchSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }


  return (
    <div className={classes.root}>
      <form onSubmit={searchSubmit} className={classes.form}>
        <SearchIcon className={classes.icon}/>
        <Input 
          type="text"
          placeholder="Search recipe"
          onChange={e => setSearch(e.target.value)} 
          value={search} />
        <Button type="submit" variant="outlined" className={classes.button}> Search</Button>
      </form>
      

      <Grid container justify="center" spacing={5} className={classes.grid}>

          {recipes.map((recipe) => (
            
            <Grid item xs={12} sm={6} md={4} lg={3} key= {recipe.recipe.label}>
              <Recipe 
                image= {recipe.recipe.image} 
                cal= {recipe.recipe.calories} 
                label= {recipe.recipe.label} 
                ingredients= {recipe.recipe.ingredientLines}  
              />
            </Grid>

          ))}

      </Grid>
    </div>
  );
}

export default App;
