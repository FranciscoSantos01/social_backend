const {response}= require('express')
const Post = require('../models/post')

const getPosts = async(req, res=response)=>{
    try {
        const posts = await Post.find({})
        res.status(201).json({
            ok:true,
            posts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"communicate with admins"
        })
    }
}
const getPost = async(req, res = response)=>{
    const{id}= req.params

    try {
        const post = await Post.findById(id)
        if(!post){
            return res.status(404).json({
                ok:false,
                msg:"No post with that id"
            })
        }
        res.status(201).json({
            ok:true,
            post
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"communicate with admins"
        })
    }
}
const getPostBySearch = async(req, res=response)=>{
    const{searchQuery}= req.query
    console.log(searchQuery)

    try {
        const title = new RegExp(searchQuery, "i")
        const posts = await Post.find({title:title})
        res.status(201).json({
            ok:true,
            posts
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"communicate with admins"
        })
    }

}
const createPost = async(req, res=response)=>{
    const post = req.body;

    const newPost = new Post({...post, creator:req.uid})

    try {
        await newPost.save();
        res.status(201).json({
            ok:true,
            newPost
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"communicate with admins"
        })
    }

}


const updatePost = async(req, res=response)=>{
    const{id}= req.params
    try {
        let post = await Post.findById(id);
        if(!post){
         return  res.status(404).json({
            ok:false,
            msg:"Theres no post with that id"
         })
        }
        if(post.creator.toString() !== req.uid){
            return res.status(401).json({
                ok:false,
                msg:"You dont have the permits to edit"
            })
        }
        const newPost={
            ...req.body,
            creator: req.uid
        }
        const postUpdated = await Post.findByIdAndUpdate(id,newPost,{new: true})
        res.status(201).json({
            ok:true,
            postUpdated
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"communicate with admins"
        })
    }
}


const deletePost = async(req, res=response)=>{
    const{id}= req.params
    try {
        let post = await Post.findById(id);
        if(!post){
         return  res.status(404).json({
            ok:false,
            msg:"Theres no post with that id"
         })
        }
        if(post.creator !== req.uid){
            return res.status(401).json({
                ok:false,
                msg:"Don't have permits to delete"
            })
        }
        const postDeleted = await Post.findByIdAndDelete(id)
        res.status(201).json({
            ok:true,
            postDeleted
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"communicate with admins"
        })
    }
}

const likePosts = async(req, res=response)=>{
    const{id}= req.params
    try {
        let post = await Post.findById(id)
        if(!post){
            return res.status(404).json({
                ok:false,
                msg:"Theres no post with that id"
            })
        }
        const index = post.likes.findIndex((id)=> id === String(req.uid))
        console.log(index)
        if(index === -1){
            post.likes.push(req.uid)
        } else{
            post.likes = post.likes.filter((id) => id !== String(req.uid))
        }
        const updatePost = await Post.findByIdAndUpdate(id, post, {new: true})

        res.status(201).json({
            ok:true,
            updatePost
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg:"communicate with admins"
        })
    }
    }




module.exports ={
    getPosts,
    getPostBySearch,
    getPost,
    createPost,
    updatePost,
    deletePost,
    likePosts
}
