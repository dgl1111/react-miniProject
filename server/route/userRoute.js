const express = require('express')
const router = express.Router();
const connection = require('../db');

  router.route("/")
    .get((req, res)=>{
        const query = 'SELECT * FROM TBL_USER';
        connection.query(query, (err, results) => {
            if (err) {
                console.error('쿼리 실행 실패:', err);
                // res.status(500).send('서버 오류');
                return;
            }
            res.render('user', { list : results }); 
        });
    })
    .post((req, res)=>{
        const { email, password } = req.body;
        const query = 'SELECT * FROM TBL_USER WHERE email = ? AND password = ?';
      
        connection.query(query, [email, password], (err, results) => {
          console.log(results);
          if (err) throw err;
          if (results.length > 0) {
            res.json({ success: true, user : results[0] });
          } else {
            // 로그인 실패
            res.json({ success: false, message: '실패!' });
          }
        });
    });

    // router.route("/session/:email")
    // .get((req, res)=>{
    //   const email = req.params.email;       
    //   const query = 'SELECT * FROM TBL_USER WHERE email = ?';
    //   connection.query(query, [email], (err, results) => {
    //       if (err) {
    //           console.error('쿼리 실행 실패:', err);
    //           // res.status(500).send('서버 오류');
    //           return;
    //       }
    //       res.render('user', { list : results }); 
    //   });
    // })

  router.route("/insert")
    .post(async(req, res) => {
      const {name, email, password, birth, userId} = req.body;
      const query = 'INSERT INTO TBL_USER(name, email, password, birth, userId) VALUES(?, ?, ?, ?, ?)';
      const query1 = 'SELECT COUNT(*)  AS ISEMAIL FROM TBL_USER WHERE email = ?';
      const query2 = 'SELECT COUNT(*) AS ISUSERID FROM TBL_USER WHERE userId = ?';

      connection.query(query1, [email], (err, results) => {
        if(err) throw err;

        if(results[0].ISEMAIL > 0){
         return res.json({success : false, message : "중복된 이메일"});
        }else{
          connection.query(query2, [userId], (err, results) => {
            if(err) throw err;
    
            if(results[0].ISUSERID > 0){
              return res.json({success : false, message : "중복된 아이디"});
            }
            else{
              connection.query(query, [name, email, password, birth, userId], (err, results) => {
                console.log(results);
                if(err){
                  return res.json({success : false, message : "db오류"});
                };
                
                res.json({ success : true, message : '성공!'})
              })
            }
          })
         
        }
      })

      


    
    });

  
  
module.exports = router;