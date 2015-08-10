Hello.Views.BoardNew = Backbone.View.extend({
  template: JST['board_new'],

  tagName: "form",

  events: {
    'submit': 'submit'
  },

  render: function () {
    this.$el.html(this.template({ board: this.model }));

    return this;
  },

  submit: function (e) {
    e.preventDefault();

    var attrs = $(e.target).serializeJSON();


    var success = function (model) {
      this.collection.add(this.model);
      debugger
      Backbone.history.navigate("/boards/" + this.model.id, { trigger: true });
    }.bind(this);

    function errors(model, response) {
      $('.errors').empty();
      response.responseJSON.forEach(function (el) {
        var $li = $('<li></li>');
        $li.text(el);
        $('.errors').append($li);
      }.bind(this));
    }

    this.model.set(attrs);
    this.model.save({}, {
      wait: true,
      success: success,
      error: errors.bind(this)
    });
  }
});
