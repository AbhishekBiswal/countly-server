var plugin = {},
	common = require('../../../api/utils/common.js'),
	log = common.log('tod:api'),
    plugins = require('../../pluginManager.js');

(function (plugin) {
	//write api call

	plugins.register("/i", function(ob){
		var qString = ob.params.qstring;
		if(qString.dow && qString.hour) {
			log.w("DAY OF WEEK", qString.dow);
			var newTod = {dow: qString.dow, hour: qString.hour};
			log.w("Common DB", common.db.collection("tod"));
			log.e("Common DB", common.db.collection("tod"));
			log.i("Common DB", common.db.collection("tod"));
			common.db.collection("tod").insert(newTod);
		}
	});

}(plugin));

module.exports = plugin;