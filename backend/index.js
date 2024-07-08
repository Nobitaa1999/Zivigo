const express=require('express');
const cors=require('cors');
const{connect}=require('mongoose');
require('dotenv').config();
const upload=require('express-fileupload')

const app=express();
app.use(express.json({extended:true}));
app.use(express.urlencoded({extended:true}));
app.use(cors({credentials: true,origin:'http://localhost:3000'}))
app.use(upload())
app.use('/uploads',express.static(__dirname+'/uploads'))

const userRoute=require('./routes/userRouter')
const postRoute=require('./routes/postRouter')
const{notFound,errorMiddleware}=require('./middleware/erromiddleware');

app.use('/api/user',userRoute);
app.use('/api/post',postRoute);

app.use(notFound);
app.use(errorMiddleware)


connect(process.env.MONGO_URL).then(app.listen(5000,()=>{
    console.log('port is successfully listening on ',5000);
})).catch(error=>{
    console.log('error hai');
    console.log(error);
})

