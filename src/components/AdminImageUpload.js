import React from 'react';
import Dropzone from 'react-dropzone'
import { getS3SignedRequest, addImageUrlToAdminModalContent } from '../actions/actions.js'
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
      console.log(file)
      dispatch(getS3SignedRequest(file)).then(response => {
        console.log(response);

        const xhr = new XMLHttpRequest();
        xhr.onload = (a) => {
          console.log(a)
          if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log(xhr);
            dispatch(addImageUrlToAdminModalContent(file.name))
          }
        };
        xhr.open('PUT', response.payload.data.signedUrl);
        xhr.send(file);

      })
    }

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminImageUpload)
