let Post = require('../models/post');

function savePost( req, res ){

    let myPost = new Post( req.body );
    myPost.user = req.payload.email;

    myPost.save( ( err, result ) => {
        if(err){
            res.status(500).send( { error: err } );
        }else{
            res.status(200).send( { message: "Post created", result: result });
        }
    });
}

function listPosts( req, res){

    let search = req.params.search;
    
    let queryParam = {};

    if( search ){
        
        queryParam = { 
            $or : [
                { title: { $regex: search, $options: "i"  } },
                { content: { $regex: search, $options: "i"  } },
                { user: { $regex: search, $options: "i"  } }
            ]
        };
    }

    query = Post.find( queryParam ).sort('createdAt');

    
    query.exec( (err, result) =>{

        if(err){
            res.status(500).send( {message: err });
        }else{
            res.status(200).send( result );
        }
    });

}

function findPost( req, res ) {
    
    let id = req.params.id;
    let query = Post.findById(id);

    query.exec( ( err, result) => {
        if(err){
            res.status(500).send( {message: err });
        }else{
            res.status(200).send( result );
        }
    });

}

function updatePost( req, res ){

    let id = req.params.id;
    let data = req.body;
    data.user = req.payload.email;

    Post.findByIdAndUpdate( id, data, { new: true }, (err, result) => {
        if(err){
            res.status(500).send( {message: err });
        }else{
            res.status(200).send( { message: "Post updated", result: result });
        }
    } );

}

function deletePost( req, res ){

    let id = req.params.id;

    Post.findByIdAndDelete( id, (err, result) => {
        if(err){
            res.status(500).send( {message: err });
        }else{
            res.status(200).send(  { message: "Post deleted", "result": result } );
        }
    } );
    
}

module.exports = { savePost, listPosts,findPost, updatePost, deletePost };
