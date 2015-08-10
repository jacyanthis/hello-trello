json.(@board, :id, :title)

json.lists @board.lists do |list|
  json.(list, :id, :title, :ord)
  json.cards list.cards do |card|
    json.(card, :id, :title, :description, :ord)
    json.todo_items card.todo_items do |todo_item|
      json.(todo_item, :id, :title, :done)
    end
  end
end
