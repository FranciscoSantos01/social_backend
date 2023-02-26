const{Schema, model} = require('mongoose')


const postSchema = new Schema({
     title:{
        type: String,
        required:  true
     },
     description:{
        type: String,
        required: true
     },
     creator:{
        type: String,
     },
     tags:{
        type: [String],
     },
     selectFile:{
        type: String,
     },
     likes: { type: [String], default: [] },
     
})




module.exports = model('post', postSchema)