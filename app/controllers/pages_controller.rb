class PagesController < ApplicationController
  def home
    @entries = Podcast.get_entries(params[:q])
    @results = ITunesSearchAPI.search(:term => params[:r], :country => "US", :media => "podcast", :attribute => "descriptionTerm")
  end
  def show
    @entries = Podcast.get_entries(params[:q])
    respond_to do |format|
      format.js   { render :layout => false }
      format.html { redirect_to show_url }
      format.json { head :no_content }
    end
  end
end