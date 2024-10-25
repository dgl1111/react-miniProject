const express = require('express')
const router = express.Router();
const connection = require('../db');
const jwt = require('jsonwebtoken');
const { jwtAuthentication } = require('../jwtAuth');
const bcrypt = require('bcrypt');

const JWT_KEY = "secret_key";
const ROUND = 10;

  router.route("/")
    .get((req, res)=>{
        const query = 'SELECT * FROM TBL_USER';
        connection.query(query, (err, results) => {
            if (err) {
                console.error('쿼리 실행 실패:', err);
                // res.status(500).send('서버 오류');
                return;
            }
            res.json( {list : results }); 
        });
    })
    .post((req, res)=>{
        const { email, password } = req.body;
        const query1 = 'SELECT * FROM TBL_USER WHERE email = ?';
        const query2 = 'SELECT * FROM TBL_USER WHERE email = ? AND password = ?';
        
        connection.query(query1, email, async(err, results) => {
          if(err){
            console.error('쿼리 실행 실패:', err);
            res.status(500).send('서버 오류');
            return;
          }

          if(results.length === 0){
            res.json({ success: false, message: '이메일이 존재하지 않습니다.' });
            return;
          }
          
          console.log(results[0]);
          console.log(results[0].password);
          const dbpwd = results[0].password;
          const result = await bcrypt.compare(password, dbpwd);

          if (result === true) {
            connection.query(query2, [email, dbpwd], async(err, results) => {
            const user = results[0];
            const token = jwt.sign({email : user.email, name : user.name}, JWT_KEY, {expiresIn : '1h'});
            console.log(token);
            res.json({ success: true, message : "로그인 성공", token: token });
            })
           
          } else {
            // 로그인 실패
            res.json({ success: false, message: '비밀번호가 틀렸습니다.' });
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

      const pwdHash = await bcrypt.hash(password, ROUND);
      console.log(pwdHash);

      connection.query(query1, [email], (err, results) => {
        if(err){
          console.error('쿼리 실행 실패:', err);
          res.status(500).send('서버 오류');
          return;
        }


        if(results[0].ISEMAIL > 0){
         return res.json({success : false, message : "중복된 이메일"});
        }else{
          connection.query(query2, [userId], (err, results) => {
            if(err) {
              console.error('쿼리 실행 실패:', err);
              return res.status(500).send('서버 오류');
            }
            if(results[0].ISUSERID > 0){
              return res.json({success : false, message : "중복된 아이디"});
            }
            else{
              connection.query(query, [name, email, pwdHash, birth, userId], (err, results) => {
                console.log(results);
                if(err){
                  console.error('쿼리 실행 실패:', err);
                  return res.json({success : false, message : "db오류"});
                };
                
                res.json({ success : true, message : '성공!'})
              })
            }
          })
         
        }
      })
    });

    router.route("/info")
    .post((req, res)=>{
      const {email} = req.body;
      console.log(email);
        const query = 'SELECT * FROM TBL_USER WHERE email = ?';
        connection.query(query,[email], (err, results) => {
            if (err) {
                console.error('쿼리 실행 실패:', err);
                // res.status(500).send('서버 오류');
                return;
            }
            res.json( {success: true, list : results }); 
        });
    });
   



  
  
module.exports = router;