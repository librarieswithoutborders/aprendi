import React from "react"
import { Responsive, WidthProvider } from "react-grid-layout"
const ResponsiveReactGridLayout = WidthProvider(Responsive)
import { isLoggedIn } from '../utils/AuthService';
import { Link } from 'react-router-dom'
import SvgIcon from './SvgIcon'
import TransitionGroup from 'react-transition-group/TransitionGroup';
import GridItem from './GridItem'

const columns = { lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }

const rowHeight = {
  collection: 200,
  subcollection: 200,
  resource: 280,
  user: 200,
  team: 260,
}

const duration = 700;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
};

class Grid extends React.Component {
  constructor(props) {
    super(props);

    this.itemDragged = false

    this.state = {
      layouts: props.data ? this.generateLayout(props.data.map(d => d._id)) : null,
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
    const { data, clickHandler, createNew, type, editingMode, showTeam } = this.props;

    let fullList = editingMode && createNew ? [...data, ...[{}]] : data

    let gridItems = fullList.map((d, i) => {
      if (i === data.length) {
        return (
          <div key="Create">
            <GridItem index={i} {...this.props} type="add-new" clickHandler={createNew} />
          </div>
        )
      } else {
        return (
          <div key={d._id}>
            <GridItem index={i} {...this.props}/>
          </div>
        )
      }
    })

    return gridItems
  }

  generateLayout(idList) {
    const {editingMode, createNew} = this.props
    let layouts = {};

    for (let key in columns) {
      let numColumns = columns[key]

      let fullList = editingMode && createNew ? [...idList, ...["Create"]] : idList

      layouts[key] = fullList.map((d, i) => {
        return {
          x: i%numColumns,
          y: Math.floor(i/numColumns),
          w: 1,
          h: 1,
          i: d,
          isDraggable: !(editingMode && createNew && i === fullList.length - 1)
        }
      })
    }
    return layouts
  }

  onDragStop(layout, oldItem, newItem, placeholder, e, element) {
    if (oldItem.x !== newItem.x || oldItem.y !== newItem.y) {
      this.itemDragged = true
    }
  }

  onLayoutChange(layout, layouts) {
    if (this.itemDragged) {
      let currDataOrder = [...layout].filter(d => d.i !== "Create").sort((a, b) => {
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
      this.setState({
        layouts: this.generateLayout(currDataOrder)
      });
    } else {
      this.setState({
        layouts: this.generateLayout(this.props.data.map(d => d._id))
      });
    }
  }

  render() {
    const {type, isDraggable, editingMode} = this.props

    return (
      <ResponsiveReactGridLayout
        layouts={this.state.layouts}
        margin= {[20, 20]}
        containerPadding= {[20, 20]}
        isResizable={false}
        isDraggable={editingMode && isDraggable}
        cols= {columns}
        onBreakpointChange={() => this.onBreakpointChange()}
        onDragStop={this.onDragStop.bind(this)}
        onLayoutChange={this.onLayoutChange.bind(this)}
        onWidthChange={() => this.onWidthChange()}
        measureBeforeMount={false}
        useCSSTransforms={true}
        preventCollision={false}
        compactType="horizontal"
        rowHeight={rowHeight[type]}
      >
        {this.generateDOM()}
      </ResponsiveReactGridLayout>
    );
  }
}


export default Grid
