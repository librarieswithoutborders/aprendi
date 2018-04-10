import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SvgIcon from './SvgIcon'


const Breadcrumbs = ({data}) => {

  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs__list">
        {data.length > 2 &&
          <div className="breadcrumbs__list-item mobile-placeholder" >
            <div className="breadcrumbs__list-item__contents">
              <div className="breadcrumbs__list-item__contents__left">
                <Link className="breadcrumbs__list-item__link" to={"../../" + data[data.length - 3].path}>
                  <span>...</span>
                </Link>
              </div>
              <div className="breadcrumbs__list-item__contents__right">
                <SvgIcon className="breadcrumbs__list-item__arrow" name="arrow" />
              </div>
            </div>
          </div>
        }
        {data.map((d, i) => {
          let linkPrefix = ""

          for (let j=0; j < (data.length - i - 1); j++) {
            linkPrefix += '../'
          }

          if (i === data.length - 1) {
            return (
              <div className="breadcrumbs__list-item" key={i} >
                <span className="breadcrumbs__list-item__text">{d.title}</span>
              </div>
            )
          } else {
            return (
              <div className="breadcrumbs__list-item" key={i} >
                <div className="breadcrumbs__list-item__contents">
                  <div className="breadcrumbs__list-item__contents__left">
                    <Link className="breadcrumbs__list-item__link" to={linkPrefix + d.path}>
                      <span className="breadcrumbs__list-item__text">{d.title}</span>
                    </Link>
                  </div>
                  <div className="breadcrumbs__list-item__contents__right">
                    <SvgIcon className="breadcrumbs__list-item__arrow" name="arrow" />
                  </div>
                </div>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}

export default Breadcrumbs
