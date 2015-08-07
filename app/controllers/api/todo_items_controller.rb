class Api::TodoItemsController < ApplicationController
  def create
    @todo_item = TodoItem.new(todo_item_params)
    if @todo_item.save
      render 'show'
    else
      render json: @todo_item.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @todo_item = TodoItem.find(params[:id])
    if @todo_item.update(todo_item_params)
      render 'show'
    else
      render json: @todo_item.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @todo_item = TodoItem.find(params[:id])
    @todo_item.destroy
    render 'show'
  end

  private

  def todo_item_params
    params[:list].permit(:title, :ord)
  end
end
