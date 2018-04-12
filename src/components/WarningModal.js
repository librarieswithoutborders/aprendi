import React, {Component} from 'react';
import {connect} from 'react-redux'
import {hideWarningModal} from '../actions/index'


class WarningModal extends Component {
  render() {
    const {content, hideWarningModal} = this.props
    const {message, submessage, options} = content

    return (
      <div className="warning-modal">
        <h5 className="warning-modal__message">{message}</h5>
        {submessage && <h5 className="warning-modal__submessage">{submessage}</h5>}
        <div className="warning-modal__button-container">
          {options.map(({text, action}, i) => (
            <div key={i} className="warning-modal__button button button-blue" onClick={() => {
              action(); hideWarningModal()
            }}>{text}</div>
          ))}
          <div className="warning-modal__button button button-grey" onClick={() => hideWarningModal()}>Cancel</div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  content: state.warningModalContent
})

const mapDispatchToProps = dispatch => ({
  hideWarningModal: () => {
    dispatch(hideWarningModal())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(WarningModal)
