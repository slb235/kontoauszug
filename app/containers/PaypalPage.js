import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import Dropzone from 'react-dropzone';
import Layout from '../components/Layout';
import * as PaypalActions from '../actions/paypal';
import TransactionList from '../components/TransactionList';

const styles = {
  dropZoneActive: {
    background: '#F1F8E9'
  },
  button: {
    marginLeft: '1em'
  }
};

class PaypalPage extends Component {

  handleFileDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      this.props.parsePaypalFile(acceptedFiles[0].path);
    }
  }

  handleSaveFile = () => {
    this.props.savePaypalFile(this.props.settings.paypalAccount, this.props.paypal.transactionList);
  }

  render() {
    return (
      <Dropzone
        disableClick
        multiple={false}
        style={styles.dropZone}
        activeStyle={styles.dropZoneActive}
        onDrop={this.handleFileDrop}
        disablePreview
      >
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
            disabled={this.props.paypal.transactionList.length === 0 || !this.props.settings.paypalAccount}
            onTouchTap={this.handleSaveFile}
          />
          <TransactionList transactions={this.props.paypal.transactionList} />
        </Layout>
      </Dropzone>
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
