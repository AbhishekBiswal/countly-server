var plugin = {},
	common = require('../../../api/utils/common.js'),
	log = common.log('tod:api'),
    plugins = require('../../pluginManager.js');

var MongoClient = require('mongodb').MongoClient;
var mongo_url = 'mongodb://localhost:27017/countly';

(function (plugin) {
	//write api call

	plugins.register("/i", function(ob){
		var qString = ob.params.qstring;
		if(qString.dow && qString.hour) {
			log.w("DAY OF WEEK", qString.dow);
			var newTod = {dow: qString.dow, hour: qString.hour, extra: 1};
			// Insert TOD into db
			MongoClient.connect(mongo_url, function(err, db) {
				if(err) {
					log.e("Couldn't connect to Database");
				}
				else {
					var collection = db.collection('tod');
					collection.insert(newTod);
				}
			  	db.close();
			});
		}
	});

}(plugin));

module.exports = plugin;