import React from 'react';
import { Document, Page } from 'react-pdf';
import $ from 'jquery';


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

    // if (singlePage) {
    //   return (
    //     <div ref="documentContainer">
    //       <Document file={url} onLoadSuccess={props => this.onDocumentLoad(props)}>
    //         <Page pageNumber={1} onRenderSuccess={this.onRenderSuccess.bind(this)}/>
    //       </Document>
    //     </div>
    //   )
    // } else {

      return (
        <div ref="documentContainer">
          <Document inputRef={(ref) => { this.documentRef = ref; }} file={url} onLoadSuccess={props => this.onDocumentLoad(props)}>
            {singlePage ? this.renderSinglePageContent() : this.renderMultiPageContent()}
          </Document>
        </div>
      )
    // }
  }
}

export default PdfViewer
