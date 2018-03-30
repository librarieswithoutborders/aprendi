import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const PageHeader = ({contents, type, editFunc, deleteFunc, editingMode}) => {
  const {title, description, image_url, byline, created_by} = contents
  let styleObject = {}
  if (image_url) {
    styleObject.backgroundImage = 'url("' + image_url + '")'
  }

  let editButtonText, deleteButtonText;

  return (
      <div className="page-header-container">
        <div className={image_url ? "page-header with-image" : "page-header"} style={styleObject}>
          <div className="page-header__contents">
            <div className="page-header__contents__left">
              {byline &&
                <p className="page-header__byline">
                  <Link to={byline.path}>{byline.label}</Link>
                </p>
              }
              <h1 className="page-header__title">{title}</h1>
              {editingMode &&
                <div className="page-header__button-container">
                  {editFunc &&
                    <div className="button button-transparent" onClick={editFunc}>{"Edit " + getButtonLabel(type)}</div>
                  }
                  {deleteFunc &&
                    <div className="button button-transparent" onClick={deleteFunc}>{"Delete " + getButtonLabel(type)}</div>
                  }
                </div>
              }


              {description &&
                <div className="page-header__description" dangerouslySetInnerHTML={{'__html': description}} />
              }
            </div>
            {created_by &&
              <div className="page-header__contents__right">
                <div className="page-header__created-by">
                  {created_by.image &&
                    <div className="page-header__created-by__image-container">
                      <div className="page-header__created-by__image" style={{ backgroundImage: "url(" + created_by.image + ")"}}></div>
                    </div>
                  }
                  <div className="page-header__created-by__text">
                    <div className="page-header__created-by__text__elem">
                      <h5 className="page-header__created-by__text__sub">Created by</h5>
                      <h5 className="page-header__created-by__text__main">{created_by.name}</h5>
                    </div>
                    <div className="page-header__created-by__text__elem">
                      <h5 className="page-header__created-by__text__sub">Contact</h5>
                      <h5 className="page-header__created-by__text__main">{created_by.email}</h5>
                    </div>
                  </div>
                </div>
              </div>
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
