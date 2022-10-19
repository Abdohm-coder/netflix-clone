import axios from '../../../axios';
import { useEffect } from 'react';
import { useState } from 'react';
import './Row.css';

export default function Row({ title, fetchUrl, setMovie }) {

    const [movies, setMovies] = useState([]);
    
    const base_url = "https://image.tmdb.org/t/p/original/";

    useEffect(() => {
        async function fetchDate() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchDate();

    }, [fetchUrl]);


    return (
        <div className='row'>
            <h2>{title}</h2>
            <div className="row__posters">
                {
                    movies.map(movie =>  (
                        <div className="row__poster" key={movie.id}>
                            <span>{movie.vote_average}</span>
                            <img
                                className={`row__posterLarge`}
                                onClick={() => setMovie(movie)}
                                src={`${base_url}${
                                    movie.poster_path 
                                }`} 
                                alt={movie.name} 
                            />
                        </div>
                        )
                    )
                }
            </div>

        </div>
    );
};
