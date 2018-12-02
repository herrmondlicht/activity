import React from 'react'
import propTypes from 'prop-types'
import Button from '@material-ui/core/Button';


import getApiHandler from '../../utils/api'
import banana from "./assets/banana.png";
import cherry from "./assets/cherry.png";
import lemon from "./assets/lemon.png";
import apple from "./assets/apple.png";
import styles from './styles/ReelGame.css'

export const createReelGame = ({ APIHandler = getApiHandler() } = {}) => {


  class ReelGame extends React.Component {

    static propTypes = {}

    state = {
      coins: 20,
      result: []
    }

    callAPI = () => APIHandler
      .spinTheWheel()
      .then(response => this.setState((prevState) => ({
        coins: prevState.coins + response.coins,
        result: response.result
      })))

    spendCoinAndPullLever = () => {
      this.setState((prevState) => ({
        coins: prevState.coins - 1
      }), this.callAPI)
    }

    render() {
      const { coins, result } = this.state
      return (
        <div className={styles['reel-game-container']}>
          <div className={styles['result-displayer']}>
            {result.map((fruit, index) => (
              <div key={index} className={styles['image-displayer']}>
                <ReelPicture fruit={fruit} />
              </div>
            ))}
          </div>
          <div className={styles['reel-game-container__bottom-block']}>
            <div className={styles['coin-displayer']}>
              <div className={styles['coin-displayer__title']}>Your coins:</div>
              <div className={styles['coin-displayer__value']}>{coins}</div>
            </div>
            <div>
              {
                coins
                  ? <Button onClick={this.spendCoinAndPullLever} variant="outlined" color='secondary'>
                    Pull the lever
                  </Button>
                  : <div>
                    You have spent all your coins :( <br /> Reload the page to play again
                  </div>
              }
            </div>
          </div>
        </div>
      )
    }

  }

  return ReelGame

}

const ReelPicture = ({ fruit }) => (
  <div style={{ height: '100%', width: '100%' }}>
    {fruit === 'apple' && <ApplePicture />}
    {fruit === 'lemon' && <LemonPicture />}
    {fruit === 'cherry' && <CherryPicture />}
    {fruit === 'banana' && <BananaPicture />}
  </div>
)

const BananaPicture = () => (
  <img src={banana} style={{ height: '100%', width: '100%' }} />
)
const LemonPicture = () => (
  <img src={lemon} style={{ height: '100%', width: '100%' }} />
)
const CherryPicture = () => (
  <img src={cherry} style={{ height: '100%', width: '100%' }} />
)
const ApplePicture = () => (
  <img src={apple} style={{ height: '100%', width: '100%' }} />
)

export default createReelGame(React)