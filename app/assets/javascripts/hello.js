window.Hello = {
  Models: {},
  Collections: {},
  Views: {},
  Routers: {},
  initialize: function() {
    var $rootEl = $('#boardRoot');
    var $tabs = $('#boardTabs');
    var boards = new Hello.Collections.Boards();
    boards.fetch();

    var boardsIndexView = new Hello.Views.BoardsIndex({
      collection: boards
    });
    $tabs.html(boardsIndexView.render().$el);

    new Hello.Routers.BoardRouter(boards, $rootEl);
    Backbone.history.start();
  }
};
