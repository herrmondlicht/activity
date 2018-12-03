import { assert } from 'chai'
import { shallow, testFacilitator } from "../../../utils/testRender";
import { stub, assert as sinonAssert } from "sinon";
import React from 'react'


import { createCountryQuestion } from "../index";

describe('CountryQuestion', () => {
  const APIHandler = {
    searchCountryByName: stub().resolves([])
  }
  const CountryQuestion = createCountryQuestion(React, { APIHandler });

  it('rendering of a SearchBar with correct functions', () => {
    const wrapper = shallow(CountryQuestion).withProps()
    testFacilitator.nodeHasFunction(
      {
        wrapper,
        node: 'SearchHeader',
        classFunctionName: 'triggerSearch',
        propFunctionName: 'searchMultipleCountryNames'
      }
    )

    testFacilitator.nodeHasFunction(
      {
        wrapper,
        node: 'SearchHeader',
        classFunctionName: 'handleSearchFullText',
        propFunctionName: 'handleSearchFullText'
      }
    )
  })

  it('return of the searchMultipleCountryNames method', async () => {
    const nameToBeSearched = 'Malta'
    const searchFullText = true

    const wrapper = shallow(CountryQuestion).withProps()
    const instance = wrapper.instance()
    const searchMultipleCountryNames = instance.searchMultipleCountryNames
    const returnFromAPI = [{ country: 'Malta' }]
    const returnFromTreatNameArray = ['Malta']

    const expected = 'Republic of Malta';


    stub(instance, 'treatNameArray')
      .withArgs(nameToBeSearched)
      .returns(returnFromTreatNameArray)

    stub(instance, 'setState')
      .withArgs({ data: returnFromAPI, isFetching: false })
      .returns(expected)

    stub(instance, 'callSearchAPI')
      .withArgs({ nameArray: returnFromTreatNameArray }, searchFullText)
      .returns(returnFromAPI)
      
    const actual = await searchMultipleCountryNames(nameToBeSearched, searchFullText)

    assert.equal(actual, expected)

  })

  it('return of triggerSearch', () => {
    
  })

  it('return of toggleLoading', () => {
    const wrapper = shallow(CountryQuestion).withProps()
    const instance = wrapper.instance()
    const fetchingValue = false

    const { toggleLoading } = instance

    const setState = stub(instance, 'setState')

    toggleLoading(fetchingValue)
    sinonAssert.calledWithExactly(setState, { isFetching: fetchingValue })
  })
})