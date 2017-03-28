import React, { Component } from 'react';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import ContentInbox from 'material-ui/svg-icons/content/inbox';
import { red900, green900 } from 'material-ui/styles/colors';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import moment from 'moment';
import formatter from 'number-formatter';


const findInvoiceNumber = (text) => {
  const result = text.match(/\bRE-AB-\d{6}-\d{4,5}\b/);
  return result ? result[0] : null;
};

const formatDate = (date) => (moment(date).format('DD.MM.YYYY'));
const formatCurrency = (num) => (formatter('#.##0,00', num));

const styles = {
  balance: {
    textAlign: 'right',
    paddingRight: '1em',
    width: '10em'
  }
};

class TransactionList extends Component {
  render() {
    const { transactions, filter, startBalance } = this.props;
    let lastDate;
    return (
      <List>
        {transactions.map((transaction) => {
          const description = filter ? filter(transaction.description) : transaction.description;
          let dateHeader = null;
          if (formatDate(transaction.date) !== formatDate(lastDate)) {
            lastDate = transaction.date;
            dateHeader = (<Subheader>{formatDate(lastDate)}</Subheader>);
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
                    <span>{formatCurrency(Math.abs(transaction.value))}</span>
                    {invoiceNrChip}
                  </div>
                )}
                secondaryText={description}
                rightToggle={<span style={styles.balance}>{formatCurrency(transaction.balance)}</span>}
              />
            </div>);
        })}
      </List>
    );
  }
}

export default TransactionList;
