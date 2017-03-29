import React, { Component } from 'react';
import Header from '../components/Header';

const styles = {
  bodyWrapper: {
    marginTop: '64px',
    padding: '1em 2em 1em 1em',
    overflowY: 'auto',
    height: 'calc(100vh - 64px)'
  },
  header: {
    position: 'fixed',
    top: 0
  }
};

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Header style={styles.header} />
        <div style={styles.bodyWrapper}>
          {this.props.children}
        </div>
      </div>
    );
  }
}
