define(function(require) {

	var data = require('./vertising_mgr_data');
	var vertising_mnt = require('./vertising_mgr');
	vertising_mnt.init(data);
});