const { verifyToken } = require('../middleware/auth');
const db = require('../config/db')

const express = require('express')

//get all author
const getAllAuthors = async (req,res) => {
    try{

        const data = await db.query(`SELECT * FROM author`)
        if(!data){
            res.send(404).send({
                message: 'no records found!'
            })
        }
        res.status(200).send({
            message: 'data fetched!', 
            data: data[0]
        })
    }catch(error){
        console.log(error)
        res.send({
            message: "error in get all author api!"
        })
    }
}

const register = async (req,res)=>{
    try{
        const {name,email,password, mobile} = req.body

        if(!name || !email || !password ||! mobile){
            res.status(409).send({
                message:"all fields required"
            })
        }

        const data = await db.query(`INSERT INTO register (name,email,password, mobile) VALUES (?,?,?,?)`,[name,email,password,mobile])

        if (!data) {
            return res.status(404).send({
                message: 'Error in INSERT query!'
            })
        }

        res.status(201).send({
            message: 'Record created!'
        })

    }catch(error){
        console.log(error)
        res.send({
            message: 'error in add author api!'
        })
    }
}




const addAuthor = async (req,res)=>{
    try{
        const {name,email,password, mobile} = req.body

        if(!author_name || !biography || !genre){
            res.status(409).send({
                message:"all fields required"
            })
        }

        const data = await db.query(`INSERT INTO register (name,email,password, mobile) VALUES (?,?,?,?)`,[name,email,password,mobile])

        if (!data) {
            return res.status(404).send({
                message: 'Error in INSERT query!'
            })
        }

        res.status(201).send({
            message: 'Record created!'
        })

    }catch(error){
        console.log(error)
        res.send({
            message: 'error in add author api!'
        })
    }
}

//update author
const updateAuthor = async(req,res)=>{
    try {

        const authorId = req.params.id
        if (!authorId) {
            return res.status(404).send({
                message: 'invalid id'
            })
        }

        const { author_name,biography,genre } = req.body

        // const [existingAuthor] = await db.query(`SELECT * FROM author WHERE author_name = ?`, [author_name])
        // if (existingAuthor.length > 0) {
        //     return res.status(409).send({
        //         message: "Author already exist!"
        //     })
        // }

        const data = db.query("UPDATE author SET author_name = ?, biography = ?, genre = ? WHERE author_id = ?", [author_name, biography,genre,authorId])

        if (!data) {
            return res.status(500).send({
                message: 'error in update author data!'
            })
        }
        res.status(200).send({
            message: 'data updated!'
        })

    } catch (error) {
        console.log(error)
        res.send({
            message: 'error in updateAuthor api!'
        })
    }
}

//delete author
const deleteAuthor = async (req,res)=>{

        const authorId = req.params.id;
      
        // Check if there are any associated books for the author
        try {
            const authorId = req.params.id;
            
            if (!authorId) {
                return res.status(404).send({
                    message: 'Invalid ID'
                });
            }
        
            // Check if there are any associated books for the author
            const books = await db.query('SELECT * FROM book WHERE author_id = ?', [authorId]);
            if (books.length > 0) {
                return res.status(400).send({
                    message: 'Cannot delete author as there are associated books'
                });
            }
        
            // If no associated books, proceed with author deletion
            const data = await db.query('DELETE FROM author WHERE author_id = ?', [authorId]);
            if (!data) {
                return res.status(500).send({
                    message: 'Error in deleting author data'
                });
            }
        
            res.status(200).send({
                message: 'Author deleted successfully'
            });
        } catch (error) {
            console.error(error);
            res.status(500).send({
                message: 'Error in deleteAuthor API'
            });
        }
        
    }


    //registartion user



    // const register = async (req,res)=>{

    //     inputData ={
    //         name: req.body.name,
    //         email: req.body.email,
    //         password: req.body.password,
    //         confirm_password: req.body.confirm_password,
    //         mobile: req.body.mobile
    //     }
    //         var sql='SELECT * FROM register WHERE email =?  AND mobile =? ';
    //         db.query(sql, [inputData.email,inputData.mobile] ,function (err, data) {
    //         if(err) throw err
    //         if(data.length>1){
    //             var msg = inputData.email+ "email and mobile was already exist";
    //         }else if(inputData.confirm_password != inputData.password){
    //             var msg ="Password & Confirm Password is not Matched";
    //         }else{
                
    //             var sql = 'INSERT INTO register SET ?';
    //         db.query(sql, inputData, function (err, data) {
    //             if (err) throw err;
    //                 });
    //         var msg ="Your are successfully registered";
    //         }
    //         res.render('registration-form',{alertMsg:msg});
    //         })
        
    // }

module.exports = {getAllAuthors,addAuthor,updateAuthor,deleteAuthor,register}

