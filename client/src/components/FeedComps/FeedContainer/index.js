// FEEDCONTAINER - for dynamic FeedCards
import React from 'react';
import FeedCard from '../FeedCard';

// USE THIS to overwrite styling from the
// main framework found in pages/Feed/css
// import './style.css';

// TEMPLATE FRAMEWORK - its a huge set of files
import '../../../pages/FeedView/css/style.css';
import '../../../pages/FeedView/css/framework.css';
import '../../../pages/FeedView/css/icons.css';
import '../../../pages/FeedView/css/night-mode.css';

const FeedView = () => {
    return (
        <div className="section-small">
            <div uk-grid>
                <div className="uk-width-2-3@m feed-area">

                    <FeedCard />

                </div>
            </div>
        </div>
    )
};

export default FeedView;