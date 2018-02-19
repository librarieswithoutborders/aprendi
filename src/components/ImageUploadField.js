import React from 'react';
import Dropzone from 'react-dropzone'
import { getS3SignedRequest, addImageUrlToAdminModalContent, uploadImage } from '../actions/actions.js'
import { connect } from 'react-redux'
import { Form, Text, FormField } from 'react-form';


class ImageUploadFieldContent extends React.Component {
  onDrop(files) {

    console.log(files)
    if (files[0].type === "application/pdf") {
      console.log("is pdf!")
      this.props.uploadImage(files[0], this.props.fieldApi.setValue)


    } else {
      this.props.uploadImage(files[0], this.props.fieldApi.setValue)
    }

    //
    // var pdfImage = new PDFImage("/tmp/slide.pdf");
    // pdfImage.convertPage(0).then(function (imagePath) {
    //   // 0-th page (first page) of the slide.pdf is available as slide-0.png
    //   fs.existsSync("/tmp/slide-0.png") // => true
    // });
  }

  getSnapshotOfPdf(fileName) {

    // console.log(fileName)
    // let pdfImage = new PDFImage("https://s3.us-east-2.amazonaws.com/mylibraryguide-assets/images/" + fileName);
    // console.log(pdfImage)
    // pdfImage.convertPage(0).then(function (imagePath) {
    //   console.log(imagePath)
    //   this.props.uploadImage(imagePath, this.props.fieldApi.setValue)
    //   // 0-th page (first page) of the slide.pdf is available as slide-0.png
    //   // fs.existsSync("/tmp/slide-0.png") // => true
    // });
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
      <div className="form__image-upload">
        {currValue &&
          <div className="form__image-upload__preview-container">
            <div className="form__image-upload__preview" style={styleObject} />
            <button className="form__image-upload__change-image" onClick={() => setValue(null)}>Change Image</button>
          </div>
        }
        {!currValue &&
          <Dropzone className="form__image-upload__image-input"
            createImageThumbnails={true}
            onDrop={(files) => this.onDrop(files)}
            onDragStart={setTouched}>
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
      dispatch(uploadImage(file))
      // dispatch(getS3SignedRequest(file)).then(response => {
      //   console.log(response);
      //
      //   const xhr = new XMLHttpRequest();
      //   xhr.onload = (a) => {
      //     console.log(a)
      //     if(xhr.readyState === XMLHttpRequest.DONE && xhr.status === 200) {
      //       console.log(xhr);
      //       setValue(file.name)
      //     }
      //   };
      //   xhr.open('PUT', response.payload.data.signedUrl);
      //   xhr.send(file);
      // })
    }

  }
}


// Use the form field and your custom input together to create your very own input!
const ImageUploadField = FormField(connect(mapStateToProps, mapDispatchToProps)(ImageUploadFieldContent));

export default ImageUploadField
