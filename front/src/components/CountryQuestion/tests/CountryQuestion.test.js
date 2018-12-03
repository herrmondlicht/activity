import { assert } from 'chai'
import { shallow, testFacilitator } from "../../../utils/testRender";
import { stub, assert as sinonAssert } from "sinon";
import React from 'react'


import { createCountryQuestion } from "../index";

describe('CountryQuestion', () => {
  const APIHandler = {
    searchMultipleCountriesName: stub().resolves([]),
    getAllCountries: stub().resolves([])
  }
  const CountryQuestion = createCountryQuestion({ APIHandler });
  const getRegularWrapperAndInstance = () => {
    const wrapper = shallow(CountryQuestion).withProps()
    const instance = wrapper.instance()
    return { wrapper, instance }
  }

  it('return of toggleLoading', () => {
    const wrapper = shallow(CountryQuestion).withProps()
    const instance = wrapper.instance()
    const fetchingValue = false

    const { toggleLoading } = instance

    const setState = stub(instance, 'setState')

    toggleLoading(fetchingValue)
    sinonAssert.calledWithExactly(setState, { isFetching: fetchingValue })
  })

  it('rendering of a SearchHeader with correct functions', () => {
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

  it('rendering of a CountryList when data is present', () => {
    const wrapper = shallow(CountryQuestion).withProps()
    wrapper.setState({ data: [true] })
    const actual = wrapper.find('CountryList').length
    const expected = 1;

    assert.equal(actual,expected, 'CountryList should render when state data is populated')
  })


  it('return of the searchMultipleCountryNames method', async () => {
    const nameToBeSearched = 'Malta'
    const searchFullText = true

    const { instance } = getRegularWrapperAndInstance()
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

    assert.equal(actual, expected, 'searchMultipleCountryNames should return the response from the server')

  })

  it('calling of stubSearchMultipleCountryNames by triggerSearch when name passed', () => {
    const { instance } = getRegularWrapperAndInstance()
    const triggerSearch = instance.triggerSearch
    const stubSearchMultipleCountryNames = stub(instance, 'searchMultipleCountryNames')

    const searchFullText = true;
    const name = 'Poland';

    triggerSearch(name, searchFullText)

    sinonAssert.calledWithExactly(stubSearchMultipleCountryNames, name, searchFullText)

  })

  it('calling of callRetrieveAllAPI by triggerSearch when name is not passed', () => {
    const { instance } = getRegularWrapperAndInstance()
    const triggerSearch = instance.triggerSearch
    const stubCallRetrieveAllAPI = stub(instance, 'callRetrieveAllAPI')

    triggerSearch()

    sinonAssert.called(stubCallRetrieveAllAPI)

  })

  it('return of callSearchAPI', async () => {
    const { instance } = getRegularWrapperAndInstance()
    const { callSearchAPI } = instance;

    const queryObject = { name: 'Colombia' }
    const fullText = true;
    const expected = 'everything is alright'

    APIHandler
      .searchMultipleCountriesName
      .withArgs({ queryObject, fullText })
      .resolves(expected)

    const actual = await callSearchAPI(queryObject, fullText)

    assert.equal(actual, expected, 'callSearchAPI should return the server response')
  })

  it('return of callRetrieveAllAPI', async () => {
    const { instance } = getRegularWrapperAndInstance()
    const { callRetrieveAllAPI } = instance;

    const queryObject = { name: 'Colombia' }
    const fullText = true;
    const expected = 'everything is alright'
    const returnFromAPI = 'returnFromAPI'

    APIHandler
      .getAllCountries
      .resolves(returnFromAPI)

    stub(instance, 'setState')
      .withArgs({ data: returnFromAPI, isFetching: false })
      .returns(expected)

    const actual = await callRetrieveAllAPI(queryObject, fullText)

    assert.equal(actual, expected, 'callRetrieveAllAPI should return the server response')
  })

  it('return of componentDidMount', () => {
    const { instance } = getRegularWrapperAndInstance()
    const { componentDidMount } = instance;
    const expected = 'random text';

    stub(instance, 'triggerSearch')
      .returns(expected)

    const actual = componentDidMount()

    assert.equal(actual, expected, 'componentDidMount should call triggerSearch')
  })

  it('return of handleSearchFullText', () => {
    const { instance } = getRegularWrapperAndInstance()
    const { handleSearchFullText } = instance;
    const event = {
      target: {
        checked: true
      }
    }
    const expected = 'random text';

    stub(instance, 'setState')
      .withArgs({
        searchFullText: event.target.checked
      })
      .returns(expected)

    const actual = handleSearchFullText(event)

    assert.equal(actual, expected, 'handleSearchFullText should call the setState')
  })



})