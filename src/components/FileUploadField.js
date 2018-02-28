import React from 'react';
import Dropzone from 'react-dropzone'
import { uploadFile } from '../actions/actions.js'
import { connect } from 'react-redux'
import { Form, Text, FormField } from 'react-form';
import PdfViewer from './PdfViewer'


class FileUploadFieldContent extends React.Component {
  onDrop(files) {
    const {type} = this.props
    console.log(files)

    this.props.uploadFile(files[0], true, this.props.fieldApi.setValue)
  }

  getSnapshotOfPdf(canvasElem, filePath) {
    canvasElem.toBlob(blob => {
      let file = new File([blob], filePath.replace('pdf', 'png'), {type: 'image/png'})
      this.props.uploadFile(file, false, null)
    })
  }

  generatePreview(filePath) {
    const {type} = this.props
    let previewContent

    if (type === "pdf") {
      previewContent = <PdfViewer singlePage={true} renderCallback={(canvasElem) => this.getSnapshotOfPdf(canvasElem, filePath)} url={"https://s3.us-east-2.amazonaws.com/mylibraryguide-assets/pdf/" + filePath} />
    } else {
      let fullImageUrl = "https://s3.us-east-2.amazonaws.com/mylibraryguide-assets/images/" + filePath
      let styleObject = {backgroundImage: 'url(' + fullImageUrl + ')'}

      previewContent = <div className="form__image-upload__preview" style={styleObject} />
    }

    return (
      <div className="form__image-upload__preview-container">
        {previewContent}
        <button className="form__image-upload__change-image" onClick={() => setValue(null)}>Change Image</button>
      </div>
    )

  }

  render() {
    console.log(this.props)
    const { type, fieldApi, ...rest } = this.props;
    const { getValue, getError, getWarning, getSuccess, setTouched, setValue } = fieldApi;

    const error = getError();
    const warning = getWarning();
    const success = getSuccess();

    let currValue = getValue()
    let preview = currValue ? this.generatePreview(currValue) : null

    return (
      <div className="form__image-upload">
        {preview}
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
    uploadFile: (file, addHash, callback) => {
      dispatch(uploadFile(file, addHash, callback))
    }
  }
}


// Use the form field and your custom input together to create your very own input!
const FileUploadField = FormField(connect(mapStateToProps, mapDispatchToProps)(FileUploadFieldContent));

export default FileUploadField
