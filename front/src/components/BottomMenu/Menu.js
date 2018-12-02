import React from 'react'
import propTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styles from './styles/Menu.css'

export const createMenu = () => {


  class Menu extends React.Component {

    static propTypes = {
      routes: propTypes.array.isRequired
    }

    render() {
      const { routes } = this.props
      return (
        <div className={styles['menu-container']}>
          {
            routes.map(route => (
              <div className={styles['menu-container__link']}>
                <Link
                style={{textDecoration:'none'}} 
                to={route.to}>{route.name}</Link>
              </div>
            ))
          }
        </div>
      )
    }

  }

  return Menu

}

export default createMenu()