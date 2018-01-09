import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Row from './Row';
import ColumnCell from './ColumnCell';

import './index.css';

const LOAD_TABLE = 'http://localhost:3001/table';
const COLUMN_URL = 'http://localhost:3001/table/column';
const ROW_URL = 'http://localhost:3001/table/row'

class TablePage extends React.Component {
  state = {
    isLoading: true,
    columns: [],
    rows: []
  }

  componentDidMount() {
    this.loadTableData();
  }

  loadTableData = () => {
    fetch(LOAD_TABLE)
    .then(res =>
      res.json()
      .then(answer => {
        let columns = [];
        let rows = [];

        answer.forEach(col => {
          columns.push({ ...col });
          col.row.forEach((cell, i) => {
            if (!rows[i]) {
              rows[i] = [];
            }

            cell.colInfo = { ...col };

            rows[i].push(cell);
          })
        })

        this.setState({
          isLoading: false,
          columns,
          rows
        })
      })
    )
  }

  renderColumns() {
    return this.state.columns.map(col => {
      return (
        <ColumnCell loadTableData={this.loadTableData} title={col.title} _id={col._id}/>
      )
    })
  }

  renderRows() {
    return this.state.rows.map(row => {
      return (
        <Row
          cells={row}
          loadTableData={this.loadTableData}
        />
      )
    })
  }

  addColumn = () => {
    fetch(COLUMN_URL, {
      method: 'POST'
    })
    .then(answer => {
      if (answer.status === 201) {
        this.loadTableData();
      }
    })
  }

  addRow = () => {
    fetch(ROW_URL, {
      method: 'POST'
    })
    .then(answer => {
      if (answer.status === 201) {
        this.loadTableData();
      }
    })
  }

  deleteColumn = () => {
    let lastCol = this.state.columns[this.state.columns.length - 1];

    fetch(COLUMN_URL, {
      method: 'DELETE',
      headers: {
        'content-type': 'Application/json'
      },
      body: JSON.stringify({ _id: lastCol._id })
    })
    .then(res => {
      this.loadTableData();
    })
  }

  deleteRow = () => {
    fetch(ROW_URL, {
      method: 'DELETE'
    })
    .then(res => {
      this.loadTableData();
    })
  }

  render() {
    return (
      !this.props.isLoading 
      ? <div className="content">
          <Link to="/create-session">Auth page</Link>
          {
            this.props.isAuthenticated
            ? <div>
                <h2>Table page</h2>
                {
                  this.state.isLoading
                    ? <h2>Loading table...</h2>
                    : <div>               
                        <table>
                          <tr className="columnRow">
                            {this.renderColumns()}
                          </tr>
                          {this.renderRows()}
                        </table>
                        <button onClick={this.addColumn}>Add column</button>
                        <button onClick={this.addRow}>Add row</button>
                        <button onClick={this.deleteColumn}>Delete last column</button>
                        <button onClick={this.deleteRow}>Delete last row</button>
                      </div>
                }
              </div>
            : <h2>You are not logged in!</h2>
          }
          
        </div>
      : <h2>Loading...</h2>
    )
  }
}

export default connect(({ auth }) => {
  return { ...auth }
})(TablePage);