import React from 'react';

const HomeHeaderCaption = ({home1}) => {
    return (
        <span className="h3 text-wrap">{home1.name}
            <small className="text-muted"> {home1.geo_name}
            </small>
        </span>
    );
};

export default HomeHeaderCaption;