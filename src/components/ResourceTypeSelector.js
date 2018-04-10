import React, {Component} from 'react';
import SvgIcon from './SvgIcon'
import {resourceTypeOptions} from '../constants'
import {Responsive, WidthProvider} from 'react-grid-layout';
import typeToIconMapping from '../'
const ResponsiveReactGridLayout = WidthProvider(Responsive);

const columns = {lg: 6, md: 5, sm: 4, xs: 3, xxs: 2}

const generateLayout = () => {
  const layouts = {};

  for (const key in columns) {
    const numColumns = columns[key]

    layouts[key] = resourceTypeOptions.map((d, i) => ({
      x: i % numColumns,
      y: Math.floor(i / numColumns),
      w: 1,
      h: 1,
      i: String(d.value)
    }))
  }
  console.log(layouts)
  return layouts
}

const ResourceTypeSelector = ({setResourceType}) => (
  <div className="resource-type-selector">
    <ResponsiveReactGridLayout
      layouts={generateLayout()}
      autoSize={true}
      margin= {[10, 10]}
      containerPadding= {[0, 0]}
      isResizable={false}
      isDraggable={false}
      cols= {columns}
      measureBeforeMount={false}
      useCSSTransforms={true}
      preventCollision={false}
      compactType="horizontal"
      rowHeight={100}
    >
      {resourceTypeOptions.map(option => (
        <div key={option.value} className="resource-type-selector__item" onClick={() => setResourceType(option.value)}>
          <SvgIcon className="resource-type-selector__item__icon" name={option.icon} />
          <h5 className="resource-type-selector__item__text">{option.label}</h5>
        </div>
      ))}
    </ResponsiveReactGridLayout>
  </div>
)

export default ResourceTypeSelector
