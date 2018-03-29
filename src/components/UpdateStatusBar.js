import React from 'react';

const appearanceTime = 2700

class UpdateStatusBar extends React.Component {
	constructor() {
		super()

		this.state = {
			showBar: true
		}
	}

	componentDidMount() {
		const { status } = this.props.statusObject
		if (status && status === "SUCCESS") {
			window.setTimeout(() => this.hide(), appearanceTime)
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.statusObject != this.props.statusObject) {
			window.setTimeout(() => this.hide(), appearanceTime)
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
			const { type, status, message } = this.props.statusObject
			let retVal = ""
			let [actionType, contentType] = type.split("_")

			console.log(actionType, contentType)
			if (status === "SUCCESS") {
				retVal += "Successfully"

				if (actionType === "DELETE") {
					retVal += " Deleted"
				} else if (actionType === "CREATE") {
					retVal += " Created"
				} else {
					retVal += " Updated"
				}
				retVal += " " + contentType.charAt(0) + contentType.slice(1).toLowerCase()
			} else if (status === "FAILED") {
				if (actionType === "DELETE") {
					retVal += "Delete Failed"
				} else if (actionType === "CREATE") {
					retVal += "Create Failed"
				} else {
					retVal += "Update Failed"
				}
				retVal += message ? ": " + message : ""
			} else {
				retVal += "In Progress"
			}

			return retVal
	}

	render() {
		const { status } = this.props.statusObject
		const { showBar } = this.state

		let content = this.getContent()
		let barColor;

		if (status === "SUCCESS") {
			barColor = 'green'
		} else if (status === "FAILED") {
			barColor = 'red'
		} else {
			barColor = 'blue'
		}

		return (
			<div className={showBar ? "update-status-bar " + barColor : "update-status-bar hidden " + barColor}>
				<div className="update-status-bar__content">
					<h5 className="update-status-bar__text">{content}</h5>
				</div>
			</div>
		)
	}
}

export default UpdateStatusBar
