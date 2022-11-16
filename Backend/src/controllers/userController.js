let User = require('../models/user');
const bcrypt = require("bcrypt");

async function saveUser( req, res ){

    let myUser = new User( req.body );

    const user = await User.findOne({
        email: myUser.email
    });

    if( user != null ){
        
        res.status(403).send({ message: "User is already registered"});    
        return;
    }else{
    
        // generate salt to hash password
        const salt = await bcrypt.genSalt(10);
        myUser.password = await bcrypt.hash( myUser.password , salt);

        myUser.save( ( err, result ) => {
            if(err){
                res.status(500).send( { message: err } );
            }else{
                res.status(200).send( { message: result });
            }
        });
    }

}

function listUsers( req, res){

    let search = req.params.search;
    
    let queryParam = {};

    if( search ){
        
        queryParam = { 
            $or : [
                { name: { $regex: search, $options: "i"  } },
                { email: { $regex: search, $options: "i"  } }
            ]
        };
    }

    query = User.find( queryParam ).sort('createdAt');
    
    query.exec( (err, result) =>{

        if(err){
            res.status(500).send( {message: err });
        }else{
            res.status(200).send( result );
        }
    });

}

function findUser( req, res ) {
    
    let id = req.params.id;
    let query = User.findById(id);

    query.exec( ( err, result) => {
        if(err){
            res.status(500).send( {message: err });
        }else{
            res.status(200).send( result );
        }
    });

}

function deleteUser( req, res ){

    let id = req.params.id;

    User.findByIdAndDelete( id, (err, result) => {
        if(err){
            res.status(500).send( {message: err });
        }else{
            res.status(200).send(  { message: "User deleted", "result": result } );
        }
    } );
    
}


module.exports = { findUser, saveUser, listUsers, deleteUser }