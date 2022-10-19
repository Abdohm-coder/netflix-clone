import { useEffect, useState } from 'react';
import './Banner.css';
import ReactModal from 'react-modal';
import YouTube from 'react-youtube';
import axios from 'axios';

export default function Banner({ movie }) {

    const [ modalOpen, setModalOpen ] = useState(false);
    const [coverImage, setCoverImage] = useState("");
    const [logoImage, setLogoImage] = useState("");
    const [ youtubeKey, setYoutubeKey ] = useState([]);

    const trancute = (string, n) => {
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    };

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`https://api.themoviedb.org/3/movie/${movie?.id}/images?api_key=0b8432e49e48da895deb20c60cd32b8c`);
            setCoverImage(request.data.posters[Math.floor(Math.random() * request.data.posters.length - 1)]?.file_path);
            setLogoImage(request.data?.logos.length > 0 ? request.data.logos[Math.floor(Math.random() * request.data.logos.length - 1)].file_path : "");
            return request;
        }
        fetchData();
    
}, [movie]);


    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(`https://api.themoviedb.org/3/movie/${movie?.id}/videos?api_key=0b8432e49e48da895deb20c60cd32b8c`);
            setYoutubeKey(
                request.data.results
            );
            return request;
        }
        fetchData();
    }, [movie]);

    useEffect(() => {
        if (modalOpen){
            document.querySelector("html").style.overflow = "hidden"
        } else {
            document.querySelector("html").style.overflow = "scroll"
        }
    }, [modalOpen])

    return (
        <header className='banner' style={{
            backgroundSize: "cover",
            backgroundImage: `url('https://image.tmdb.org/t/p/original/${coverImage ? coverImage : movie?.backdrop_path}')`,
            backgroundPosition: "left top",
            backgroundRepeat: "no-repeat"
        }}>
            <ReactModal
                isOpen={modalOpen}
                className="modal"
                ariaHideApp={false}
                preventScroll={true}
            >
                <div className="modal__container">

                    <svg onClick={() => setModalOpen(false)} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" clasName="Hawkins-Icon Hawkins-Icon-Standard" dataUia="previewModal-closebtn" role="button" ariaLabel="close" tabIndex="0"><path fillRule="evenodd" clipRule="evenodd" d="M2.29297 3.70706L10.5859 12L2.29297 20.2928L3.70718 21.7071L12.0001 13.4142L20.293 21.7071L21.7072 20.2928L13.4143 12L21.7072 3.70706L20.293 2.29285L12.0001 10.5857L3.70718 2.29285L2.29297 3.70706Z" fill="currentColor"></path></svg>
                    <YouTube
                        className='youtubrTrailer'
                        videoId={youtubeKey[0]?.key}
                        opts={{
                            height: (window.innerWidth * 0.5).toString(),
                            width: (window.innerWidth * 0.8).toString(),
                            playerVars: {
                                autoplay: 1,
                            },
                        }}
                        />
                </div>
            </ReactModal>
            <div className="banner__contents">
                {
                    logoImage !== ""
                    ? <img 
                    className='banner__coverImage'
                    src={`https://image.tmdb.org/t/p/original/${logoImage}`} alt="logo movie" />
                    : (
                        <h1 className="banner__title">
                            {movie?.title || movie?.name || movie?.original_name}
                        </h1>
                    )
                }

                <div className="banner__buttons">
                    <button onClick={() => setModalOpen(true)} className='banner__button banner__play'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard"><path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path></svg>
                        <span>Play Trailer</span>
                    </button>
                    <button className='banner__button'>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="Hawkins-Icon Hawkins-Icon-Standard"><path fillRule="evenodd" clipRule="evenodd" d="M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3ZM1 12C1 5.92487 5.92487 1 12 1C18.0751 1 23 5.92487 23 12C23 18.0751 18.0751 23 12 23C5.92487 23 1 18.0751 1 12ZM13 10V18H11V10H13ZM12 8.5C12.8284 8.5 13.5 7.82843 13.5 7C13.5 6.17157 12.8284 5.5 12 5.5C11.1716 5.5 10.5 6.17157 10.5 7C10.5 7.82843 11.1716 8.5 12 8.5Z" fill="currentColor"></path></svg>
                        <span>More Info</span>
                    </button>
                </div>
                <h1 className="banner__description">
                    {trancute(movie?.overview, 150)}
                </h1>
            </div>

            <div className="banner--fadeBottom" />
        </header>
    );
};
