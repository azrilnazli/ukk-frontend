import React, { Fragment } from "react";
import {
  BrowserRouter as Router,
  Link,
  useLocation
} from "react-router-dom";
import apiClient from '../../services/api';
import cx from 'classnames';
import MovieCard from "./MovieCard";

// export default function Movies() {
const Movies = () => {

    const [isPending, setIsPending] = React.useState(true);
    const [movies, setMovies] = React.useState(false); // Collection

    
    const [page, setPage] = React.useState(1); // variable

    const setCurrentPage = (page) => {
        setPage(page)    
    };

    // get paginated result from Laravel
    //console.log(page);
    React.useEffect( () => { // array function
        
        // variables ?page=1
        apiClient.get('/api/movies?page=' + page )
        .then( response => {
           // console.log(response)
            setMovies(response.data)
            setIsPending(false)
        })
        .catch( error => console.error(error) );
    }, [movies] ); // was page


    
    function Paginator(props) {
            
        //console.log(props.page)
        let query = useQuery();
        query.get("page") && props.setCurrentPage(query.get("page"))

        // movies
        const collect = require('collect.js'); 
        const collection = collect(props.movies.data); // paginated item
        
        // chunk into 3 per row
        const videos = collection.chunk(4);
        const paginator = collect(props.movies);
        const links = collect( paginator.items.links)
        
        const paginatedItems = links.map((link,index) => 
            <li key={index} className={
                cx({
                    'page-item' : true,
                    'active'    : link.active,
                    'disabled'  : link.url === null
                })
            }      
            >
                <Link to={link.url?link.url:'/'} className="page-link">{link.label}</Link>
            </li>
            );

        return (
            <Fragment>
                <h2>Movies</h2>
                
                { videos?.map( (chunks, key) => (
                        <div key={key} className='row '>
                        { chunks?.map( (movie, index) => (
                            <div key={index} className="col-sm-3 ">
                                <MovieCard id={movie.id} synopsis={movie.synopsis} />
                            </div>
                        ))}
                        </div>
                )) }

                <nav>
                    <ul className="pagination pagination-md py-5 justify-content-center">
                        {paginatedItems}
                    </ul>
                </nav>
            </Fragment>
        );
    } // Paginator()
    
    
  return (
    <div className='container container-fluid bg-light rounded p-3 '>
    <Router>
        { isPending && <div>Loading...</div> }
        { movies && <Paginator movies={movies} page={page} setCurrentPage={setCurrentPage} /> }
    </Router>
    </div>
  );
} // Movies

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default Movies;


// Child()
