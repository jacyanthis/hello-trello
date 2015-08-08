Hello.Views.BoardsIndex = Backbone.CompositeView.extend({
  template: JST['boards_index'],

  initialize: function () {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "add", this.addBoardSubview);
    this.collection.each(this.addBoardSubview.bind(this));
    window.collection = this;
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
});
