import React from 'react'
import styles from './styles/MainPage.css'
import QuestionOnePage from '../QuestionOnePage';
import CustomAppBar from '../CustomAppBar';
export const createMainPage = (React) => {

  class MainPage extends React.Component {
    render() {
      return (
        <div className={styles['main-page']}>
          <CustomAppBar title={'Question One '} />
          <div className={styles['page-container']}>
            <QuestionOnePage />
          </div>
        </div>
      )
    }
  }

  return MainPage
}


export default createMainPage(React)