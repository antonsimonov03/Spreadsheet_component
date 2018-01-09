import React from 'react';

import Cell from '../Cell';

export default class Row extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cells: props.cells
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      cells: nextProps.cells
    })
  }

  renderCells() {
    return this.state.cells.map(cell =>
      <Cell
        colInfo={cell.colInfo}
        loadTableData={this.props.loadTableData}
        cellsInRow={this.state.cells}
        title={cell.title}
        _id={cell._id}
      />
    )
  }


  render() {
    return (
      <tr className="row">
        {this.renderCells()}
      </tr>
    )
  }
}