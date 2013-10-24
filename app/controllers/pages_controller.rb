class PagesController < ApplicationController
  def home
    @results = Podcast.search_itunes(params[:r])
  end
  def show
    @feedUrl = params[:url_rss]
    @url_itunes = params[:url_itunes]
    @podcast = Podcast.parse_feed(@feedUrl)
    respond_to do |format|
      format.js   { render :layout => false }
      format.html { redirect_to show_url }
      format.json { head :no_content }
    end
  end
end