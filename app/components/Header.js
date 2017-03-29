import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import AppBar from 'material-ui/AppBar';
import electron from 'electron';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { goBack, push } from 'react-router-redux';

const styles = {
  bar: {
    WebkitUserSelect: 'none',
    WebkitAppRegion: 'drag'
  },
  button: {
    WebkitAppRegion: 'no-drag'
  }
};

class Header extends Component {
  static exitApp() {
    electron.remote.app.quit();
  }

  render() {
    const path = this.props.routing.locationBeforeTransitions.pathname;
    const isIndex = path === '/';
    let title;
    let color;
    switch (path) {
      case '/paypal':
        title = 'PayPal';
        color = '#1C668A';
        break;
      case '/stripe':
        title = 'Stripe';
        color = '#5E74E0';
        break;
      case '/fidor':
        title = 'Fidor Bank';
        color = '#7CAC03';
        break;
      case '/settings':
        title = 'Einstellungen';
        color = '#EB1E1E';
        break;
      default:
        title = 'Kontoauszug';
        color = '#000';
    }

    return (
      <AppBar
        title={title}
        showMenuIconButton={!isIndex}
        iconElementLeft={isIndex ? null :
        <IconButton onTouchTap={this.props.actions.goBack} style={styles.button}><NavigationArrowBack /></IconButton>}
        iconElementRight={<IconButton onTouchTap={Header.exitApp} style={styles.button}><NavigationClose /></IconButton>}
        style={{ ...this.props.style, ...styles.bar, backgroundColor: color }}
      />
    );
  }
}

export default connect((state) => ({ routing: state.routing }), (dispatch) => ({
  actions: bindActionCreators({ push, goBack }, dispatch)
}))(Header);
