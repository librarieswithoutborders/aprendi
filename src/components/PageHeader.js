import React, {Component} from 'react';
import {Link} from 'react-router-dom';


const PageHeader = ({contents, type, editFunc, deleteFunc, joinFunc, editingMode}) => {
  const {title, description, image_url, byline, created_by} = contents
  const styleObject = {}
  if (image_url) {
    styleObject.backgroundImage = `url("${image_url}")`
  }

  let editButtonText, deleteButtonText;

  console.log(joinFunc)

  return (
    <div className="page-header-container">
      <div className={image_url ? 'page-header with-image' : 'page-header'} style={styleObject}>
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
                    <div className={image_url ? 'button button-transparent' : 'button button-transparent-black'} onClick={editFunc}>{`Edit ${getButtonLabel(type)}`}</div>
                  }
                  {deleteFunc &&
                    <div className={image_url ? 'button button-transparent' : 'button button-transparent-black'} onClick={deleteFunc}>{`Delete ${getButtonLabel(type)}`}</div>
                  }
                </div>
            }
            {joinFunc &&
                <div className="button button-transparent" onClick={joinFunc}>Request to Join Team</div>
            }


            {description && description != '<p><br></p>' &&
                <div className="page-header__description" dangerouslySetInnerHTML={{__html: description}} />
            }
          </div>
          {created_by &&
              <div className="page-header__contents__right">
                <div className="page-header__created-by">
                  {created_by.image &&
                    <div className="page-header__created-by__image-container">
                      <div className="page-header__created-by__image" style={{backgroundImage: `url(${created_by.image})`}}></div>
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

const getButtonLabel = type => {
  if (type === 'collection') {
    return 'Collection'
  } else if (type === 'subcollection') {
    return 'Subcollection'
  }
  return 'Team'
}


export default PageHeader
