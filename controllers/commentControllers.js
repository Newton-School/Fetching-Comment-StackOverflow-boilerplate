const Comment   = require("../models/comment.js");
const Blog   = require("../models/blog.js");
const jwt = require("jsonwebtoken");
const JWT_SECRET = 'NEWTONSCHOOL';


const createComment = async (req, res) => {

    const {content, blogId, token } = req.body;

    try{
        if(!token){
            res.status(401).json({
                status: 'fail',
                message: 'Missing token'
            });
        }
        let decodedToken;
        try{
            decodedToken = jwt.verify(token, JWT_SECRET);
        }catch(err){
            res.status(401).json({
                status: 'fail',
                message: 'Invalid token'
            });
        }
        try{
            const blog = await Blog.findById(blogId);
            const newComment = {
                content,
                authorId: decodedToken.userId,
                blogId
            };
            const comment = await Comment.create(newComment);
            res.status(200).json({
                message: 'Comment added successfully',
                commentId: comment._id,
                status: 'success'
            });
        }catch(err){
            res.status(404).json({
                message: "Blog with given blogId doesn't exist",
                status: 'fail'
            });
        }
    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}

/*

getComment Controller


1. get the comment with given id in req.params.

Response --> 

1. Success

200 Status code
json = {
  status: 'success',
  comment
}

2. Comment Doesn't exist

404 Status Code
json = {
    status: 'fail',
    message: "Given Comment doesn't exist"
}

3. Something Went wrong

500 Status Code
json = {
    status: 'fail',
    message: error message
}
*/

const getComment = async (req, res) => {

    const commentId = req.params.id;
    try{
        
        //Write your code here.

    }catch(err){
        res.status(500).json({
            status: 'fail',
            message: err.message
        });
    }
}


module.exports = { createComment, getComment };
