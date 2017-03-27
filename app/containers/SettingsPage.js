import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Layout from '../components/Layout';
import FilterEditor from '../components/FilterEditor';
import * as FilterActions from '../actions/filter';
import * as SettingsActions from '../actions/settings';

const styles = {
  subheader: {
    marginLeft: 0,
    paddingLeft: 0
  },
  textField: {
    marginTop: '-14px'
  }
};

class Settings extends Component {
  handleSettingChange = (event) => {
    this.props.setSetting(event.target.name, event.target.value);
  }

  render() {
    return (
      <Layout>
        <Subheader style={styles.subheader}>Kontonummern für MT-940</Subheader>
        <TextField floatingLabelText="Fidor Bank" fullWidth value={this.props.settings.fidorAccount} name="fidorAccount" onChange={this.handleSettingChange} style={styles.textField} />
        <TextField floatingLabelText="PayPal" fullWidth value={this.props.settings.paypalAccount} name="paypalAccount" onChange={this.handleSettingChange} style={styles.textField} />
        <TextField floatingLabelText="Stripe" fullWidth value={this.props.settings.stripeAccount} name="stripeAccount" onChange={this.handleSettingChange} style={styles.textField} />
        <Subheader style={styles.subheader}>Stripe</Subheader>
        <TextField floatingLabelText="Stripe API Key" fullWidth value={this.props.settings.stripeKey} name="stripeKey" onChange={this.handleSettingChange} style={styles.textField} />
        <Subheader style={styles.subheader}>Paypal</Subheader>
        <TextField floatingLabelText="Paypal API Nutzername" fullWidth value={this.props.settings.paypalUsername} name="paypalUsername" onChange={this.handleSettingChange} style={styles.textField} />
        <TextField floatingLabelText="Paypal API Password" fullWidth value={this.props.settings.paypalPassword} type="password" name="paypalPassword" onChange={this.handleSettingChange} style={styles.textField} />
        <TextField floatingLabelText="Paypal API Signatur" fullWidth value={this.props.settings.paypalSignature} name="paypalSignature" onChange={this.handleSettingChange} style={styles.textField} />

        <Subheader style={styles.subheader}>Verwendungszweck filtern</Subheader>
        <FilterEditor
          filter={this.props.filter}
          onAddFilter={this.props.addFilter}
          onRemoveFilter={this.props.removeFilter}
        />
      </Layout>
    );
  }
}


function mapStateToProps(state) {
  return {
    filter: state.filter,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...SettingsActions, ...FilterActions }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Settings);
