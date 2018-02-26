import React from 'react';

const SvgIcon = (props) => {
	var Icon = require('./../static/svg/' + props.name + '.svg');
	let className = 'icon icon__' + props.name
	if (props.className) {
		className += " " + props.className
	}
	return <Icon className={className} />
}

export default SvgIcon
