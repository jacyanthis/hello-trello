class Api::BoardsController < ApplicationController
  def index
    @boards = Board.all
  end

  def show
    @board = Board.find(params[:id])
  end

  def create
    @board = Board.new(board_params)
    if @board.save
      render 'show'
    else
      render json: @board.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @board = Board.find(params[:id])
    if @board.update(board_params)
      render 'show'
    else
      render json: @board.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @board = Board.find(params[:id])
    @board.destroy
    render 'show'
  end

  private

  def board_params
    board_params = params[:board].permit(:title)
    board_params[:user_id] = current_user.id
    board_params
  end
end
