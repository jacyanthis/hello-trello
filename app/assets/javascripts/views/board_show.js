Hello.Views.BoardShow = Backbone.CompositeView.extend({
  template: JST['board_show'],

  events: {
    'click #new-list': 'renderNewListForm',
    'submit': 'submit'
  },

  initialize: function () {
    // this.$('ul#lists-index').disableSelection();
    this.listenTo(this.model, "sync", this.render);
    this.listenTo(this.model.lists(), "add", this.addListSubview);

    var newList = new Hello.Models.List();
    var newListView = new Hello.Views.NewList({
      model: newList,
      collection: this.model.lists(),
      boardId: this.model.id
    });
    this.addSubview("div#new-list-form", newListView);
  },

  addListSubview: function (list) {
    var listView = new Hello.Views.List({ model: list });
    this.addSubview("ul#lists-index", listView);
  },

  render: function () {
    this.$el.html(this.template({ board: this.model }));
    this.attachSubviews();

    this.onRender();
    return this;
  },

  // setOrds: function () {
  //   var i = 0;
  //   this.$('li').each(function (listItem) {
  //     $(listItem).attr('ord', i);
  //     i += 1;
  //   });
  // },

  onRender: function () {
    this.$('ul#lists-index').sortable({
      // remove: function (e, ui) {
      //   var new_position
      //
      //   // update ords of starting list
      // }.bind(this),
      //
      // receive: function (e, ui) {
      //   // update ords of receiving list
      // }.bind(this)
      start: function (e, ui) {
        ui.item.data('oldIndex', ui.item.index());
      },

      update: function (e, ui) {
        var newIndex = ui.item.index();
        var oldIndex = ui.item.data('oldIndex');
        this.updateOrds(oldIndex, newIndex);
      }.bind(this)
    });
    Backbone.CompositeView.prototype.onRender.call(this);
  },

  updateOrds: function (oldIndex, newIndex) {
    this.model.lists().each(function (list) {
      var listOrd = list.get('ord');

      if (listOrd === oldIndex) {
        listOrd = newIndex;
      } else {
        var listOrdTemp = listOrd;
        if (listOrd > oldIndex) {
          listOrd -= 1;
        }
        if (listOrdTemp >= newIndex) {
          listOrd += 1;
        }
      }
      
      list.set('ord', listOrd);
      list.save();
    });
  }
});
