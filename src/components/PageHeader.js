import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const PageHeader = ({contents}) => {
  let styleObject = {}
  if (contents.image_url) {
    let fullImageUrl = "https://s3.us-east-2.amazonaws.com/mylibraryguide-assets/images/" + contents.image_url
    styleObject.backgroundImage = 'url(' + fullImageUrl + ')'

  }
  return (
    <div className="page-header-container">
      <div className={content.image_url ? "page-header with-image" : "page-header"} style={styleObject}>
        <div className="page-header__contents">
          <h1 className="page-header__title">{contents.title}</h1>
          <p className="page-header__description">{contents.short_description}</p>
          {/*}<button onClick={() => updateCollection({data, type})} >Edit Collection</button>
          <button onClick={() => deleteCollection({data, type, parent, parentType})} >Delete Collection</button>
          */}
        </div>
      </div>
      <div className="page-header__overlay" />
    </div>
  )
}

export default PageHeader
