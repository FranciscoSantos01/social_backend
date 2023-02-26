const{Router}= require('express')
const{check }=require('express-validator')
const {createUser,logInUser,renewToken}= require('../controllers/authControllers')
const{validarCampos}=require('../middlewares/validar-campos')
const{validateJwt}=require('../middlewares/validateJwt')
const router = Router();


router.post('/new',[
    check('name', "the field is obligatory").not().isEmpty(),
    check('email',"the field is obligatory").isEmail(),
    check('password', "the field is obligatory").isLength({min: 6}),
    validarCampos
] ,createUser)


router.post('/login',[
    check('email',"the field is obligatory").isEmail(),
    check('password', "the field is obligatory").isLength({min: 6}),
    validarCampos
] ,logInUser)



router.get('/renew', validateJwt ,renewToken)





module.exports = router