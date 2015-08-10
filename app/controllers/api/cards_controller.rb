class Api::CardsController < ApplicationController
  def create
    @card = Card.new(card_params)
    if @card.save
      render json: @card
    else
      render json: @card.errors.full_messages, status: :unprocessable_entity
    end
  end

  def update
    @card = Card.find(params[:id])
    if @card.update(card_params)
      render 'show'
    else
      render json: @card.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    @card = Card.find(params[:id])
    @card.destroy
    render 'show'
  end

  private

  def card_params
    params[:card].permit(:title, :ord, :description, :list_id)
  end
end
