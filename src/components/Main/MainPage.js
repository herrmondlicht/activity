import React from 'react'
import CustomAppBar from '../CustomAppBar';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Menu from '../BottomMenu/Menu';
import CountryQuestion from '../CountryQuestion';
import ReelGame from '../ReelGame'
import styles from './styles/MainPage.css'

const ROUTES = [
  {
    name: 'Question One',
    to: '/question1'
  },
  {
    name: 'Reel Question',
    to: '/reel-question'
  }
]

export const createMainPage = ({ routes = ROUTES } = {}) => {

  class MainPage extends React.Component {
    render() {
      return (
        <div className={styles['main-page']}>
          <Router>
            <div className={styles['page-container']}>
              <Route exact path="/" render={() => (
                <Redirect to="/question1" />
              )} />
              <Route exact path='/question1' component={CountryQuestion} />
              <Route exact path='/reel-question' component={ReelGame} />
              <Menu routes={routes} />
            </div>
          </Router>
        </div>
      )
    }
  }

  return MainPage
}


export default createMainPage()