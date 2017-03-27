import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';
import ContentCloudDownload from 'material-ui/svg-icons/file/cloud-download';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FileDownload from 'material-ui/svg-icons/file/file-download';
import { red900, green900 } from 'material-ui/styles/colors';
import Layout from '../components/Layout';
import * as StripeActions from '../actions/stripe';

const formatDate = (date) => (moment(date).format('DD.MM.YYYY'));

class StripePage extends Component {
  handleFromChange = (event, date) => {
    this.props.setFrom(date);
  }

  handleToChange = (event, date) => {
    this.props.setTo(date);
  }

  handleFetchData = () => {
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


  render() {
    let lastDate;
    let balance = 0;
    return (
      <Layout>
        <DatePicker hintText="Von" formatDate={formatDate} value={this.props.stripe.from ? new Date(this.props.stripe.from) : undefined} onChange={this.handleFromChange} />
        <DatePicker hintText="Bis" formatDate={formatDate} value={this.props.stripe.to ? new Date(this.props.stripe.to) : undefined} onChange={this.handleToChange} />
        <RaisedButton
          label="Transaktionen laden"
          primary
          icon={<ContentCloudDownload />}
          onTouchTap={this.handleFetchData}
        />
        <RaisedButton
          label="MT940 export"
          secondary
          icon={<FileDownload />}
          onTouchTap={this.handleSaveFile}
        />
        <List>
          {this.props.stripe.transactionList.map((transaction) => {
            balance += transaction.value;
            // const description = filter(transaction.description);
            let dateHeader = null;
            if (moment(transaction.date).format('DD.MM.YYYY') !== moment(lastDate).format('DD.MM.YYYY')) {
              lastDate = transaction.date;
              dateHeader = (<Subheader>{moment(lastDate).format('DD.MM.YYYY')}</Subheader>);
            }
            // const invoiceNr = findInvoiceNumber(description);
            // let invoiceNrChip = null;
            // if (invoiceNr) {
            // invoiceNrChip = (<Chip style={{ display: 'inline-flex', margin: '0 1em' }}><Avatar color={green900} icon={<ContentInbox />} />{invoiceNr}</Chip>);
            // }

            return (
              <div key={transaction.description}>
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
                      {/* invoiceNrChip */}
                    </div>
                  )}
                  secondaryText={transaction.description}
                  rightToggle={<span>{balance.toFixed(2)}</span>}
                />
              </div>);
          })}
        </List>
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
