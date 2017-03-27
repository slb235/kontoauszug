import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ContentRemove from 'material-ui/svg-icons/content/remove';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';

const styles = {
  indexColumn: {
    width: '2em'
  },
  actionButton: {
    margin: '1em 1em'
  }
};

class FilterEditor extends Component {
  state = {
    addDialogOpen: false,
    fromTextValue: '',
    toTextValue: '',
    selectedRow: null
  };

  handleOpenAddDialog = () => {
    this.setState({ addDialogOpen: true });
  };

  handleCloseAddDialog = () => {
    this.setState({ addDialogOpen: false });
  };

  handleSaveAddDialog = () => {
    this.setState({ addDialogOpen: false });
    this.props.onAddFilter(this.state.fromTextValue, this.state.toTextValue);
  }

  handleFromChange = (event) => {
    this.setState({ fromTextValue: event.target.value });
  }

  handleToChange = (event) => {
    this.setState({ toTextValue: event.target.value });
  }

  handleRowSelection = (selectedRows) => {
    this.setState({ selectedRow: selectedRows.length === 1 ? selectedRows[0] : null });
  }

  handleRemoveFilter = () => {
    if (this.state.selectedRow !== null) {
      this.props.onRemoveFilter(this.state.selectedRow);
    }
  }

  render() {
    const actions = [
      <FlatButton
        label="Abbrechen"
        onTouchTap={this.handleCloseAddDialog}
      />,
      <FlatButton
        label="Speichern"
        primary
        disabled={this.state.fromTextValue.length === 0}
        onTouchTap={this.handleSaveAddDialog}
      />,
    ];

    return (
      <div>
        <Table onRowSelection={this.handleRowSelection}>
          <TableHeader>
            <TableRow>
              <TableHeaderColumn style={styles.indexColumn}>ID</TableHeaderColumn>
              <TableHeaderColumn>Suchen nach</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody>
            {this.props.filter.map((filter, index) => (
              <TableRow key={filter.from}>
                <TableRowColumn style={styles.indexColumn}>{index}</TableRowColumn>
                <TableRowColumn>{filter.from}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <FloatingActionButton
          style={styles.actionButton}
          mini
          onTouchTap={this.handleOpenAddDialog}
        >
          <ContentAdd />
        </FloatingActionButton>
        <FloatingActionButton
          style={styles.actionButton}
          mini
          onTouchTap={this.handleRemoveFilter}
          secondary
        >
          <ContentRemove />
        </FloatingActionButton>
        <Dialog
          title="Filter hinzufügen"
          actions={actions}
          open={this.state.addDialogOpen}
          modal
        >
          <TextField hintText="Suchen nach" fullWidth value={this.state.fromTextValue} onChange={this.handleFromChange} />
        </Dialog>
      </div>
    );
  }
}

export default FilterEditor;
