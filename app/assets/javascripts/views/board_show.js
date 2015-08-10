Hello.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['board_show'],

  events: {
    'click #new-list': 'renderNewListForm',
    'submit': 'submit'
  },

  initialize: function () {
    // this.$('ul#lists-index').disableSelection();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addListSubview);

    var newList = new Hello.Models.List();
    var newListView = new Hello.Views.NewList({
      model: newList,
      collection: this.model.lists(),
      boardId: this.model.id
    });
    this.addSubview("div#new-list-form", newListView);
  },

  addListSubview: function (list) {
    var listView = new Hello.Views.List({ model: list });
    this.addSubview("ul#lists-index", listView);
  },

  render: function () {
    this.$el.html(this.template({ board: this.model }));
    this.attachSubviews();

    this.onRender();
    return this;
  },

  onRender: function () {
    this.$('ul#lists-index').sortable();
    Backbone.CompositeView.prototype.onRender.call(this);
  }
});
