import React from 'react';
import Dropzone from 'react-dropzone'
import { getS3SignedRequest, addImageUrlToAdminModalContent } from '../actions/actions.js'
import { connect } from 'react-redux'
import { Form, Text, FormField } from 'react-form';


class ImageUploadFieldContent extends React.Component {
  onDrop(files) {
    this.props.uploadImage(files[0], this.props.fieldApi.setValue)
  }

  render() {
    const { fieldApi, ...rest } = this.props;
    const { getValue, getError, getWarning, getSuccess, setTouched, setValue } = fieldApi;

    const error = getError();
    const warning = getWarning();
    const success = getSuccess();

    let currValue = getValue()

    console.log(currValue)
    console.log(rest)
    console.log(...rest)

    let styleObject = {}
    let fullImageUrl = "https://s3.us-east-2.amazonaws.com/mylibraryguide-assets/images/" + currValue
    styleObject.backgroundImage = 'url(' + fullImageUrl + ')'

    return (
      <div>
        {currValue &&
          <div>
            <div className="form-field__image-preview" style={styleObject} />
            <button className="form-field__change-image" onClick={() => setValue(null)}>Change Image</button>
          </div>
        }
        {!currValue &&
          <Dropzone onDrop={(files) => this.onDrop(files)} onDragStart={setTouched}>
            <p>Drop image file here or click to select files to upload</p>
          </Dropzone>
        }
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    uploadImage: (file, setValue) => {
      dispatch(getS3SignedRequest(file)).then(response => {
        console.log(response);

        const xhr = new XMLHttpRequest();
        xhr.onload = (a) => {
          console.log(a)
          if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
            console.log(xhr);
            setValue(file.name)
          }
        };
        xhr.open('PUT', response.payload.data.signedUrl);
        xhr.send(file);
      })
    }

  }
}


// Use the form field and your custom input together to create your very own input!
const ImageUploadField = FormField(connect(mapStateToProps, mapDispatchToProps)(ImageUploadFieldContent));

export default ImageUploadField
