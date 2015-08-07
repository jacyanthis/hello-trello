Hello.Models.Board = Backbone.Model.extend({
  urlRoot: "/api/boards",

  lists: function () {
    if (!this._lists) {
      this._lists = new Hello.Collections.Lists([], { board: this });
    }

    return this._lists;
  }
});
