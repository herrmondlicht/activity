import { shallow as enzymeShallow, mount as enzymeMount, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from 'react'
import { assert } from 'chai'

configure({ adapter: new Adapter() });

export const shallow = (ReactComponent) => {
  return {
    withProps: (props) => enzymeShallow(<ReactComponent  {...props} />)
  }
}

export const mount = (ReactComponent) => {
  return {
    withProps: (props) => enzymeMount(<ReactComponent  {...props} />),
  }
}

export const testFacilitator = {
  nodeHasFunction: ({ wrapper, node, classFunctionName, propFunctionName }) => {
    const instance = wrapper.instance()
    const expectedFunction = instance[classFunctionName]
    const actualFunction = wrapper.find(node).props()[(propFunctionName || classFunctionName)]
    return assert.equal(actualFunction, expectedFunction)
  },
  nodeHasProp: ({ wrapper, node, propKey, value }) => {
    const props = wrapper.find(node).props()
    return assert.deepEqual(value, props[propKey])
  },
  nodeWasRendered: (wrapper, node) => {
    const actual = wrapper.find(node).length;
    const expected = 1;
    return assert.equal(actual, expected)
  },
  hasState: (wrapper, state) => {
    const currentState = wrapper.state()
    return assert.deepEqual(currentState, state)
  }
}