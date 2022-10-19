import axios from 'axios';
import { useEffect, useState } from 'react';
import requests from '../../Requests';
import Banner from './Banner/Banner';
import Footer from './Footer/Footer';
import './HomeScreen.css';
import Navbar from './Navbar/Navbar';
import Row from './Row/Row';

export default function HomeScreen() {

    const [ movie, setMovie ] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get("https://api.themoviedb.org/3/discover/movie?api_key=0b8432e49e48da895deb20c60cd32b8c");
            setMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ]
            );
            return request;
        }
        fetchData();
    }, []);

    return (
        <div className='homeScreen'>
            <Navbar />

            <Banner movie={movie} />

            <Row
                title="NETFLIX ORIGINALS"
                fetchUrl={requests.fetchNetflixOriginals}
                setMovie={setMovie}
            />
            <Row
                title="Trending Now"
                fetchUrl={requests.fetchTrending}
                setMovie={setMovie}
            />
            <Row
                title="Top Rated"
                fetchUrl={requests.fetchTopRated}
                setMovie={setMovie}
            />
            <Row
                title="Action Movies"
                fetchUrl={requests.fetchActionMovies}
                setMovie={setMovie}
            />
            <Row
                title="Comedy Movies"
                fetchUrl={requests.fetchComedyMovies}
                setMovie={setMovie}
            />
            <Row
                title="Horror Movies"
                fetchUrl={requests.fetchHorrorMovies}
                setMovie={setMovie}
            />
            <Row
                title="Romance Movies"
                fetchUrl={requests.fetchRomanceMovies}
                setMovie={setMovie}
            />
            <Row
                title="Documentaries"
                fetchUrl={requests.fetchDocumentaries}
                setMovie={setMovie}
            />
            <Footer />

        </div>
    );
};
