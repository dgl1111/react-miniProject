import React, { useEffect, useState } from 'react';
import {
  Grid2,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  DialogActions,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';

function Feed() {
  const [feeds, setFeeds] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState([]);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userId, setuserId] = useState(''); 
  const navigate = useNavigate();

  // 피드 목록을 가져오는 함수
  const fnFeed = async () => { 
    const token = localStorage.getItem("token"); 
    try {
      const res = await axios.get('http://localhost:3100/feed', { headers: { token } }); 
      console.log("res.data =>", res.data); // 응답 내용 확인
      if (res.data.success) {
        setFeeds(res.data.list); 
      } else {
        console.log("서버에서 응답 오류:", res.data.message);
      }
    } catch (err) {
      console.error("API 요청 중 오류 발생:", err); // 오류 정보를 더 자세히 출력 
    }
  };

  // 컴포넌트가 마운트될 때 피드 목록과 사용자 정보를 가져옴
  useEffect(() => { 
    fnFeed(); 
    const token = localStorage.getItem("token"); 
    if (token) { 
      try {
        const decodedToken = jwtDecode(token); 
        setuserId(decodedToken.userId); 
      } catch (err) {
        console.error("API 요청 중 오류 발생:", err);
      }
    }
  }, []); 

  const handleDelete = async (feedId) => {
    if (!window.confirm("삭제하시겠습니까?")) {
      return;
    }
    
    try {
      const token = localStorage.getItem("token");
      const res = await axios.delete(`http://localhost:3100/feed/${feedId}`, { headers: { token } });
      if (res.data.success) {
        alert("삭제되었습니다.");
        handleClose(); // 모달창 닫기
        window.location.reload();
        
      } else {
        alert("삭제 실패: " + res.data.message);
      }
    } catch (err) {
      console.error("삭제 중 오류 발생:", err);
      alert("삭제 중 오류 발생");
    }
  };

  const handleClickOpen = (feed) => {
    console.log("Selected Feed=>", feed)
    setSelectedFeed(feed);
    setOpen(true);
    setComments([
      { id: 'user1', text: '멋진 사진이에요!' },
      { id: 'user2', text: '이 장소에 가보고 싶네요!' },
      { id: 'user3', text: '아름다운 풍경이네요!' },
    ]); // 샘플 댓글 추가
    setNewComment(''); // 댓글 입력 초기화
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedFeed(null);
    setComments([]); // 모달 닫을 때 댓글 초기화
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      setComments([...comments, { id: userId || 'currentUser', text: newComment }]); // 댓글 작성자 아이디 추가
      setNewComment('');
    }
  };

  return (
    <Container sx={{ width: '698px', maxWidth: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
      {/* <AppBar position="static" sx={{ backgroundColor: 'transparent', boxShadow: 'none' }}>
        <Toolbar sx={{ padding: 0, margin: 0 }}>
          <Typography variant="h6" sx={{ color: 'black' }}>게시물</Typography>
        </Toolbar>
      </AppBar> */}

      <Box mt={4} sx={{ flex: 1, width: '100%' }}>
        <Grid2 container spacing={3} sx={{ justifyContent: 'flex-start' }}>
          {feeds.map((feed) => (
            <Grid2 xs={12} sm={6} md={4} key={feed.id} sx={{ display: 'flex', justifyContent: 'flex-start' }}>
              <Card sx={{ width: '200px', height: '300px', display: 'flex', flexDirection: 'column'}}>
                <CardMedia
                  component="img"
                  height="250"
                  image={`http://localhost:3100/${feed.img_path}`}
                  onClick={() => handleClickOpen(feed)}
                  //style={{ cursor: 'pointer'}}
                  sx={{
                    cursor: 'pointer',
                    objectFit: 'cover',
                    width: '100%',
                    height: '100%',
                    margin: 0, // 모든 여백을 0으로 설정
                    alignSelf: 'flex-start', // 왼쪽 정렬
                    display: 'block', // 블록 요소로 설정하여 왼쪽 정렬

                  }}
                />
                {/* <CardContent>
                  <Typography variant="body2" color="textSecondary">
                  {feed.content}
                  </Typography>
                </CardContent> */}
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg"> {/* 모달 크기 조정 */}
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent sx={{ display: 'flex' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">{selectedFeed?.description}</Typography>
            {selectedFeed && selectedFeed.img_path && (
              <img
                src={`http://localhost:3100/${selectedFeed.img_path}`}
                alt={selectedFeed.content}
                style={{ width: '80%', marginTop: '10px' }}
              />
            )}
            <DialogTitle>
            {selectedFeed?.content}
            </DialogTitle>
          </Box>
          <Box sx={{ width: '300px', marginLeft: '20px' }}>
            <Typography variant="h6">댓글</Typography>
            <List>
              {comments.map((comment, index) => (
                <ListItem key={index}>
                  <ListItemAvatar>
                    <Avatar>{comment.id.charAt(0).toUpperCase()}</Avatar> {/* 아이디의 첫 글자를 아바타로 표시 */}
                  </ListItemAvatar>
                  <ListItemText primary={comment.text} secondary={comment.id} /> {/* 아이디 표시 */}
                </ListItem>
              ))}
            </List>
            <TextField
              label="댓글을 입력하세요"
              variant="outlined"
              fullWidth
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}           
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddComment}
              sx={{ marginTop: 1 }}
            >
              댓글 추가
            </Button>
          </Box>
        </DialogContent>
          <IconButton onClick={() => handleDelete(selectedFeed?.feed_id)} sx={{ marginTop: 2 }}>
            <DeleteIcon />
          </IconButton>
        
        {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            닫기
          </Button>
        </DialogActions> */}
      </Dialog>
    </Container>
  );
}

export default Feed;