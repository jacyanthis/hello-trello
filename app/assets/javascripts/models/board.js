Hello.Models.Board = Backbone.Model.extend({
  urlRoot: "/api/boards",

  parse: function (response) {
    // debugger
    if (response.lists) {
      this.lists().set(response.lists);
      delete response.lists;
    }

    return response;
  },

  lists: function () {
    if (!this._lists) {
      this._lists = new Hello.Collections.Lists([], { board: this });
    }

    return this._lists;
  }
});
