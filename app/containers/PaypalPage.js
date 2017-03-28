import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import Layout from '../components/Layout';
import * as PaypalActions from '../actions/paypal';
import TransactionList from '../components/TransactionList';

const styles = {
  button: {
    marginLeft: '1em'
  }
};

class PaypalPage extends Component {
  handleSaveFile = () => {
    this.props.savePaypalFile(this.props.settings.paypalAccount, this.props.paypal.transactionList);
  }

  render() {
    return (
      <Layout>
        <RaisedButton
          label="CSV öffnen"
          primary
          icon={<FileUpload />}
          style={styles.button}
          onTouchTap={this.props.openPaypalFile}
        />
        <RaisedButton
          label="MT940 export"
          secondary
          icon={<FileDownload />}
          style={styles.button}
          onTouchTap={this.handleSaveFile}
        />
        <TransactionList transactions={this.props.paypal.transactionList} />
      </Layout>
    );
  }
}


function mapStateToProps(state) {
  return {
    settings: state.settings,
    paypal: state.paypal
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...PaypalActions }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(PaypalPage);
