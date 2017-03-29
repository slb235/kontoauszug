import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import ContentCloudDownload from 'material-ui/svg-icons/file/cloud-download';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import Layout from '../components/Layout';
import TransactionList from '../components/TransactionList';
import * as StripeActions from '../actions/stripe';

const formatDate = (date) => (moment(date).format('DD.MM.YYYY'));

const styles = {
  button: {
    marginLeft: '1em'
  }
};

class StripePage extends Component {
  state = {
    open: false,
  };

  handleFromChange = (event, date) => {
    this.props.setFrom(date);
  }

  handleToChange = (event, date) => {
    this.props.setTo(date);
  }

  handleFetchData = () => {
    this.handleCloseDialog();
    this.props.fetchTransactions(
      this.props.settings.stripeKey,
      this.props.stripe.from,
      this.props.stripe.to
      );
  }

  handleSaveFile = () => {
    this.props.saveStripeFile(
      this.props.settings.stripeAccount,
      this.props.stripe.transactionList
    );
  }

  handleOpenDialog = () => {
    this.setState({ open: true });
  }

  handleCloseDialog = () => {
    this.setState({ open: false });
  };


  render() {
    const actions = [
      <FlatButton
        label="Abbrechen"
        onTouchTap={this.handleCloseDialog}
      />,
      <FlatButton
        label="Laden"
        primary
        disabled={!this.props.stripe.from || !this.props.stripe.to}
        onTouchTap={this.handleFetchData}
      />,
    ];


    return (
      <Layout>
        <RaisedButton
          label="Transaktionen laden"
          primary
          icon={<ContentCloudDownload />}
          onTouchTap={this.handleOpenDialog}
          style={styles.button}
          disabled={!this.props.settings.stripeKey}
        />
        <RaisedButton
          label="MT940 export"
          secondary
          icon={<FileDownload />}
          onTouchTap={this.handleSaveFile}
          style={styles.button}
          disabled={this.props.stripe.transactionList.length === 0 || !this.props.settings.stripeAccount}
        />
        <TransactionList transactions={this.props.stripe.transactionList} />
        <Dialog
          title="Transactionen laden"
          actions={actions}
          modal
          open={this.state.open}
        >
          <DatePicker floatingLabelText="Von" formatDate={formatDate} value={this.props.stripe.from ? new Date(this.props.stripe.from) : undefined} onChange={this.handleFromChange} />
          <DatePicker floatingLabelText="Bis" formatDate={formatDate} value={this.props.stripe.to ? new Date(this.props.stripe.to) : undefined} onChange={this.handleToChange} />
        </Dialog>

      </Layout>
    );
  }
}


function mapStateToProps(state) {
  return {
    settings: state.settings,
    stripe: state.stripe
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...StripeActions }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(StripePage);
