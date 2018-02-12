import React from 'react';

const SvgIcon = (props) => {
	const {name} = props;
  console.log('../static/svg/' + name + '.svg')
	var Icon = require('./../static/svg/' + name + '.svg');
	return (<Icon className={'icon icon__' + name} />)
}

export default SvgIcon
