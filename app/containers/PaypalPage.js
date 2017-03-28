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
import FileUpload from 'material-ui/svg-icons/file/file-upload';
import { red900, green900 } from 'material-ui/styles/colors';
import Layout from '../components/Layout';
import * as PaypalActions from '../actions/paypal';

const formatDate = (date) => (moment(date).format('DD.MM.YYYY'));

const styles = {
  button: {
    marginLeft: '1em'
  }
};

class PaypalPage extends Component {


  render() {
    let lastDate;
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
        <List>
          {this.props.paypal.transactionList.map((transaction) => {
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
                  rightToggle={<span>{transaction.balance.toFixed(2).replace('.', ',')}</span>}
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
    paypal: state.paypal
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...PaypalActions }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(PaypalPage);
