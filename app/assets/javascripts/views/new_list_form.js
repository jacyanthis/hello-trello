Hello.Views.NewList = Backbone.View.extend({
  template: JST['new_list'],

  tagName: "form",

  events: {
    'submit': 'submit'
  },

  initialize: function (options) {
    this.boardId = options.boardId;
    this.ord = 0;
  },

  render: function () {
    this.$el.html(this.template({ list: this.model }));

    return this;
  },

  submit: function (e) {
    e.preventDefault();

    var attrs = $(e.target).serializeJSON();
    attrs.board_id = this.boardId;
    attrs.ord = this.ord;

    var success = function () {
      this.collection.add(this.model);
      this.$el[0].reset();
    }.bind(this);

    function errors(model, response) {
      $('.errors').empty();
      response.responseJSON.forEach(function (el) {
        var $li = $('<li></li>');
        $li.text(el);
        $('.errors').append($li);
      }.bind(this));
    }

    this.model.save(attrs, {
      wait: true,
      success: success,
      error: errors.bind(this)
    });
  }
});
