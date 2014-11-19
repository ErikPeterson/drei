class ThreeObjectController < ApplicationController

	def show
		@three_object = ThreeObject.find_by_slug_or_id(params[:slug_or_id])
		respond_to do |format|
			format.html
			format.json {render json: @three_object}
		end
	end
	
end
