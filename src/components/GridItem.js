import React from "react"
import { Link } from 'react-router-dom'
import SvgIcon from './SvgIcon'
import Transition from 'react-transition-group/Transition';
import typeToIconMapping from '../utils/typeToIconMapping'
import { connect } from 'react-redux'


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
      let imageUrl;

      // temporary conditional while issue of pdf thumbnail creation persists
      // if (type === "resource" && this.data.resource_type === "pdf") {
        imageUrl = this.data.image_url
      // } else {
      //   imageUrl = this.data.image_url.replace('/images/', '/thumbnail-images/')
      // }

      styleObject.backgroundImage = 'url("' + imageUrl + '")'

      return <div className="grid__item__image" style={styleObject} onError={(d) => { console.log("LOADED", d); }}></div>
    } else {
      return  <div className="grid__item__image"><SvgIcon name={typeToIconMapping(type, this.data)} /></div>
    }
  }

  canUserEdit(onlyAllowCurrUser) {
    const {currUserId, isCoreAdmin, editingMode} = this.props
    if (!editingMode) { return false }
    if (isCoreAdmin) { return true }

    if (onlyAllowCurrUser) {
      if (!currUserId) { return false }
      console.log(this.data)
      return currUserId === this.data.auth0id
    } else {
      return true
    }
  }

  renderContent() {
    const {index, type, clickHandler, buttonClickHandler, showTeam, editingMode} = this.props

    switch (type) {
      case "collection":
        return (
          <div className="grid__item__text">
            {showTeam && this.data.team && <h5 className="grid__item__text__sub">{this.data.team.team_name}</h5>}
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
            {editingMode && <h5 className="grid__item__text__sub">{this.data.users.length === 1 ? this.data.users.length + " Member" : this.data.users.length + " Members"}</h5>}
            {editingMode && buttonClickHandler &&
              <div className="button button-white" onClick={() => buttonClickHandler.func(this.data)}>{buttonClickHandler.text}</div>
            }
          </div>
        )
      case "user":
        return (
          <div className="grid__item__text">
            <h5 className="grid__item__text__main">{this.data.name}</h5>
            <h5 className="grid__item__text__sub">{this.data.email}</h5>
            {/*editingMode && this.canUserEdit() && <div className="button button-white" onClick={() => buttonClickHandler(this.data)}>Leave This Team</div>*/}
            {buttonClickHandler && this.canUserEdit(buttonClickHandler.onlyAllowCurrUser) &&
              <div className="button button-white" onClick={() => buttonClickHandler.func(this.data)}>{buttonClickHandler.text}</div>
            }
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
              className={"grid__item item-type-" + type + (clickHandler ? " clickable" : "")}
              onClick={() => { console.log(data, index); return clickHandler ? clickHandler(data, index) : null}}
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

const mapStateToProps = (state, ownProps) => {
  if (state.currUser && state.currUser.permissions) {
    return {
      currUserId: state.currUser.permissions.auth0id,
      isCoreAdmin: state.currUser.permissions.core_admin
    }
  } else {
    return {}
  }
}

export default connect(mapStateToProps)(GridItem)
