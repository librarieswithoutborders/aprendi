import React from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import { Link } from 'react-router-dom';


const rowHeight = 200;
const columns = { lg: 6, md: 5, sm: 3, xs: 2, xxs: 1 }

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

  onNewLayout = () => {
    console.log("new layout")
    this.setState({
      layouts: this.generateLayout()
    });
  };

  onWidthChange = props => {
    // console.log(props)
    // this.setState({
    //   width: props.containerWidth
    // })
  }

  generateDOM() {
    const { data } = this.props;
    return data.map((d, i) => {
      return (
        <div key={i} className="grid__item">
          <Link to={window.location.pathname + "/" + d.path}>
            <div key={i} className="grid__item__content">
              <div key={i} className="grid__item__text-container">
                <h5 className="grid__item__title">{d.title}</h5>
              </div>
            </div>
          </Link>
        </div>
      );
    });
  }

  addCreateGridItem() {
    const { data, createNew } = this.props;
    return(
      <div key={data.length} className="grid__item">
        <div className="grid__item__content" onClick={() => createNew()}>
          <div className="grid__item__text-container">
            <h5 className="grid__item__title">+</h5>
          </div>
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
    }
    return layouts
  }

  onLayoutChange(layout) {
    console.log("layout changed!", layout)
  }

  render() {
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
        compactType="horizontal"
      >
        {this.generateDOM()}
        {this.addCreateGridItem()}
      </ResponsiveReactGridLayout>
    );
  }
}


export default Grid
