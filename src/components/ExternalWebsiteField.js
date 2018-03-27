// import React from 'react';
// import Dropzone from 'react-dropzone'
// import { uploadFile, takeWebScreenshot } from '../actions/actions.js'
// import { connect } from 'react-redux'
// import { Form, Text, FormField } from 'react-form';
// import PdfViewer from './PdfViewer'
// const validUrl = require('valid-url');
//
// class ExternalWebsiteFieldContent extends React.Component {
//   constructor(props) {
//     super(props)
//
//     this.state = {
//       currValue: null,
//       error: null,
//       screenshot: null
//     }
//   }
//
//   componentWillReceiveProps(nextProps) {
//
//   }
//
//   onFocusOut() {
//     let value = this.props.fieldApi.getValue()
//     console.log(value)
//
//     if (validUrl.isUri(value)){
//
//       this.initiateScreenshot(value)
//       this.setState({
//         currValue: value,
//         error: false
//       })
//     } else {
//       this.setState({
//         currValue: null,
//         error: true
//       })
//     }
//
//   }
//
//   initiateScreenshot(value) {
//     const { takeWebScreenshot } = this.props
//
//     takeWebScreenshot(value)
//   }
//
//   generatePreview(fileUrl) {
//     const { fileUploadStatus } = this.props
//     // const { setValue } = fieldApi;
//
//     const { currValue } = this.state
//
//     return (
//       <div className="form__external-website__preview-container">
//         <div className="form__external-website__preview" style={{ backgroundImage: "url('https://s3.us-east-2.amazonaws.com/mylibraryguide-assets/images/" + fileUploadStatus + "')" }} />
//       </div>
//     )
//   }
//
//   generateErrorMessage() {
//     return (
//       <h5 className="form__error-message">Error: Invalid URL</h5>
//     )
//   }
//
//   render() {
//     console.log(this.props)
//     const { type, fieldApi, fileUploadStatus } = this.props
//     const { currValue, error} = this.state
//
//     console.log(fieldApi)
//     const { getValue, getError, getWarning, getSuccess, setTouched, setValue } = fieldApi;
//
//     let preview = fileUploadStatus ? this.generatePreview() : null
//     let errorMessage = error ? this.generateErrorMessage() : null
//
//     return (
//       <div className="form__external-website">
//         {preview}
//         {!currValue &&
//           <Text field="resource_url" id="resource_url" onBlur={() => this.onFocusOut()}/>
//         }
//         {errorMessage}
//       </div>
//     );
//   }
// }
//
// const mapStateToProps = (state, ownProps) => {
//   return {
//     fileUploadStatus: state.fileUploadStatus
//   }
// }
//
// const mapDispatchToProps = (dispatch) => {
//   return {
//     takeWebScreenshot: (url, callback) => {
//       console.log(url)
//       dispatch(takeWebScreenshot(url, callback))
//     },
//     uploadFile: (file, addHash, callback) => {
//       dispatch(uploadFile(file, addHash, callback))
//     }
//   }
// }
//
//
// // Use the form field and your custom input together to create your very own input!
// const ExternalWebsiteField = FormField(connect(mapStateToProps, mapDispatchToProps)(ExternalWebsiteFieldContent));
//
// export default ExternalWebsiteField
