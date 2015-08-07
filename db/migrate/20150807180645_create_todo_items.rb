class CreateTodoItems < ActiveRecord::Migration
  def change
    create_table :todo_items do |t|
      t.string :title, null: false
      t.boolean :done, null: false
      t.integer :card_id, null: false

      t.timestamps null: false
    end

    add_index :todo_items, :card_id
  end
end
