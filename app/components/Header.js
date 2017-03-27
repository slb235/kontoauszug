import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import AppBar from 'material-ui/AppBar';
import electron from 'electron';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { goBack, push } from 'react-router-redux';

class Header extends Component {
  static exitApp() {
    electron.remote.app.quit();
  }

  render() {
    const path = this.props.routing.locationBeforeTransitions.pathname;
    const isIndex = path === '/';

    return (
      <AppBar
        title="Kontoauszug-Tool"
        showMenuIconButton={!isIndex}
        iconElementLeft={isIndex ? null :
        <IconButton onTouchTap={this.props.actions.goBack}><NavigationArrowBack /></IconButton>}
        iconElementRight={<IconButton onTouchTap={Header.exitApp}><NavigationClose /></IconButton>}
        style={this.props.style}
      />
    );
  }
}

export default connect((state) => ({ routing: state.routing }), (dispatch) => ({
  actions: bindActionCreators({ push, goBack }, dispatch)
}))(Header);
