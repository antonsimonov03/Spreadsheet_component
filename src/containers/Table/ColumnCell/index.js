import React from 'react';

const COLUMN_URL = 'http://localhost:3001/table/column';

export default class ColumnCell extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title,
      _id: props._id
    }
  }

  onChangeTitle = (e) => {
    this.setState({
      title: e.target.value
    }, this.refreshDB);
  }

  refreshDB = () => {
    let { title, _id } = this.state;
    fetch(COLUMN_URL, {
      method: 'PUT',
      headers: {
        'content-type': 'Application/json'
      },
      body: JSON.stringify({ _id, title })
    })
  }

  render() {
    return (
      <td className="column">
        <input
          type="text"
          value={this.state.title}
          onChange={this.onChangeTitle}
        />
      </td>
    )
  }
}