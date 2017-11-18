//-------------------------------------------------------------------------------

import React from 'react'
import { connect } from 'react-redux'
import { Responsive, WidthProvider } from 'react-grid-layout'
import _ from 'lodash'

import * as Tabs from '../../actions/Tabs.jsx'
import AcPanel from './AcPanel.jsx'

import GridStyle from 'react-grid-layout/css/styles.css'
import ResizeStyle from 'react-resizable/css/styles.css'


const ResponsiveReactGridLayout = WidthProvider( Responsive )


//-------------------------------------------------------------------------------

@connect( (store) => {
  return {
    panels: store.panels
  }
})
export default class AcGrid extends React.PureComponent {

  static defaultProps = {
    className   : "layout",
    items       : 1,
    rowHeight   : 150,
    breakpoints : { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 },
    cols        : { lg: 6, md: 4, sm: 2, xs: 1, xxs: 1 },
  }

  onLayoutChange = ( layouts, layout ) => {
    const { tabId, dispatch }  = this.props
    dispatch( Tabs.TabLayout( tabId, layout ) )
  }

  //-------------------------------------------------------------------------------

  render() {

    const { panels, tabId }  = this.props

    const unlocked  = "edit" in panels.state ? panels.state.edit : 0
    const panelList = _.filter( panels.byId, (v) => v.tab == tabId )

    var contents = _.map( panelList, (p,i) =>
      <div key={i}>
        <AcPanel panel={p} isLocked={p.id != unlocked} />
      </div>
    )
    
    return (
      <ResponsiveReactGridLayout {...this.props} onLayoutChange={this.onLayoutChange}>
        { contents }
      </ResponsiveReactGridLayout>
    )
  }
}
