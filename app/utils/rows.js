export function formatRows(data, columns) {
	var length = data.content.length;
	var items = data.content;
	var rows = Math.ceil(length/columns);
	var formattedRows = Ember.A([]);
	var count = 0;

	for(var i = 0;i < rows;i++) {
		var row = Ember.A([]);
		for(var j = 0;j < columns;j++) {
			if(count < length) {
				var formatted = {
					name: items.get(count).record.data.name,
					key: items.get(count).record.data.key,
					bucket: items.get(count).record.data.bucket,
					url: items.get(count).record.data.url
					
				}
				row.push(formatted);
			}
			count++;
		}
		formattedRows.push(row);
	}
	return formattedRows;
} 

export default {
	formatRows: formatRows 
};
