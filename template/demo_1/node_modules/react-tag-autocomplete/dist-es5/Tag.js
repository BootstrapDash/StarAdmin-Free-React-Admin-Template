'use strict'

var React = require('react')

module.exports = function (props) { return (
  React.createElement( 'button', { type: 'button', className: props.classNames.selectedTag, title: 'Click to remove tag', onClick: props.onDelete },
    React.createElement( 'span', { className: props.classNames.selectedTagName }, props.tag.name)
  )
); }
