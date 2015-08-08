Hello.Views.List = Backbone.CompositeView.extend({
  tagName: "li",

  template: JST["list"],

  initialize: function () {
    this.model.cards().set(this.model.get('cards'));
    // debugger
    this.listenTo(this.model, "sync", this.render);
    this.model.cards().each(this.addCardSubview.bind(this));
  },

  addCardSubview: function (card) {
    var cardView = new Hello.Views.Card({ model: card });
    this.addSubview("ul#cards-index", cardView);
  },

  render: function () {
    this.$el.html(this.template({ list: this.model }));
    this.attachSubviews();

    return this;
  }
});
