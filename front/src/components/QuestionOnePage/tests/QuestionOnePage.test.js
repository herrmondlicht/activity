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

    const wrapper = shallow(QuestionPage).withProps()
    const instance = wrapper.instance()
    const searchCountryByName = instance.searchCountryByName
    const returnFromAPI = [{ country: 'Malta' }]

    const expected = 'Republic of Malta';

    stub(instance, 'setState')
      .withArgs({ data: returnFromAPI })
      .returns(expected)

    APIHandler
      .searchCountryByName
      .withArgs({ name: nameToBeSearched }).resolves(returnFromAPI)

    const actual = await searchCountryByName(nameToBeSearched)

    assert.equal(actual, expected)

  })
})