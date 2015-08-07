Hello.Views.BoardListItem = Backbone.View.extend({
  tagName: "li",

  template: JST["board_list_item"],

  render: function () {
    this.$el.append(this.template({ board: this.model }));

    return this;
  }
});
