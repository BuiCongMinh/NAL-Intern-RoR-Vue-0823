const mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/TestServer-NetFlixAppDemo')
.catch(err => {console.log(err)})

const Schema = mongoose.Schema

const AccountSchema = new Schema({
    username: String,
    password: String
},{collection: 'account'})

const Account = mongoose.model('account',AccountSchema)

module.exports = Account
