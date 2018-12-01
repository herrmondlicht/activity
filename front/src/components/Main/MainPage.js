import React from 'react'
import styles from './styles/MainPage.css'
import QuestionOnePage from '../QuestionOnePage';
export const createMainPage = (React) => {

  class MainPage extends React.Component {
    render() {
      return (
        <div className={styles['main-page']}>
          <QuestionOnePage />
        </div>
      )
    }
  }

  return MainPage
}


export default createMainPage(React)