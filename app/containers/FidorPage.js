import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import TextField from 'material-ui/TextField';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import RaisedButton from 'material-ui/RaisedButton';
import Layout from '../components/Layout';
import * as FidorActions from '../actions/fidor';
import generateFilter from '../lib/filter';
import TransactionList from '../components/TransactionList';

const styles = {
  dropZoneActive: {
    background: '#F1F8E9'
  },
  button: {
    marginLeft: '1em'
  }
};

class FidorPage extends Component {
  handleFileDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      this.props.parseFidorFile(acceptedFiles[0].path);
    }
  }

  handleSaveFile = () => {
    this.props.saveFidorFile(
      this.props.settings.fidorAccount,
      this.props.fidor.balance,
      this.props.fidor.transactionList,
      generateFilter(this.props.filter)
    );
  }

  handleBalanceCahnge = (event) => {
    this.props.setFidorBalance(event.target.value);
  }

  render() {
    const filter = generateFilter(this.props.filter);
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
            onTouchTap={this.props.openFidorFile}
          />
          <RaisedButton
            label="MT940 export"
            secondary
            icon={<FileDownload />}
            style={styles.button}
            disabled={this.props.fidor.transactionList.length === 0 || !this.props.settings.fidorAccount}
            onTouchTap={this.handleSaveFile}
          />
          <br />
          <TextField floatingLabelText="Startsaldo" fullWidth value={this.props.fidor.balance.toFixed(2).replace('.', ',')} onChange={this.handleBalanceCahnge} style={styles.button} type="text" />
          <TransactionList
            transactions={this.props.fidor.transactionList}
            startBalance={this.props.fidor.balance}
            filter={filter}
          />
        </Layout>
      </Dropzone>
    );
  }
}


function mapStateToProps(state) {
  return {
    filter: state.filter,
    fidor: state.fidor,
    settings: state.settings
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...FidorActions }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(FidorPage);
