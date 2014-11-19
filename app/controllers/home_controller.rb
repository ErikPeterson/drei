class HomeController < ApplicationController
	def show
		respond_to do |format|
			format.html
		end
	end

	def nav_data
		@nav_data = {
			nav: {
				links: [
					{path: '/', text:'Home'}
				],
				nav_sections: [
					{title: "Object Library",
						links: [
							{
								path: '/objects', 
								text: 'List'
							},
							{
								path: '/objects/new', 
								text: 'Add'
							}
						]
					}
				]
			}
		}
		
		respond_to do |format|
			format.json {render json: @nav_data }
		end
	end
end
