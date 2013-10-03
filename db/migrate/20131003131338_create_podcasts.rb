class CreatePodcasts < ActiveRecord::Migration
  def change
    create_table :podcasts do |t|
      t.string :name
      t.text :description
      t.string :image
      t.string :url_web
      t.string :url_rss
      t.string :url_itunes

      t.timestamps
    end
  end
end
