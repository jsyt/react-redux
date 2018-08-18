import React, { Component } from 'react';
import { Consumer } from './context';
import { bindActionCreators } from 'redux';

/**
 *
 * connect 实现的是将 store 中的 state 和 dispatch 映射到 UI组件的属性中
 * @param mapStateToProps 一个函数，用来处理 store 中的 state 与组件中属性的映射关系
 * @param mapDispatchToProps 一个函数，用来处理 store 中的 dispatch 与组件中属性的映射关系
 * @returns  一个增强后的组件，可以直接在组件的属性中获取 state  和dispatch 
 */
export default (mapStateToProps, mapDispatchToProps) => (Comp) => {
  class Proxy extends Component{
    constructor() {
      super();
      this.state = mapStateToProps(this.props.store.getState())
    }
    componentDidMount() {
      this.unsubscribe = this.props.store.subscribe(() => {
        this.setState(mapStateToProps(this.props.store.getState()))
      })
    };
    
    componentWillUnmount() {
      this.unsubscribe();
    }
    render() {
      let action = {};
      if (typeof mapDispatchToProps === 'function') {
        action = mapDispatchToProps(this.props.store.dispatch);
      } else if (typeof mapDispatchToProps === 'object' && mapDispatchToProps !== null){
        action = bindActionCreators(mapDispatchToProps, this.props.store.dispatch)
      } else {
        throw new Error('mapDispatchToProps is expected to be a function or an object')
      }
      <Comp {...this.state}></Comp>
    }
  }

  return (
    () => {
      <Consumer>
      {
        (value)=> <Proxy store={value.store}></Proxy>
      }
    </Consumer>
    }
  )
}

