import React from 'react'
import styles from './styles/MainPage.css'
import QuestionOnePage from '../QuestionOnePage';
import CustomAppBar from '../CustomAppBar';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Menu from '../BottomMenu/Menu';

const ROUTES = [
  {
    name: 'Question One',
    to: '/question1'
  },
  {
    name: 'Question Two',
    to: '/question2'
  },
  {
    name: 'Question Three',
    to: '/question3'
  },
  {
    name: 'Reel Question',
    to: '/reel-question'
  }
]

export const createMainPage = (React, { routes = ROUTES } = {}) => {

  class MainPage extends React.Component {
    render() {
      return (
        <div className={styles['main-page']}>
          <CustomAppBar title={'Question One '} />
          <Router>
            <div className={styles['page-container']}>
              <div className={styles['page-container-content']}>
                <Route exact path='/question1' component={QuestionOnePage} />
              </div>
              <Menu routes={routes} />
            </div>
          </Router>
        </div>
      )
    }
  }

  return MainPage
}


export default createMainPage(React)