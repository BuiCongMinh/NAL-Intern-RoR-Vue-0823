const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const Account = require('./models/Account')
const jwt = require('jsonwebtoken')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(bodyParser.urlencoded({extended:false}))
app.use('/publics',express.static(path.join(__dirname,'publics')))

app.use(cookieParser())
app.use(bodyParser.json())


// ======API=====
app.post('/api/v1/account', async (req,res)=>{
    try {
        const result = await Account.create(req.body)
        return res.json({
            er: 0,
            result
        })
    } catch (error) {
        return res.json({
            error
        })
    }
})  

app.post('/api/v1/login',async(req,res,next)=>{
    try {
        const result = await Account.findOne(req.body)
        if(result){
            let token = jwt.sign({_id: result._id},'mk')
            return res.status(200).json({
                message: 'Đăng nhập thành công !',
                token,
                status:200
            })
        }

        return res.json({
            message: 'tài khoản đăng nhập sai !',
            status: 400
        })

    } catch (error) {
        return res.status(500).json({
            message: 'Lỗi server',
            error
        })
    }
})

app.post('/api/v1/checkLogin',async(req,res)=>{
    try {
        if(req.cookies.token){
            let token = req.cookies.token
            const id  = jwt.verify(token,'mk')
            const checkUser = await Account.findOne({_id:id})
            if(checkUser){
                res.json({mess:'user đã đăng nhập',status:200})
            }else{
                res.json({mess:'cookies ko hợp lệ ', status:400})
            }
        }else{
            res.json({mess: 'Chưa đăng nhập',status:400})
        }
    } catch (error) {
        res.json({error , status: 500})
    }
})


// ======= GET VIEW ========
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/netflix-demo.html'))
})

app.get('/netflixDemo/movie',(req,res,next)=>{
    try {
        let token = req.cookies.token
        const result  = jwt.verify(token,'mk')
        if(result){
            next()
        }
    } catch (error) {
        return res.redirect('/login')
    }
},(req,res,next)=>{
    res.sendFile(path.join(__dirname,'/views/movie.html'))
})

app.get('/login',(req,res)=>{
    res.sendFile(path.join(__dirname,'/views/login.html'))
})



app.listen(port,()=>{
    console.log(`http://localhost:${port}`)
})

