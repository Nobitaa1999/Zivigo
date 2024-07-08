const{Router}=require('express');
const router=Router();

const {userRegister,userlogin,user,authors,editUser,changeAvatar}=require('../controller/userController')
const {authMiddleware}=require('../middleware/authMiddleware');

router.post('/register',userRegister);
router.post('/login',userlogin);
router.get('/:id',user);
router.get('/',authors);
router.post('/change_avatar',authMiddleware,changeAvatar);
router.patch('/edit-userInfo',authMiddleware,editUser);

module.exports=router;