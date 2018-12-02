import React from 'react'
import propTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

export const createCustomAppBar = (React) => {


  class CustomAppBar extends React.Component {

    static propTypes = {
      title: propTypes.string
    }

    render() {
      const { title = 'Activity' } = this.props;
      return (
          <AppBar position="static" color="default">
            <Toolbar>
              <Typography variant="h6" color="inherit">
                {title}
              </Typography>
            </Toolbar>
          </AppBar>
      )
    }

  }

  return CustomAppBar

}

export default createCustomAppBar(React)