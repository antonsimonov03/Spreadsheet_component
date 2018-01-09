import React from 'react';
import _ from 'lodash';

const CELL_URL = 'http://localhost:3001/table/cell';

export default class Cell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      _id: props._id
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      title: nextProps.title
    })
  }

  onChangeTitle = (e) => {
    this.setState({
      title: e.target.value
    }, this.refreshDB)
  }

  refreshDB = () => {
    let { title, _id } = this.state;
    fetch(CELL_URL, {
      method: 'PUT',
      headers: {
        'content-type': 'Application/json'
      },
      body: JSON.stringify({ _id, title })
    })
    .then(res => {
      let { colInfo, cellsInRow } = this.props;
      if (colInfo.isNumberOne || colInfo.isNumberTwo) {
        let sumCell = _.find(cellsInRow, cell => cell.colInfo.isSum);
        let { _id } = sumCell;
        let numCell = null;

        if (colInfo.isNumberOne) {
          numCell = _.find(cellsInRow, (cell) =>
            cell.colInfo.isNumberTwo
          )
        } else {
          numCell = _.find(cellsInRow, (cell) =>
            cell.colInfo.isNumberOne
          )
        }
        
        let sum = Number(title) + Number(numCell.title);

        return fetch(CELL_URL, {
          method: 'PUT',
          headers: {
            'content-type': 'Application/json'
          },
          body: JSON.stringify({ _id, title: sum })
        })
        .then(res => 
          this.props.loadTableData()
        )
      }
    })
  }

  isNumberField() {
    let { colInfo } = this.props;
    return colInfo.isNumberOne || colInfo.isNumberTwo || colInfo.isSum
  }

  renderSelect() {
    return (
      <select onChange={this.onChangeTitle} value={this.state.title}>
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>
    )
  }

  getSuitElement() {
    let { colInfo } = this.props;
    if (colInfo.isDropdown) {
      return this.renderSelect();
    } else {
      let type = this.isNumberField()
        ? 'number'
        : 'text'

      return (
        <input
          type={type}
          value={this.state.title}
          onChange={e => this.setState({ title: e.target.value })}
          onBlur={this.onChangeTitle}
          disabled={colInfo.isSum}
        />
      )
    }
  }

  render() {
    return (
      <td>
        {this.getSuitElement()}
      </td>
    )
  }
}