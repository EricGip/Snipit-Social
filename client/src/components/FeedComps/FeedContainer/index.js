// FEEDCONTAINER for dynamic Feed
import React from 'react';
import FeedCard from '../FeedCard';
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