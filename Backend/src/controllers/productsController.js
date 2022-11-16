let Products = require('../models/products');

function saveProducts( req, res ){

    let myProducts = new Products( req.body );
    //myPost.user = req.data.username;
    

    myProducts.save( ( err, result ) => {
        if(err){
            res.status(500).send( { message: err } );
        }else{
            res.status(200).send( { message: result });
        }
    });
}

function listProducts( req, res){

    let search = req.params.search;
    
    let queryParam = {};

    if( search ){
        
        queryParam = { 
            $or : [
                { product: { $regex: search, $options: "i"  } },
                { id: { $regex: search, $options: "i"  } },
                { price: { $regex: search, $options: "i"  } },
                { quantity: { $regex: search, $options: "i"  } },
                { user: { $regex: search, $options: "i"  } }
            ]
        };
    }

    query = Products.find( queryParam ).sort('created');

    
    query.exec( (err, result) =>{

        if(err){
            res.status(500).send( {message: err });
        }else{
            res.status(200).send( result );
        }
    });

}

function findProducts( req, res ) {
    
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


function updateProducts( req, res ){

    let id = req.params.id;
    let data = req.body;

    Products.findByIdAndUpdate( id, data, { new: true }, (err, result) => {
        if(err){
            res.status(500).send( {message: err });
        }else{
            res.status(200).send( result );
        }
    } );

}

function deleteProducts( req, res ){

    let id = req.params.id;

    Products.findByIdAndDelete( id, (err, result) => {
        if(err){
            res.status(500).send( {message: err });
        }else{
            res.status(200).send( result );
        }
    } );
    
}

module.exports = { saveProducts, listProducts,findProducts, updateProducts, deleteProducts };