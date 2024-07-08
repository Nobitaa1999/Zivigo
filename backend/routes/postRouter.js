const{Router}=require('express');
const router=Router();

const{createPost,getAllPost,getPost,categoryPost,getAuthorPost,editPost,deletePost}=require('../controller/postController')
const {authMiddleware}=require('../middleware/authMiddleware');

router.post('/',authMiddleware,createPost);
router.get('/',getAllPost);
router.get('/:id',getPost);
router.get('/cat/:category',categoryPost);
router.get('/author/:id',getAuthorPost);
router.patch('/:id',authMiddleware,editPost);
router.delete('/:id',authMiddleware,deletePost);

module.exports=router; 