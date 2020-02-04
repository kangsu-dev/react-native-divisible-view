import React from 'react'
import PropTypes from 'prop-types'
import { ViewPropTypes, View } from 'react-native'

class DivisibleView extends React.PureComponent {
   static propTypes = {
      ...ViewPropTypes,
      divider: PropTypes.oneOfType([PropTypes.node, PropTypes.number])
   }

   render() {
      const divider = this._getDivider()
      return (
         <View {...this.props}>
            {
               (
                  Array.isArray(this.props.children) ? this.props.children : [this.props.children]
               ).filter((child) =>
                  Array.isArray(child) || React.isValidElement(child)
               ).reduce((children, child, i) =>
                  children.length === 0 ? [child] : [
                     ...children,
                     ...(divider ? [React.cloneElement(divider, { key: `DivisibleViewDivider_${i}` })] : []),
                     child
                  ]
               , [])
            }
         </View>
      )
   }

   _getDivider = () => {
      const { divider } = this.props
      return typeof divider !== 'number' ? divider : (
         <View style={{ width: divider, height: divider }} />
      )
   }
}

export { DivisibleView }