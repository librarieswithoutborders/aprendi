import React from 'react';

const appearanceTime = 3000

class UpdateStatusBar extends React.Component {
  constructor() {
    super()

    this.timeoutFunc = () => this.hide()

    this.state = {
      showBar: true
    }
  }

  componentDidMount() {
    const {status} = this.props.statusObject
    if (status) {
      if (status === 'SUCCESS') {
        console.log('~~~~~~~~~~~~~~~~~~~~~~~')
        console.log('setting timeout')
        window.setTimeout(this.timeoutFunc, appearanceTime)
      } else {
        console.log('~~~~~~~~~~~~~~~~~~~~~~~')
        console.log('clearing timeout')
        window.clearTimeout(this.timeoutFunc)
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.statusObject != this.props.statusObject) {
      window.setTimeout(this.timeoutFunc, appearanceTime)
      this.setState({
        showBar: true
      })
    }
  }

  hide() {
    this.setState({
      showBar: false
    })
  }

  getContent() {
    const {type, status, message} = this.props.statusObject

    if (type === 'TEAM_APPROVE_USER_REQUEST') {
      return 'Successfully Added User'
    }

    if (type === 'TEAM_DENY_USER_REQUEST') {
      return 'Successfully Denied Request'
    }

    if (type === 'TEAM_JOIN_REQUEST') {
      return 'Successfully applied to join team.  Please wait for a team admin to approve request'
    }

    const [actionType, contentType] = type.split('_')
    let retVal = ''

    console.log(actionType, contentType)
    if (status === 'SUCCESS') {
      retVal += 'Successfully'

      if (actionType === 'DELETE') {
        retVal += ' Deleted'
      } else if (actionType === 'CREATE') {
        retVal += ' Created'
      } else {
        retVal += ' Updated'
      }
      retVal += ` ${contentType.charAt(0)}${contentType.slice(1).toLowerCase()}`
    } else if (status === 'FAILED') {
      if (actionType === 'DELETE') {
        retVal += 'Delete Failed'
      } else if (actionType === 'CREATE') {
        retVal += 'Create Failed'
      } else {
        retVal += 'Update Failed'
      }
      retVal += message ? `: ${message}` : ''
    } else {
      retVal += 'In Progress'
    }

    return retVal
  }

  render() {
    const {status} = this.props.statusObject
    const {showBar} = this.state

    const content = this.getContent()
    let barColor;

    if (status === 'SUCCESS') {
      barColor = 'green'
    } else if (status === 'FAILED') {
      barColor = 'red'
    } else {
      barColor = 'blue'
    }

    return (
      <div className={showBar ? `update-status-bar ${barColor}` : `update-status-bar hidden ${barColor}`}>
        <div className="update-status-bar__content">
          <h5 className="update-status-bar__text">{content}</h5>
        </div>
      </div>
    )
  }
}

export default UpdateStatusBar
