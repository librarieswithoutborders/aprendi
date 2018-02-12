import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SvgIcon from './SvgIcon'


const Breadcrumbs = ({data}) => {

  return (
    <div className="breadcrumbs">
      <div className="breadcrumbs__list">
        {data
          .map((d, i) => {
          let linkPrefix = ""

          for (let j=0; j < (data.length - i - 1); j++) {
            linkPrefix += '../'
          }

          return (
            <div className="breadcrumbs__list-item" key={i} >
              <Link className="breadcrumbs__list-item__link" to={linkPrefix + d.path}>
                <span className="breadcrumbs__list-item__link__text">{d.title}</span>
              </Link>
              <div className="breadcrumbs__list-item__arrow-container">
                <SvgIcon name="arrow" />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Breadcrumbs
