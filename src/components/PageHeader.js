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
            <button onClick={editFunc}>{"Edit " + getButtonLabel(type)}</button>
          }
          {deleteFunc &&
            <button onClick={deleteFunc}>{"Delete " + getButtonLabel(type)}</button>
          }
        </div>
      </div>
      <div className="page-header__overlay" />
    </div>
  )
}

const getButtonLabel = (type) => {
  if (type === "collection") {
    return "Collection"
  } else if (type === "subcollection") {
    return "Subcollection"
  }
}



export default PageHeader
