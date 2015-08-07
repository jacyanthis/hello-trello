json.(@board, :title)

json.lists @board.lists do |list|
  json.(list, :title, :ord)
  json.cards list.cards do |card|
    json.(card, :title, :description, :ord)
    json.todo_items card.todo_items do |todo_item|
      json.(todo_item, :title, :done)
    end
  end
end
