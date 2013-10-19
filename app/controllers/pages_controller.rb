class PagesController < ApplicationController
  def home
    @entries = Podcast.get_entries(params[:q])
    @results = ITunesSearchAPI.search(:term => params[:r], :country => "US", :media => "podcast", :entity => "allTrack", :attribute => "descriptionTerm")
  end
end