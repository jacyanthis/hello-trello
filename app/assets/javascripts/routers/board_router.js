Hello.Routers.BoardRouter = Backbone.Router.extend({
  initialize: function (boards, $rootEl) {
    this.collection = boards;
    this.$rootEl = $rootEl;
  },

  routes: {
    "": "boardsIndex",
    "boards/new": "boardNew",
    "boards/:id": "boardShow"
  },

  boardsIndex: function () {
    this.$rootEl.empty();
  },

  boardShow: function (id) {
    var board = this.collection.getOrFetch(id);
    var view = new Hello.Views.BoardShow({ model: board });
    this.swap(view);
  },

  boardNew: function () {
    var board = new Hello.Models.Board();
    var view = new Hello.Views.BoardNew({
      model: board,
      collection: this.collection
    });
    this.swap(view);
  },

  swap: function (view) {
    this._view && this._view.remove();
    this._view = view;
    this.$rootEl.html(view.render().$el);
  }
});
