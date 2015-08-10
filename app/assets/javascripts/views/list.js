Hello.Views.List = Backbone.CompositeView.extend({
  tagName: "li",

  template: JST["list"],

  initialize: function () {
    this.model.cards().set(this.model.get('cards'));
    // debugger
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.cards(), "add", this.addCardSubview);
    this.model.cards().each(this.addCardSubview.bind(this));

    var newCard = new Hello.Models.Card();

    var newCardView = new Hello.Views.NewCard({
      model: newCard,
      collection: this.model.cards(),
      listId: this.model.id
    });
    this.addSubview("div#new-card-form", newCardView);
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
