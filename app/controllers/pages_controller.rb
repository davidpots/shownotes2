class PagesController < ApplicationController
  def home
    @entries = Podcast.get_entries(params[:q])
  end
end