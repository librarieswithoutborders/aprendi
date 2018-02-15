import React from 'react';
import ReactLoading from 'react-loading';

const LoadingIcon = () => {
  return (
    <div className="loading-icon-container">
      <ReactLoading
        className="loading-icon"
        type="spin"
        color="#54a2de"
        width="200px"
        height="200px" />
    </div>
  )
}

export default LoadingIcon;
