// FEEDVIEW PAGE
import React from 'react';
import NavBar from '../../components/NavBar';
import FeedContainer from '../../components/FeedComps/FeedContainer';
import './css/framework.css';
import './css/icons.css';
import './css/night-mode.css';
// import './fonts/'

const Feed = () => {
    return (
        <>
            <NavBar />
            <FeedContainer />
        </>
    )
};

export default Feed;