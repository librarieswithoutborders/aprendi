import React from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
const ResponsiveReactGridLayout = WidthProvider(Responsive)
import { Link } from 'react-router-dom'
import SvgIcon from './SvgIcon'

const columns = { lg: 4, md: 4, sm: 3, xs: 2, xxs: 1 }

class Grid extends React.Component {
  constructor(props) {
    super(props);

    console.log(props)

    this.state = {
      layouts: this.generateLayout(),
      currentBreakpoint: "lg",
      width: 0
    };
  }

  onBreakpointChange = breakpoint => {
    console.log(breakpoint)
    this.setState({
      currentBreakpoint: breakpoint
    });
  };

  onWidthChange = props => {
    // console.log(props)
    // this.setState({
    //   width: props.containerWidth
    // })
  }

  generateDOM() {
    const { data, clickHandler, type } = this.props;

    console.log(data)

    let gridItems = data.map((d, i) => {
      let styleObject = {}
      console.log(d.image_url)
      if (d.image_url) {
        let fullImageUrl = "https://s3.us-east-2.amazonaws.com/mylibraryguide-assets/images/" + d.image_url
        console.log(fullImageUrl)
        styleObject.backgroundImage = 'url(' + fullImageUrl + ')'
      }

      if (type === "collection" || type === "subcollection") {
        return this.renderCollectionItem(d, i, styleObject)
      } else {
        return this.renderResourceItem(d, i, styleObject)
      }
    });
    let createGridItem = this.addCreateGridItem()

    console.log(gridItems, createGridItem)

    return [...gridItems, ...[createGridItem]]
  }

  renderCollectionItem(d, i, styleObject) {
    const { data, clickHandler} = this.props;
    return (
      <div key={i} className={"grid__item item-type-collection"} onClick={() => clickHandler(data, i)}>
        <div className="grid__item__image" style={styleObject} >
        </div>
        <div className="grid__item__content">
          <div className="grid__item__text">
            <h5 className="grid__item__text__main">{d.title}</h5>
          </div>
        </div>
      </div>
    );
  }

  renderResourceItem(d, i, styleObject) {
    const { data, clickHandler} = this.props;
    return (
      <div key={i} className={"grid__item item-type-resource"} onClick={() => clickHandler(data, i)}>
        <div className="grid__item__content">
          <div className="grid__item__text">
            <h5 className="grid__item__text__sub">{d.resource_type}</h5>
            <h5 className="grid__item__text__main">{d.title}</h5>
          </div>
        </div>
        <div className="grid__item__image" style={styleObject} >
        </div>
      </div>
    );
  }

  addCreateGridItem() {
    const { data, createNew, type } = this.props;
    let text;
    if (type === "collection") {
      text = "Create New Collection"
    } else if (type === "subcollection") {
      text = "Create New Subcollection"
    } else {
      text = "Add New Resource"
    }
    return(
      <div key={data.length} className="grid__item add-new" onClick={() => createNew()}>
          <SvgIcon className="grid__item__plus" name="plus" />
          <div className="grid__item__text">
            <h5 className="grid__item__text__sub">{text}</h5>
          </div>
      </div>
    )
  }

  generateLayout() {
    const { data } = this.props

    let layouts = {};

    for (let key in columns) {
      console.log(key)
      let numColumns = columns[key]

      layouts[key] = data.map((d, i) => {
        return {
          x: i%numColumns,
          y: Math.floor(i/numColumns),
          w: 1,
          h: 1,
          i: String(i)
        }
      })
      console.log(layouts[key])
      let createNewIndex = data.length
      layouts[key].push(
        {
          x: createNewIndex%numColumns,
          y: Math.floor(createNewIndex/numColumns),
          w: 1,
          h: 1,
          i: String(createNewIndex),
          static: true,
        }
      )
      console.log(layouts[key])
    }
    return layouts
  }

  onLayoutChange(layout) {
    console.log("layout changed!", layout)
  }

  render() {
    const {type} = this.props
    console.log(this.state.layouts)
    return (
      <ResponsiveReactGridLayout
        layouts={this.state.layouts}
        autoSize={true}
        margin= {[10, 10]}
        containerPadding= {[10, 10]}
        isResizable={false}
        cols= {columns}
        onBreakpointChange={() => this.onBreakpointChange()}
        onLayoutChange={layout => this.onLayoutChange(layout)}
        onWidthChange={() => this.onWidthChange()}
        measureBeforeMount={false}
        useCSSTransforms={true}
        preventCollision={false}
        compactType="vertical"
        rowHeight={type === "collection" || type === "subcollection" ? 250 : 300}
      >
        {this.generateDOM()}
      </ResponsiveReactGridLayout>
    );
  }
}


export default Grid
