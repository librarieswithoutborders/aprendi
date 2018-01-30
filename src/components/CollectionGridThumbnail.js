import React from 'react';
import { Link } from 'react-router-dom';

const CollectionGridThumbnail = (props) => {
  const {settings} = props;

  return (
    <div className="thumbnail">
      <Link to={window.location.pathname + "/" + settings.slug}>
        <h5 className="thumbnail__title">{settings.title}</h5>
        <p className="thumbnail__description">{settings.short_description}</p>
      </Link>
    </div>
  );
};

export default CollectionGridThumbnail;
