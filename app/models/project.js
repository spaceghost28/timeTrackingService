var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var timeEntrySchema = new Schema({
	_userId: Schema.Types.ObjectId,
	startTime: Date,
	endTime: Date
});

var storyCardSchema = new Schema({
	cardNumber: Number,
	timeEntries: [timeEntrySchema]
});

var projectSchema = new Schema({
	projectName: { type: String, unique: true },
	storyCards: [storyCardSchema]
});

var Project = mongoose.model('Project', projectSchema);

module.exports = Project;
