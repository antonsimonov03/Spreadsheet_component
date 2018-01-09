var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TableSchema = new Schema({
  title: { type: String },
  row: [{ title: String }],
  order: Number
});

const TableModel = mongoose.model('Table', TableSchema);

TableModel.createDefault = () => {
  const titles = ['Text', 'Number 1', 'Number 2', 'Sum', 'Dropdown'];
  const count = 5;
  const result = [];
  let order = 0;
  for(let title of titles) {
    let subTitle = new TableModel();
    subTitle.title = title;
    subTitle.order = order;
    for(let i = 0; i < count; i++) {
        subTitle.row.push({ title: title + i });
    }
  
    result.push(subTitle.save());
    order++;
  }
  return Promise.all(result);
};

TableSchema.pre('save', function (next) {
  var doc = this;
  TableModel.find({}, (err, docs) => {
    let length = docs.length;
    doc.order = length;

    next();
  })
});

module.exports = TableModel;