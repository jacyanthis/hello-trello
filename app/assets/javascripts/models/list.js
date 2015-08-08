Hello.Models.List = Backbone.Model.extend({
  urlRoot: "api/lists",

  // parse: function (response) {
  //   if (response.cards) {
  //     this.cards().set(response.cards);
  //     delete response.cards;
  //   }
  //
  //   return response;
  // },
  //
  cards: function () {
    if (!this._cards) {
      this._cards = new Hello.Collections.Cards([], { board: this });
    }

    return this._cards;
  }
});
