Hello.Models.Board = Backbone.Model.extend({
  urlRoot: "/api/boards",

  parse: function (response) {
    // debugger
    if (response.lists) {
      response.lists.sort(function (l1, l2) {
        if (l1.ord > l2.ord) {
          return 1;
        }
        if (l2.ord < l1.ord) {
          return -1;
        }

        return 0;
      });
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
