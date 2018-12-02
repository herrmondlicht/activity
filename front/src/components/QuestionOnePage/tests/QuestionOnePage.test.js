import { assert } from 'chai'
import { shallow, testFacilitator } from "../../../utils/testRender";
import { stub, assert as sinonAssert } from "sinon";
import React from 'react'


import { createQuestionOnePage } from "../index";

describe('QuestionPage', () => {
  const APIHandler = {
    searchCountryByName: stub().resolves([])
  }
  const QuestionPage = createQuestionOnePage(React, { APIHandler });

  it('rendering of a SearchBar with correct search method', () => {
    const wrapper = shallow(QuestionPage).withProps()
    testFacilitator.nodeHasFunction(
      {
        wrapper,
        node: 'SearchBar',
        classFunctionName: 'searchCountryByName',
        propFunctionName: 'searchFor'
      })
  })

  it('return of the searchCountryByName method', async () => {
    const nameToBeSearched = 'Malta'
    const searchFullText = true

    const wrapper = shallow(QuestionPage).withProps()
    const instance = wrapper.instance()
    const searchCountryByName = instance.searchCountryByName
    const returnFromAPI = [{ country: 'Malta' }]

    const expected = 'Republic of Malta';

    stub(instance, 'setState')
      .withArgs({ data: returnFromAPI, isFetching: false })
      .returns(expected)

    APIHandler
      .searchCountryByName
      .withArgs({ name: nameToBeSearched, searchFullText }).resolves(returnFromAPI)

    const actual = await searchCountryByName(nameToBeSearched, searchFullText)

    assert.equal(actual, expected)

  })

  it('return of toggleLoading', () => {
    const wrapper = shallow(QuestionPage).withProps()
    const instance = wrapper.instance()
    const fetchingValue = false

    const { toggleLoading } = instance

    const setState = stub(instance, 'setState')

    toggleLoading(fetchingValue)
    sinonAssert.calledWithExactly(setState, {isFetching: fetchingValue})
  })
})