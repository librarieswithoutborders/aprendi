import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const PageHeader = ({contents, type, editFunc, deleteFunc}) => {
  const {title, short_description, image_url, byline} = contents
  let styleObject = {}
  if (image_url) {
    let fullImageUrl = "https://s3.us-east-2.amazonaws.com/mylibraryguide-assets/images/" + image_url
    styleObject.backgroundImage = 'url(' + fullImageUrl + ')'
  }

  let editButtonText, deleteButtonText;

  return (
    <div className="page-header-container">
      <div className={image_url ? "page-header with-image" : "page-header"} style={styleObject}>
        <div className="page-header__contents">
          {byline &&
            <p className="page-header__byline">
              <Link to={byline.path}>{byline.label}</Link>
            </p>
          }
          <h1 className="page-header__title">{title}</h1>

          {short_description &&
            <p className="page-header__description">{short_description}</p>
          }
          {editFunc &&
            <div className="button" onClick={editFunc}>{"Edit " + getButtonLabel(type)}</div>
          }
          {deleteFunc &&
            <div className="button" onClick={deleteFunc}>{"Delete " + getButtonLabel(type)}</div>
          }
        </div>
      </div>
      {image_url && <div className="page-header__overlay" />}
    </div>
  )
}

const getButtonLabel = (type) => {
  if (type === "collection") {
    return "Collection"
  } else if (type === "subcollection") {
    return "Subcollection"
  } else {
    return "Team"
  }
}



export default PageHeader
