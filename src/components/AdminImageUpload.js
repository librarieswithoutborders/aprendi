import React from 'react';
import Dropzone from 'react-dropzone'
import { getS3SignedRequest } from '../actions/actions.js'
import { connect } from 'react-redux'


class AdminImageUpload extends React.Component {

  onDrop(files) {
    console.log(files);
    this.props.uploadImage(files[0])
  }

  render() {

    return (
      <Dropzone onDrop={this.onDrop.bind(this)}>
        <p>Try dropping some files here, or click to select files to upload.</p>
      </Dropzone>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {

  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (file) => {
      dispatch(getS3SignedRequest(file)).then(response => {
        console.log(response);

        const xhr = new XMLHttpRequest();
        xhr.open('PUT', response.payload.data.signedUrl);
        xhr.send(file);
      })
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminImageUpload)
