// @flow
import React, { Component } from 'react';
import Layout from '../components/Layout';
import Home from '../components/Home';

export default class HomePage extends Component {
  render() {
    return (
      <Layout>
        <Home />
      </Layout>
    );
  }
}
