Hello.Views.Card = Backbone.View.extend({
  tagName: "li",

  template: JST["card"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
  },

  render: function () {
    this.$el.append(this.template({ card: this.model }));

    return this;
  }
});
