import React from 'react';
import { Document, Page } from 'react-pdf';
import $ from 'jquery';


class PdfViewer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      numPages: null,
      pageNumber: 1,
    }
  }

  onDocumentLoad = ({ numPages }) => {
    this.setState({ numPages });
  }

  onRenderSuccess() {
    if (this.props.renderCallback) {
      let canvasElem = $('.ReactPDF__Page__canvas')[0]
      this.props.renderCallback(canvasElem)
    }
  }

  render() {
    const {url, singlePage} = this.props
    const { pageNumber, numPages } = this.state;

    console.log(this.props, this.state)

    if (singlePage) {
      return (
        <Document file={url} onLoadSuccess={props => this.onDocumentLoad(props)}>
          <Page pageNumber={1} onRenderSuccess={this.onRenderSuccess.bind(this)}/>
        </Document>
      )
    } else {
      return (
        <div>
          <p>Page {pageNumber} of {numPages}</p>
          <Document file={url} onLoadSuccess={props => this.onDocumentLoad(props)}>
            <Page pageNumber={pageNumber} onRenderSuccess={props => this.props.shouldUploadSnapshot ? this.uploadSnaphot(props) : null}/>
          </Document>
        </div>
      )
    }
  }
}

export default PdfViewer
