Hello.Collections.Cards = Backbone.Collection.extend({
  url: "api/cards",

  model: Hello.Models.Card,

  comparator: "ord",

  getOrFetch: function (id) {
    var cards = this;
    var card = cards.get(id);

    if (card) {
      card.fetch();
    } else {
      card = new cards.model({ id: id });
      cards.add(card);
      card.fetch({
        error: function () { cards.remove(card); }
      });
    }

    return card;
  }
});
