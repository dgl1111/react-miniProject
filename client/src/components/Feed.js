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

// const mockFeeds = [
//   {
//     id: 1,
//     title: '게시물 1',
//     description: '이것은 게시물 1의 설명입니다.',
//     image: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//   },
//   {
//     id: 2,
//     title: '게시물 2',
//     description: '이것은 게시물 2의 설명입니다.',
//     image: 'https://images.unsplash.com/photo-1521747116042-5a810fda9664',
//   },
//   // 추가 피드 데이터
// ];

function Feed() {
  const [feeds, setFeeds] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFeed, setSelectedFeed] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [userId, setuserId] = useState(''); 

  // 피드 목록을 가져오는 함수
  const fnFeed = async () => { 
    const token = localStorage.getItem("token"); 
    try {
      const res = await axios.get('http://localhost:3100/feed', { headers: { token } }); 
      console.log(res.data); // 응답 내용 확인
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
    console.log(feeds); // 피드 상태 확인
    const token = localStorage.getItem("token"); 
    if (token) { 
      try {
        const decodedToken = jwtDecode(token); 
        setuserId(decodedToken.userId); 
      } catch (err) {
        console.log("토큰 디코딩 에러:", err); 
      }
    }
  }, []); 

  const handleClickOpen = (feed) => {
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
    <Container maxWidth="md">
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">SNS</Typography>
        </Toolbar>
      </AppBar>

      <Box mt={4}>
        <Grid2 container spacing={3}>
          {feeds.map((feed) => (
            <Grid2 xs={12} sm={6} md={4} key={feed.id}>
              {feed.content}
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={feed.img_path}
                  alt={feed.title}
                  onClick={() => handleClickOpen(feed)}
                  style={{ cursor: 'pointer' }}
                />
                <CardContent>
                  <Typography variant="body2" color="textSecondary">
                    {feed.title}
                  </Typography>
                </CardContent>
              </Card>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg"> {/* 모달 크기 조정 */}
        <DialogTitle>
          {selectedFeed?.title}
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
            sx={{ position: 'absolute', right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ display: 'flex' }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1">{selectedFeed?.description}</Typography>
            {selectedFeed?.image && (
              <img
                src={selectedFeed.image}
                alt={selectedFeed.title}
                style={{ width: '100%', marginTop: '10px' }}
              />
            )}
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
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            닫기
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default Feed;