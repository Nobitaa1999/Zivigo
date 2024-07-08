const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
require('dotenv').config();

const fs=require('fs');
const path=require('path');

const User=require('../models/userModel');
const httpError=require('../models/errorModel');
const { log } = require('console');

// register===============
// post:/register

const userRegister=async(req,res,next)=>{
    try {
        console.log('hello');
        const{name,email,password,password2}=req.body;
        
        if(!name || !email || !password){
            
            return next(new httpError('fill all field',422));
        }
        
        const newemail=email.toLowerCase();
        // console.log(newemail);
        if(await User.findOne({email:newemail})){
            return next(new httpError('user allready exist',422));
        }
        console.log(newemail);

        if(password.trim().length<6){
            return next(new httpError('password is must be equle or more then length of 8',422));
        }

        if(password!=password2){
            return next(new httpError('passwors do not match',422))
        }
        

        const hassPassword=await bcrypt.hash(password,10);
        console.log(hassPassword);
        const newUser=await User.create({name,email:newemail,password:hassPassword});
        const newUserWOP= await User.findOne({email:newemail}).select('-password');

        res.status(201).json({
            success:true,
            data:newUserWOP,
            message:'user registered'
        })

       
    } catch (error) {
        return next(new httpError('user registation failed',422));
    }
}











// login===============
// post:/login
const userlogin=async(req,res,next)=>{
    try {
        const{email,password}=req.body;
        if(!email || ! password){
            return next(new httpError('Fill all details',422));
        }
        const newemail=email.toLowerCase();
        const user =await User.findOne({email:newemail});
        if(!user){
            return next(new httpError('Invalid credential',422));
        }

        const comparePassword=await bcrypt.compare(password,user.password);

        if(!comparePassword){
            return next(new httpError('Password not matched',422));
        }

        const{_id:id,name}=user;
        const token=jwt.sign({id,name},process.env.JWT_SECRET,{expiresIn:'1d'});

        res.status(200).json({token,id,name})


    } catch (error) {
        return next(new httpError('Login failed. Please check your crendentials.',422))        
    }    
}




// getuser===============
// get:/:id
const user=async(req,res,next)=>{
    try {
        const{id}=req.params;
        const user=await User.findById(id).select('-password');
        if(!user){
            return next(new httpError('User not found',404))
        }
        res.status(200).json(user);
    } catch (error) {
        return next(new httpError(error))
    }
}



// getauthors===============
// get:/author
const authors=async(req,res,next)=>{
    try {
        const authors=await User.find().select('-password');
        res.status(200).json(authors);
    } catch (error) {
        return next(new httpError(error));
    }
}





// change-avatar===============
// post:/change_avatar
const changeAvatar=async(req,res,next)=>{
    try {
        if(!req.files.avatar){
            return next(new httpError('Please choose an image',422))
        }

        const user=await User.findById(req.user.id)

        if(user.avatar){
            fs.unlink(path.join(__dirname,'..','uploads',user.avatar),(err)=>{
                if(err){
                    return next(new httpError(err));
                }
            })
        }

        const {avatar}=req.files;
        console.log(req.files);
        if(avatar.size>500000){
            return next(new httpError ('Profile picture too big it may be 500kb'),422);
        }

        let fileName;
        fileName=avatar.name;
        let splittedFileName=fileName.split('.');
        let newFileName=splittedFileName[0]+'.'+Date.now()+'.'+splittedFileName[splittedFileName.length-1];

        avatar.mv(path.join(__dirname,'..','uploads',newFileName),async(err)=>{
            if(err){
                return next(new httpError(err))
            }
            const updatedAvatar=await User.findByIdAndUpdate(req.user.id,{avatar:newFileName},{new:true});
            if(!updatedAvatar){
                return next(new httpError("avatar couldn't be changed",422))
            }
            res.status(200).json(updatedAvatar);
        })

    } catch (error) {
        return next(new httpError(error));        
    }
}

// edituser===============
// post:/editUser
const editUser=async(req,res,next)=>{
    try {
        const{name,email,currrentPassword,newPassword,confirmNewPassword}=req.body;
        if(!name || !email || !currrentPassword ){
            return next(new httpError('Fill all credentials',422));
        }

        const user=await User.findById(req.user.id);

        const existEmail=await User.findOne({email});
        if(existEmail && existEmail._id!=req.user.id){
            return next(new httpError('email allready exist',422));
        }
        let userInfo;

        if(newPassword){
        if(newPassword!==confirmNewPassword){
            return next(new httpError ('passsword dosnt match',422))
        }

        const comparePass= await bcrypt.compare(currrentPassword,user.password);
        console.log(currrentPassword);
        if(!comparePass){
            return next(new httpError('invalid password',422))
        }
        const hashPass=await bcrypt.hash(newPassword,10);

        userInfo = await User.findByIdAndUpdate(req.user.id,{name,email,password:hashPass},{new:true});
    }
    else{
    userInfo = await User.findByIdAndUpdate(req.user.id,{name,email},{new:true})
    }

        res.status(200).json(userInfo);
    } catch (error) {
        return next(new httpError(error));
    }
}

module.exports={userRegister,userlogin,user,authors,editUser,changeAvatar}