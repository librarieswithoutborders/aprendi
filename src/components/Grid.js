import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import { Link } from 'react-router-dom';

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
    const { data, clickHandler } = this.props;

    console.log(data)

    let gridItems = data.map((d, i) => {
      let styleObject = {}
      console.log(d.image_url)
      if (d.image_url) {
        let fullImageUrl = "https://s3.us-east-2.amazonaws.com/mylibraryguide-assets/images/" + d.image_url
        console.log(fullImageUrl)
        styleObject.backgroundImage = 'url(' + fullImageUrl + ')'
      }

      return (
        <div key={i} className="grid__item" style={styleObject} onClick={() => clickHandler(data, i)}>
          <div key={i} className="grid__item__content">
            <div key={i} className="grid__item__text-container">
              <h5 className="grid__item__title">{d.title}</h5>
            </div>
          </div>
        </div>
      );
    });
    let createGridItem = this.addCreateGridItem()

    console.log(gridItems, createGridItem)

    return [...gridItems, ...[createGridItem]]

  }

  addCreateGridItem() {
    const { data, createNew } = this.props;
    return(
      <div key={data.length} className="grid__item add-new">
        <div className="grid__item__content" onClick={() => createNew()}>
            <h5 className="grid__item__title">+</h5>
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
        rowHeight={200}
      >
        {this.generateDOM()}
      </ResponsiveReactGridLayout>
    );
  }
}


export default Grid
