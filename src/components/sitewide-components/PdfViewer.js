import React from 'react';
import { Document, Page } from 'react-pdf/build/entry.webpack';
import $ from 'jquery';

import LoadingIcon from './LoadingIcon'

class PdfViewer extends React.Component {
  constructor(props) {
    super(props)

    this.resizeFunc = this.resize.bind(this)

    this.state = {
      numPages: null,
      docContainerWidth: 0
    }
  }

  componentDidMount() {
    $(window).resize(this.resizeFunc)

    this.setState({
      docContainerWidth: this.refs.documentContainer.clientWidth
    })
  }

  componentWillUnmount() {
    $(window).off("resize", this.resizeFunc);
  }

  resize() {
    this.setState({
      docContainerWidth: this.refs.documentContainer.clientWidth
    })
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

  renderSinglePageContent() {
    const { docContainerWidth } = this.state;

    return <Page pageNumber={1} width={docContainerWidth} onRenderSuccess={this.onRenderSuccess.bind(this)}/>
  }

  renderMultiPageContent() {
    const { numPages, docContainerWidth } = this.state;
    let pages = [];

    for (let i = 1; i <= numPages; i++) {
      pages.push(<Page key={i} pageNumber={i} width={docContainerWidth} />)
    }

    return pages
  }

  render() {
    const {url, singlePage} = this.props
    const { pageNumber, numPages } = this.state;

    console.log(this.props, this.state)

    return (
      <div ref="documentContainer">
        <Document
          inputRef={(ref) => { this.documentRef = ref; }}
          file={url}
          onLoadSuccess={props => this.onDocumentLoad(props)}
          loading={<LoadingIcon />}>
            {singlePage ? this.renderSinglePageContent() : this.renderMultiPageContent()}
        </Document>
      </div>
    )
  }
}

export default PdfViewer
