import React from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
const ResponsiveReactGridLayout = WidthProvider(Responsive)
import { Link } from 'react-router-dom'
import SvgIcon from './SvgIcon'

const columns = { lg: 4, md: 4, sm: 3, xs: 2, xxs: 1 }

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.itemDragged = false

    this.state = {
      layouts: this.generateLayout(props.data.map(d => d._id)),
      currentBreakpoint: "lg",
      width: 0
    };
  }

  onBreakpointChange = breakpoint => {
    console.log("breakpoint changing!")
    this.setState({
      currentBreakpoint: breakpoint
    });
  };

  onWidthChange = props => {
    console.log("width changed!")
    // this.setState({
    //   width: props.containerWidth
    // })
  }

  generateDOM() {
    const { data, clickHandler, type } = this.props;

    let gridItems = [...data, ...[{}]].map((d, i) => {
      if (i === data.length) { return this.addCreateGridItem()}
      let styleObject = {}
      if (d.image_url) {
        let fullImageUrl = "https://s3.us-east-2.amazonaws.com/mylibraryguide-assets/images/" + d.image_url
        styleObject.backgroundImage = 'url(' + fullImageUrl + ')'
      }

      if (type === "collection") {
        return this.renderCollectionItem(d, i, styleObject)
      } else if (type === "subcollection") {
        return this.renderSubcollectionItem(d, i, styleObject)
      } else {
        return this.renderResourceItem(d, i, styleObject)
      }
    });
    // let createGridItem =

    // return [...gridItems, ...[createGridItem]]
    return gridItems
  }

  renderCollectionItem(d, i, styleObject) {
    const { data, clickHandler} = this.props;

    return (
      <div key={d._id} className={"grid__item item-type-collection"} onClick={() => { clickHandler(data, i)}}>
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

  renderSubcollectionItem(d, i, styleObject) {
    const { data, clickHandler} = this.props;
    return (
      <div key={d._id} className={"grid__item item-type-collection"} onClick={() => clickHandler(data, i)}>
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
      <div key={d._id} className={"grid__item item-type-resource"} onClick={() => clickHandler(data, i)}>
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
      <div key="Create New" className="grid__item add-new" onClick={() => createNew()}>
          <SvgIcon className="grid__item__plus" name="plus" />
          <div className="grid__item__text">
            <h5 className="grid__item__text__sub">{text}</h5>
          </div>
      </div>
    )
  }

  generateLayout(idList) {

    let layouts = {};

    for (let key in columns) {
      let numColumns = columns[key]

      layouts[key] = [...idList, ...["Create New"]].map((d, i) => {
        return {
          x: i%numColumns,
          y: Math.floor(i/numColumns),
          w: 1,
          h: 1,
          i: d,
          static: d === "Create New"
        }
      })
      // let createNewIndex = idList.length
      // layouts[key].push(
      //   {
      //     x: createNewIndex%numColumns,
      //     y: Math.floor(createNewIndex/numColumns),
      //     w: 1,
      //     h: 1,
      //     i: "Create New",
      //     static: true,
      //   }
      // )
    }
    return layouts
  }

  onDragStop(layout, oldItem, newItem, placeholder, e, element) {
    this.itemDragged = true
  }

  onLayoutChange(layout, layouts) {
    console.log("in on layout change")
    console.log(layout)

    if (this.itemDragged) {
      let currDataOrder = [...layout].filter(d => d.i !== "Create New").sort((a, b) => {
        if (a.y < b.y) {
          return -1
        } else if (a.y > b.y) {
          return 1
        } else {
          if (a.x < b.x) {
            return -1
          } else if (a.x > b.x) {
            return 1
          }
        }
        return 0
      }).map(d => d.i)

      this.props.reOrderHandler(currDataOrder)
      this.itemDragged = false
      this.setState({
        layouts: this.generateLayout(currDataOrder)
      });
    }

  }

  render() {
    const {type} = this.props

    console.log("in render")
    console.log(this.state.layouts)

    return (
      <ResponsiveReactGridLayout
        layouts={this.state.layouts}
        autoSize={true}
        margin= {[10, 10]}
        containerPadding= {[10, 10]}
        isResizable={false}
        isDraggable={true}
        cols= {columns}
        onBreakpointChange={() => this.onBreakpointChange()}
        onDragStop={this.onDragStop.bind(this)}
        onLayoutChange={this.onLayoutChange.bind(this)}
        onWidthChange={() => this.onWidthChange()}
        measureBeforeMount={false}
        useCSSTransforms={true}
        preventCollision={false}
        verticalCompact={true}
        compactType="horizontal"
        rowHeight={type === "collection" || type === "subcollection" ? 250 : 300}
      >
        {this.generateDOM()}
      </ResponsiveReactGridLayout>
    );
  }
}


export default Grid
