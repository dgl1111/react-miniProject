const express = require('express')
const router = express.Router();
const connection = require('../db');
const jwtAuthentication = require('../jwtAuth');

router.route("/")
    .get(jwtAuthentication, (req, res)=>{
        
        const query = 'SELECT * FROM TBL_FEED F INNER JOIN TBL_FEED_IMG I ON F.id = I.id';
        connection.query(query, (err, results) => {
            if (err) {
                console.error('쿼리 실행 실패:', err);
                // res.status(500).send('서버 오류');
                return res.json({ success: false, message: '서버 오류가 발생했습니다.' });;
            }

            res.json({ success: true, list : results }); 
        });
    })

    .post(jwtAuthentication, (req, res)=>{
        const {email, content, favorite, cdatetime, img_path} = req.body;
        const query1 = 'INSERT INTO TBL_FEED(email, content, favorite, cdatetime) VALUES(?,?,?,?)';
        connection.query(query1, [email, content, favorite, cdatetime], (err, results) => {
            if (err) {
                console.error('쿼리 실행 실패:', err);
                // res.status(500).send('서버 오류');
                return res.json({ success: false, message: '서버 오류가 발생했습니다.' });;
            }

        const feed_id = results.insertId;
        console.log(feedId);

        const query2 = 'INSERT INTO TBL_FEED_IMG(img_path, feed_id, cdatetime) VALUES(?,?,?)';
        connection.query(query2, [img_path, feed_id, cdatetime], (err, results) => {
            if (err) {
                console.error('쿼리 실행 실패:', err);
                // res.status(500).send('서버 오류');
                return res.json({ success: false, message: '서버 오류가 발생했습니다.' });;
            }

            res.json({ success: true, list : results }); 
        });

        
        });
    })

router.route("/:email")
    .delete((req, res)=>{
      const email = req.params.email;
      const query = 'DELETE FROM TBL_FEED WHERE email = ? ';
    
      connection.query(query, [email], (err, results) => {
        if (err) {
          return res.json({success : false, message : "db 오류"});
        };

        res.json({ success: true, message: '삭제 됨!' });
        
      });
  })

  .put((req, res)=>{
    const email = req.params.email;
    const query = 'UPDATE TBL_FEED SET favorite = favorite + 1 WHERE email = ? ';
  
    connection.query(query, [email], (err, results) => {
      if (err) {
        return res.json({success : false, message : "db 오류"});
      };

      res.json({ success: true, message: '추천!' });
      
    });
});






  
module.exports = router;