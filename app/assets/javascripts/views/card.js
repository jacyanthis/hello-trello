Hello.Views.Card = Backbone.View.extend({
  tagName: "li",
  className: "card",

  template: JST["card"],

  initialize: function () {
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model, "sync", this.setIdData);
  },

  render: function () {
    this.$el.html(this.template({ card: this.model }));

    return this;
  },

  setIdData: function () {
    this.$el.data('id', this.model.get('id'));
  }
});
