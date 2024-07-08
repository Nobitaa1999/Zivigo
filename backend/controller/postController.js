const Post=require('../models/postModel');
const User=require('../models/userModel');
const httpError=require('../models/errorModel');
const fs=require('fs');
const path=require('path');

// create post====================
// Create:post/createPost
const createPost=async(req,res,next)=>{
    try {
        const{title,description,category}=req.body;
        if(!title || !description || !category || !req.files){
            return next(new httpError('fill all feilds',422))
        }
        const {thumbnail}=req.files;
        if(thumbnail.size>2000000){
            return next(new httpError('thumbnail size is too larger it should be under 2mb',422))
        }
       
        let filename=thumbnail.name;
        let splittedname=filename.split('.');
        const newfilename=splittedname[0]+'.'+Date.now()+'.'+splittedname[splittedname.length-1];
        thumbnail.mv(path.join(__dirname,'..','/uploads',newfilename),async(err)=>{
            if(err){
                return next(new httpError(err));
            }
            else{
                const newPost=await Post.create({title,description,category,thumbnail:newfilename,creator:req.user.id});
                if(!newPost){
                    return next(new httpError('Post couldnt be created',422))
                }
                const populatedPost = await Post.findById(newPost._id).populate("creator").exec();

                const currentUser=await User.findById(req.user.id);
                if(!currentUser){
                    return next(new httpError('Error in finding user',422))
                }
                let newpostcount=currentUser.post + 1;
                await User.findByIdAndUpdate(req.user.id,{post:newpostcount},{new:true});
                res.status(200).json(populatedPost);
            }
        })
    } catch (error) {
        
    }
}



// view post====================
// get:post/:id
const getPost=async(req,res,next)=>{
    
    try {
        const{id}=req.params;
        if(!id){
            return next(new httpError('put a id ',422))
        }
        const post=await Post.findById(id)
        if(!post){
            return next(new httpError('post not found',404))
        }
        res.status(200).json(post);
    } catch (error) {
        return next(new httpError(error))
    }
}



// all post====================
// get:post/
const getAllPost=async(req,res,next)=>{
    try {
        const posts=await Post.find().sort({updatedAt:-1})
        res.status(200).json(posts);
    } catch (error) {
        return next(new httpError(error))
    }
}


// get post by category====================
// get:post/categories/:category
const categoryPost=async(req,res,next)=>{
    try {
        const cat=req.params.category;
       
        const categoryPost= await Post.find({category:cat}).sort({createdAt:-1});
       
        res.status(200).json(categoryPost);
    } catch (error) {
        return next(new httpError(error));        
    }
}

// get all  post by author====================
// get:post/user/:id
const getAuthorPost=async(req,res,next)=>{
    try {
        const userId=req.params.id;
        const authorpost=await Post.find({creator:userId}).sort({createdAt:-1});
        res.status(200).json(authorpost);
    } catch (error) {
        return next(new httpError(error));        
    }
}


// Edit post==================== 
// patch:post/:id
const editPost=async(req,res,next)=>{
    try {
        let updatedPost;
        const postId=req.params.id;
        const{title,category,description}=req.body;
        if(!title || !category || !description){
            return next(new httpError('all feilds to be required',422))
        }
        if(!req.files){
            updatedPost= await Post.findByIdAndUpdate(postId,{title,category,description},{new:true});

        }
        else{
            const oldPost=await Post.findById(postId);
            if (!oldPost || !oldPost.thumbnail) {
                return next(new httpError("Post or thumbnail not found."));
            }
            fs.unlink(path.join(__dirname,'..','uploads',oldPost.thumbnail),async(err)=>{
                if(err){
                    return next(new httpError(err));
                }
            })
            const {thumbnail}=req.files;
            if(thumbnail.size>2000000){
                return next(new httpError('Thumbnail is too big, it should be under 2mb',422))
            }
            let filename=thumbnail.name;
            let splittedFileName=filename.split('.');
            const newFileName=splittedFileName[0]+'.'+Date.now()+'.'+splittedFileName[splittedFileName.length-1];
            thumbnail.mv(path.join(__dirname,'..','uploads',newFileName),async(err)=>{
                if(err){
                    return next(new httpError(err));
                }
            })
            updatedPost=await Post.findByIdAndUpdate(postId,{title,category,description,thumbnail:newFileName},{new:true})

        }
        if(!updatedPost){
            return next (new httpError("couldn't updated post"),422)
        }
        res.status(200).json(updatedPost);
    } catch (error) {
        
    }
}

// delete post====================
// delete:post/:id
const deletePost=async(req,res,next)=>{
   
    try {
        const postId=req.params.id;
        if(!postId){
            return next(new httpError('post unavailable',400))
        }
        const post=await Post.findById(postId)
        const fileName=post?.thumbnail;
        if(req.user.id==post.creator){
        fs.unlink(path.join(__dirname,'..','uploads',fileName),async(err)=>{
            if(err){
                return next(new httpError(err))
            }else{
                await Post.findByIdAndDelete(postId);
               
                const user=await User.findById(req.user.id);
                let currentPostCount=user?.post;
                await User.findByIdAndUpdate(req.user.id,{post:currentPostCount-1},{new:true})
            }
        })
        res.status(200).json(`${post._id} deleted`)
    }else{
        return next(new httpError("post couldn't be deleted",400))
    }
    } catch (error) {
        return next(new httpError(error))
        
    }
}

module.exports={createPost,getAllPost,getPost,categoryPost,getAuthorPost,editPost,deletePost};