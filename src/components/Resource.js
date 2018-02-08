import React, { Component } from 'react';
import { Link } from 'react-router-dom';

const Resource = ({content}) => {
  console.log(content)
  return (
    <div className="resource">
      <h1>{content.title}</h1>
      <p>{content.short_description}</p>
    </div>
  )
}

export default Resource
