var plugin = {},
countlyConfig = require('../../../frontend/express/config');

(function (plugin) {
	plugin.init = function(app, countlyDb){
		app.get("/o", function(req, res, next) {
			res.send("Hey");
			// Connect to DB
			countlyDb.collection('tod').find({}, function(err, plugindata){
				if (err) res.send('404: Page not Found', 404);
				else {
							//render template with data	
		 			res.render('../../../plugins/tod/frontend/public/templates/default', {
						path:countlyConfig.path || "", 
						cdn:countlyConfig.cdn || "", 
						data:plugindata
		        	});
				}
			});
		});
	};
}(plugin));

module.exports = plugin;