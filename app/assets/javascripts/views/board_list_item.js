Hello.Views.BoardListItem = Backbone.CompositeView.extend({
  tagName: "li",

  template: JST["board_list_item"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.html(this.template({ board: this.model }));

    return this;
  }
});
