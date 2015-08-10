Hello.Views.NewCard = Backbone.View.extend({
  template: JST['new_card'],

  tagName: "form",

  events: {
    'submit': 'submit'
  },

  initialize: function (options) {
    // debugger
    this.listId = options.listId;
    this.ord = 0;
  },

  render: function () {
    this.$el.html(this.template({ card: this.model }));

    return this;
  },

  submit: function (e) {
    e.preventDefault();

    var attrs = $(e.target).serializeJSON();
    // debugger
    attrs.list_id = this.listId;
    attrs.ord = this.ord;

    var success = function () {
      this.model.set('ord', this.model.get('id'));
      this.collection.add(this.model);
      this.$el[0].reset();
    }.bind(this);

    function errors(model, response) {
      $('.errors').empty();
      debugger
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
