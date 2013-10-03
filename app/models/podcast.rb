class Podcast < ActiveRecord::Base
  attr_accessible :description, :image, :name, :url_itunes, :url_rss, :url_web
end
