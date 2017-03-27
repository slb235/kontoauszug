import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Dropzone from 'react-dropzone';
import moment from 'moment';
import TextField from 'material-ui/TextField';
import Subheader from 'material-ui/Subheader';
import Chip from 'material-ui/Chip';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import Avatar from 'material-ui/Avatar';
import RaisedButton from 'material-ui/RaisedButton';
import { List, ListItem } from 'material-ui/List';
import { red900, green900 } from 'material-ui/styles/colors';
import Layout from '../components/Layout';
import * as FidorActions from '../actions/fidor';
import { findInvoiceNumber } from '../lib/fidor';
import generateFilter from '../lib/filter';

const styles = {
  dropZone: {
    minHeight: '100vh'
  },
  dropZoneActive: {
    background: '#F1F8E9'
  },
  button: {
    marginLeft: '1em'
  }
};

class FidorPage extends Component {
  handleFileDrop = (acceptedFiles) => {
    console.log(acceptedFiles);
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
    let lastDate;
    const filter = generateFilter(this.props.filter);
    let balance = this.props.fidor.balance;
    return (
      <Dropzone
        disableClick
        multiple={false}
        style={styles.dropZone}
        activeStyle={styles.dropZoneActive}
        onDrop={this.handleFileDrop}
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
            disabled={this.props.fidor.transactionList.length < 1}
            onTouchTap={this.handleSaveFile}
          />
          <br />
          <TextField floatingLabelText="Startsaldo" fullWidth value={this.props.fidor.balance.toFixed(2).replace('.', ',')} onChange={this.handleBalanceCahnge} style={styles.button} type="text" />
          <List>
            {this.props.fidor.transactionList.map((transaction) => {
              balance += transaction.value;
              const description = filter(transaction.description);
              let dateHeader = null;
              if (new Date(transaction.date).getTime() !== new Date(lastDate).getTime()) {
                lastDate = transaction.date;
                dateHeader = (<Subheader>{moment(lastDate).format('DD.MM.YYYY')}</Subheader>);
              }
              const invoiceNr = findInvoiceNumber(description);
              let invoiceNrChip = null;
              if (invoiceNr) {
                invoiceNrChip = (<Chip style={{ display: 'inline-flex', margin: '0 1em' }}><Avatar color={green900} icon={<ContentInbox />} />{invoiceNr}</Chip>);
              }

              return (
                <div key={description}>
                  {dateHeader}
                  <ListItem
                    leftIcon={
                      transaction.value > 0 ?
                        <ContentAdd color={green900} />
                      : <ContentRemove color={red900} />
                    }
                    primaryText={(
                      <div>
                        <span>{Math.abs(transaction.value).toFixed(2).replace('.', ',')}</span>
                        {invoiceNrChip}
                      </div>
                    )}
                    secondaryText={description}
                    rightToggle={<span style={styles.money}>{balance.toFixed(2).replace('.', ',')}</span>}
                  />
                </div>);
            })}
          </List>
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
