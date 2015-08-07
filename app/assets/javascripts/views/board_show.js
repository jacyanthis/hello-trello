Hello.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['board_show'],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addListSubview);
    this.collection.each(this.addListSubview.bind(this));
  },

  render: function () {
    this.$el.html(this.template({ board: this.model }));


    return this;
  }
});

template: JST['boards_index'],

initialize: function () {
  this.listenTo(this.collection, "sync", this.render);
  this.listenTo(this.collection, "add", this.addBoardSubview);
  this.collection.each(this.addBoardSubview.bind(this));
},


addBoardSubview: function (board) {
  var boardListItem = new Hello.Views.BoardListItem({
    model: board
  });
  this.addSubview("ul.boards-index", boardListItem);
},

render: function () {
  this.$el.html(this.template({ board: this.collection }));
  this.attachSubviews();

  return this;
}
