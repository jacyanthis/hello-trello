Hello.Collections.Boards = Backbone.Collection.extend({
  url: "/api/boards",
  model: Hello.Models.Board,

  getOrFetch: function (id) {
    var boards = this;
    var board = boards.get(id);

    if (board) {
      board.fetch();
    } else {
      board = new boards.model({ id: id });
      boards.add(board);
      board.fetch({
        error: function () { boards.remove(board); }
      });
    }

    return board;
  }
});
