const{Router}= require('express')
const{validateJwt}=require('../middlewares/validateJwt')
const{getPosts, createPost,updatePost,deletePost, likePosts, getPostBySearch, getPost}=require('../controllers/socialControllers')

const router = Router();


router.get('/', getPosts)
router.get('/search', getPostBySearch)
router.get('/:id', getPost )


router.use(validateJwt)

router.post('/new', createPost)

router.put('/:id', updatePost)

router.delete('/:id', deletePost)

router.put('/:id/likes', likePosts)




module.exports= router