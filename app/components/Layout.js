import React, { Component } from 'react';
import Header from '../components/Header';

const styles = {
  bodyWrapper: {
    margin: '75px 1em'
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
