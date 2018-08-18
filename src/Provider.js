import React, { Component } from 'react'
import { Provider as P } from './context'
import PropTypes from 'prop-types'
/**
 *
 * 是一个组件，用来接收 stort 然后通过 context 将 store 传递给所有的子组件
 * @export
 * @class Provider
 * @extends {Component}
 */
export default class Provider extends Component{
  static PropTypes = {
    store : PropTypes.object.isRequired
  }
  render() {
    return (
      <P value={{ store: this.props.store }} >
        {this.props.children}
      </P>
    )
  }

}