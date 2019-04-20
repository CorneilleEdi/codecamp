const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ExerciseSchema = Schema({
    userId: { type: String, required: [true, 'userId is required!'] }, 
    description :{ type: String, required: [true, 'description is required!'] },
    duration : {type : Number,required: [true, 'duration is required!'] } ,
    date : {type : Date}
})

const Exercise = mongoose.model('Exercise', ExerciseSchema);
module.exports = Exercise;