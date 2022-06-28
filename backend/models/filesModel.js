const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const videoSchema=new ({
    ownerEmail : String,
    dateOfUpload:Date,
    fileName:String,
    file:File,
    date: { type: Date, default: Date.now }

})

const Video = mongoose.mode('video',videoSchema);
module.exports = Video;