
const jwt = require('jsonwebtoken')
const {cors} = require('cors')

const auth = (req, res, next) => {
  const token = req.headers.authorization
 if(token){
  try{
    const decoded = jwt.verify(token.split(" ")[1], 'note');
    if(decoded){
      req.body.authorID = decoded.authorID
      req.body.author = decoded.author
      next()
    }else{
      res.send({'msg':'Please Login!!'})
    }
  }catch(err){
    res.send({'err':err.message})
  }
 }else{
  res.send({'msg':'Please Login!!'})
 }
}

module.exports = { auth }