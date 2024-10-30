const express = require('express')
const router = express.Router();
const connection = require('../db');
const jwtAuthentication = require('../jwtAuth');
const multer = require('multer');
const path = require('path');

// 파일 저장 경로 및 이름 설정
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      console.log(file);
      cb(null, 'img/'); // 서버 내 img 폴더
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname); // 파일 확장자
      cb(null, Date.now() + ext); // 날짜 데이터를 이용해서 파일 이름으로 저장
    },
  });
  
  // 파일 업로드 미들웨어 설정
  const upload = multer({ storage: storage });
  
  
  // 이미지 및 피드 업로드 API
  router.route("/")
    .get(jwtAuthentication, (req, res)=>{
            
        const query = 'SELECT * FROM TBL_FEED F INNER JOIN TBL_FEED_IMG I ON F.id = I.feed_id';
        connection.query(query, (err, results) => {
            console.log(results);
            if (err) {
                console.error('쿼리 실행 실패:', err);
                // res.status(500).send('서버 오류');
                return res.json({ success: false, message: '서버 오류가 발생했습니다.' });;
            }

          // 피드 개수 쿼리 추가
          const countQuery = 'SELECT COUNT(*) AS count FROM tbl_feed';
          connection.query(countQuery, (err, countResult) => {
            if (err) {
              console.error('개수 쿼리 실행 실패:', err);
              return res.json({ success: false, message: '서버 오류가 발생했습니다.' });
            }

            res.json({ success: true, list: results});
          });
        });
      })

    .post(upload.array('images'), (req, res) => {
      console.log(req.files); // 파일 로그 확인
      const { email, content, favorite } = req.body; // 피드의 내용

      // 피드 먼저 등록
      const feedQuery = 'INSERT INTO tbl_feed (email, content, favorite, cdatetime) VALUES (?,?,?,NOW())';
  
      connection.query(feedQuery, [email, content, favorite], (err, feedResult) => {
        if (err) {
          console.error('피드 등록 실패:', err);
          return res.json({ success: false, message: "피드 등록 실패" });
        }
  
        const feed_id = feedResult.insertId; // 등록된 피드의 ID 가져오기
  
        // 이제 이미지를 등록할 차례
        const files = req.files;
  
        if (!files || files.length === 0) {
          return res.json({ success: false, message: "파일이 업로드되지 않았습니다." });
        }
  
        // 이미지 경로들을 DB에 저장
        const imgQuery = 'INSERT INTO tbl_feed_img (img_path, feed_id, cdatetime) VALUES ?';
        const imgData = files.map(file => [file.path, feed_id, new Date()]);
  
        connection.query(imgQuery, [imgData], (err, imgResult) => {
          if (err) {
            console.error('이미지 저장 실패:', err);
            return res.status(500).json({ success: false, message: "이미지 저장 실패" });
          }
  
          res.json({ success: true, message: "피드 및 파일이 성공적으로 저장되었습니다!" });
        });
      });
    });

    router.route("/:id").delete((req, res) => {
      const feedId = req.params.id;
    
      // tbl_feed_img에서 feed_id에 해당하는 이미지 삭제
      const deleteImgQuery = `
        DELETE I FROM tbl_feed_img I
        INNER JOIN TBL_FEED F ON I.feed_id = F.id
        WHERE F.id = ?`;
    
      connection.query(deleteImgQuery, [feedId], (err, imgResults) => {
        if (err) {
          console.error('이미지 삭제 실패:', err);
          return res.json({ success: false, message: '이미지 삭제 실패' });
        }
    
        // 이제 tbl_feed에서 해당 피드를 삭제
        const deleteFeedQuery = 'DELETE FROM TBL_FEED WHERE id = ?';
        connection.query(deleteFeedQuery, [feedId], (err, feedResults) => {
          if (err) {
            console.error('피드 삭제 실패:', err);
            return res.json({ success: false, message: '피드 삭제 실패' });
          }
    
          res.json({ success: true, message: '피드 및 관련 이미지가 삭제되었습니다.' });
        });
      });
    })

    .put((req, res)=>{
        const id = req.params.id;
        const query = 'UPDATE TBL_FEED SET favorite = favorite + 1 WHERE id = ? ';
    
        connection.query(query, [email], (err, results) => {
        if (err) {
            console.error('좋아요 증가 실패:', err);
            return res.json({success : false, message : "db 오류"});
        };

        res.json({ success: true, message: '추천!' });
        
        });
    });




  
module.exports = router;