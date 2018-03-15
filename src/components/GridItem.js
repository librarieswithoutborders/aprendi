import React from "react"
import { Link } from 'react-router-dom'
import SvgIcon from './SvgIcon'
import Transition from 'react-transition-group/Transition';
import typeToIconMapping from '../utils/typeToIconMapping'

const columns = { lg: 5, md: 4, sm: 3, xs: 2, xxs: 1 }

const rowHeight = {
  collection: 200,
  subcollection: 200,
  resource: 320,
  user: 300,
  team: 260,
}

const transitionDuration = 700;

const defaultStyle = {
  transition: `opacity ${transitionDuration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 0 },
  entered:  { opacity: 1 },
};

class GridItem extends React.Component {
  constructor(props) {
    super(props);

    this.data = props.data[props.index]
  }

  renderBackground() {
    const {type} = this.props
    if (this.data.image_url) {
      let styleObject = {}
      styleObject.backgroundImage = 'url(' + this.data.image_url + ')'

      return <div className="grid__item__image" style={styleObject} ></div>
    } else {
      return  <div className="grid__item__image"><SvgIcon name={typeToIconMapping(type, this.data)} /></div>
    }
  }

  renderContent() {
    const {index, type, clickHandler, buttonClickHandler, showTeam, editingMode} = this.props

    switch (type) {
      case "collection":
        return (
          <div className="grid__item__text">
            {showTeam && <h5 className="grid__item__text__sub">{this.data.team}</h5>}
            <h5 className="grid__item__text__main">{this.data.title}</h5>
          </div>
        )
      case "subcollection":
        return (
          <div className="grid__item__text">
            <SvgIcon name="folder" />
            <h5 className="grid__item__text__main">{this.data.title}</h5>
          </div>
        )
      case "resource":
        return (
          <div className="grid__item__text">
            <SvgIcon name={typeToIconMapping(type, this.data)} />
            <h5 className="grid__item__text__main">{this.data.title}</h5>
          </div>
        )
      case "team":
        return (
          <div className="grid__item__text">
            <h5 className="grid__item__text__main">{this.data.team_name}</h5>
            <h5 className="grid__item__text__sub">{this.data.users.length === 1 ? this.data.users.length + " Member" : this.data.users.length + " Members"}</h5>
            {editingMode && buttonClickHandler && <div className="button button-white" onClick={() => buttonClickHandler(d)}>Leave This Team</div>}
          </div>
        )
      case "user":
        return (
          <div className="grid__item__text">
            <h5 className="grid__item__text__main">{this.data.name}</h5>
            <h5 className="grid__item__text__sub">{this.data.email}</h5>
            {editingMode && <div className="button button-white" onClick={() => buttonClickHandler(d)}>Remove User from Team</div>}
          </div>
        )
    }
  }

  render() {
    const {data, index, type, clickHandler, createNewText} = this.props

    let content

    if (type == "add-new") {
      content = (
        <div className="grid__item__add-new-content">
          <SvgIcon className="grid__item__plus" name="plus" />
          <div className="grid__item__text">
            <h5 className="grid__item__text__sub">{createNewText}</h5>
          </div>
        </div>
      )
    } else {
      content = (
        <div>
          {this.renderBackground()}
          <div className="grid__item__content">
            {this.renderContent()}
          </div>
        </div>
      )
    }


    return (
      <Transition in={true} appear={true} timeout={transitionDuration}>
        {(state) => {

          return (
            <div
              className={"grid__item item-type-" + type}
              onClick={() => { console.log(data, index); return clickHandler(data, index)}}
              style={{
                ...defaultStyle,
                transitionDelay: (50*index) + "ms",
                ...transitionStyles[state]
              }}>
                {content}
            </div>
          )
        }}
      </Transition>
    );
  }
}


export default GridItem
