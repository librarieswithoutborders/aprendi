import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const Breadcrumbs = ({data}) => {

  return (
    <ul className="breadcrumbs">
      {data.slice(0,-1).map((d, i) => {
        let linkPrefix = ""

        for (let j=0; j < (data.length - i - 1); j++) {
          linkPrefix += '../'
        }

        return (
          <li key={i} >
            <Link to={linkPrefix + d.path}>
              <span>{d.title}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default Breadcrumbs
