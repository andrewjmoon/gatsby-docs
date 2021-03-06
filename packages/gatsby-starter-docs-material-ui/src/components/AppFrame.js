import React from 'react';
import PropTypes from 'prop-types';
import compose from 'recompose/compose';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
// import CssBaseline from '@material-ui/core/CssBaseline';
import MenuIcon from '@material-ui/icons/Menu';
import LightbulbOutlineIcon from '../svgIcons/LightbulbOutline';
import LightbulbFullIcon from '../svgIcons/LightbulbFull';
import AppDrawer from './AppDrawer';
import AppSearch from './AppSearch';
// import DocSearchBox from './DocSearchBox';
import { connect } from 'react-redux';
import actionTypes from '../redux/actionTypes';
import { PageContext } from '../templates/pageContext';


const styles = theme => ({
  root: {
    display: 'flex',
  },
  grow: {
    flex: '1 1 auto',
  },
  title: {
    marginLeft: 12,
    flex: '0 1 auto',
    fontWeight: theme.typography.fontWeightMedium,
  },
  img: {
    width: 170,
    marginTop: 7,
  },
  appBar: {
    transition: theme.transitions.create('width'),
    '@media print': {
      position: 'absolute',
    },
  },
  appBarHome: {
    boxShadow: 'none',
  },
  appBarShift: {
    [theme.breakpoints.up('lg')]: {
      width: 'calc(100% - 240px)',
    },
  },
  drawer: {
    [theme.breakpoints.up('lg')]: {
      width: 240,
    },
  },
  navIconHide: {
    [theme.breakpoints.up('lg')]: {
      display: 'none',
    },
  },
});

class AppFrame extends React.Component {
  state = {
    mobileOpen: false,
  };

  handleDrawerOpen = () => {
    this.setState({ mobileOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ mobileOpen: false });
  };

  handleTogglePaletteType = () => {
    //console.log(this.props.uiTheme.paletteType);
    this.props.dispatch({
      type: actionTypes.THEME_CHANGE_PALETTE_TYPE,
      payload: {
        paletteType: this.props.uiTheme.paletteType === 'light' ? 'dark' : 'light',
      },
    });
  };

  render() {
    const { children, classes, uiTheme } = this.props;
    //console.log("AppFrame:")
    //console.log(uiTheme)
    const title = '';
    let disablePermanent = false;
    let navIconClassName = '';
    let appBarClassName = classes.appBar;

    if (title === null) {
      // home route, don't shift app bar or dock drawer
      disablePermanent = true;
      appBarClassName += ` ${classes.appBarHome}`;
    } else {
      navIconClassName = classes.navIconHide;
      appBarClassName += ` ${classes.appBarShift}`;
    }

    return (
      <PageContext.Consumer>
        {({data}) => (
         <div className={classes.root}>
        
        <AppBar className={appBarClassName}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={navIconClassName}
            >
              <MenuIcon />
            </IconButton>
            {title !== null && (
              <Typography className={classes.title} variant="h5" color="inherit" noWrap>
               {data.currentPage.edges.length > 0 && data.currentPage.edges[0].node.context && data.currentPage.edges[0].node.context.title != null ? data.currentPage.edges[0].node.context.title : 'DOCS'}
              </Typography>
            )}
            <div className={classes.grow} />            
            <AppSearch />
            <Tooltip title="Toggle light/dark theme" enterDelay={300}>
              <IconButton
                color="inherit"
                onClick={this.handleTogglePaletteType}
                aria-label="Toggle light/dark theme"
              >
                {uiTheme.paletteType === 'light' ? <LightbulbFullIcon /> : <LightbulbOutlineIcon /> }
              </IconButton>
            </Tooltip>    
          </Toolbar>
        </AppBar>
        <AppDrawer
          className={classes.drawer}
          disablePermanent={disablePermanent}
          onClose={this.handleDrawerClose}
          onOpen={this.handleDrawerOpen}
          mobileOpen={this.state.mobileOpen}
          currentPage={data.currentPage && data.currentPage.edges.length > 0 ? data.currentPage.edges[0].node : null}
        />
        {children}
      </div>
      )}
      </PageContext.Consumer>
     
    );
  }
}

AppFrame.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  uiTheme: PropTypes.object.isRequired,
};

export default compose(
  withStyles(styles),
  connect(state => ({
    uiTheme: state.theme,
  })),
)(AppFrame);
