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
    this.addSubview("div.new-card-form", newCardView);
  },

  addCardSubview: function (card) {
    var cardView = new Hello.Views.Card({ model: card });
    this.addSubview("ul.cards-index", cardView);
  },

  render: function () {
    this.$el.html(this.template({ list: this.model }));
    this.attachSubviews();

    this.onRender();
    return this;
  },

  onRender: function () {
    this.$('ul.cards-index').sortable({
      connectWith: 'ul.cards-index',

      // remove: function (e, ui) {
      //   var oldIndex = ui.item.data('oldIndex');
      //   this.updateOrdsForRemoval(oldIndex);
      // }.bind(this),
      //
      // receive: function (e, ui) {
      //   debugger
      //   var newIndex = ui.item.index();
      //   var id = ui.item.data('id');
      //   var model = this.model.cards().getOrFetch(id);
      //   model.set('ord', newIndex);
      //   this.updateOrdsForReceival(newIndex);
      // }.bind(this),

      start: function (e, ui) {
        var id = ui.item.data('id');
        ui.item.data('oldIndex', ui.item.index());
        // this.model.cards().remove(id);
      }.bind(this),

      update: function (e, ui) {
        var newIndex = ui.item.index();
        var oldIndex = ui.item.data('oldIndex');
        var id = ui.item.data('id');
        // var model = this.model.cards().getOrFetch(id);
        // model.set('ord', newIndex);
        // this.updateOrdsForRemoval(oldIndex);
        // this.updateOrdsForReceival(newIndex);
        // console.log("oldIndex is  " + oldIndex);
        // console.log("newIndex is " + newIndex);
        var up = oldIndex < newIndex;
        this.updateOrds(oldIndex, newIndex, up);
      }.bind(this)
    });
    Backbone.CompositeView.prototype.onRender.call(this);
  },

  updateOrds: function (oldIndex, newIndex, up) {
    this.model.cards().each(function (card) {
      var cardOrd = card.get('ord');
      if (cardOrd === oldIndex) {
        cardOrd = newIndex;
      } else if (cardOrd === newIndex) {
        if (up) {
          cardOrd -= 1;
        } else {
          cardOrd += 1;
        }
      } else {
        var cardOrdTemp = cardOrd;
        if (cardOrd > oldIndex) {
          cardOrd -= 1;
        }

        if (cardOrdTemp > newIndex) {
          cardOrd += 1;
        }
      }
      card.set('ord', cardOrd);
      card.save();
    });
  },

  updateOrdsForRemoval: function (oldIndex) {
    this.model.cards().each(function (card) {
      var cardOrd = card.get('ord');

      if (cardOrd > oldIndex) {
          cardOrd -= 1;
      }

      card.set('ord', cardOrd);
      card.save();
    });
  },

  updateOrdsForReceival: function (newIndex) {
    this.model.cards().each(function (card) {
      var cardOrd = card.get('ord');

      if (cardOrd >= newIndex) {
          cardOrd += 1;
      }

      card.set('ord', cardOrd);
      card.save();
    });
  }
});
