import React, { useState } from 'react';
import { Container, Typography, Box, Avatar, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';

  function MyPage() {
    const [userInfo, setUserInfo] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      if(localStorage.getItem("token") == null){
        navigate("/login");
      }
      fnList();
      console.log(userInfo);
    },[]);
    
    async function fnList() {
      const token = localStorage.getItem("token");
      const dToken = jwtDecode(token);
      const email = dToken.email;

      try {
        const res = await axios.post("http://localhost:3100/user/info", {email});
        //console.log(res);
        console.log(res.data.success);
        if(res.data.success){
          setUserInfo(res.data.list);
          //console.log(res.data.list);
          console.log(userInfo)
        }else{
          console.log("에러");
        }
      } catch (err) {
        console.log("에러");
        
      }
    }
  
  
  

  

  

  
  return (
    <Container maxWidth="md">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start"
        minHeight="100vh"
        sx={{ padding: '20px' }}
      >
        <Paper elevation={3} sx={{ padding: '20px', borderRadius: '15px', width: '100%' }}>
          {/* 프로필 정보 상단 배치 */}
          <Box display="flex" flexDirection="column" alignItems="center" sx={{ marginBottom: 3 }}>
            <Avatar
              alt="프로필 이미지"
              src="https://images.unsplash.com/photo-1551963831-b3b1ca40c98e" // 프로필 이미지 경로
              sx={{ width: 100, height: 100, marginBottom: 2 }}
            />
            <Typography variant="h5">{userInfo.name}</Typography>
            <Typography variant="body2" color="text.secondary">{userInfo.email}</Typography>
          </Box>
          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로워</Typography>
              <Typography variant="body1">150</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로잉</Typography>
              <Typography variant="body1">100</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">게시물</Typography>
              <Typography variant="body1">50</Typography>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 3 }}>
            <Typography variant="h6">내 소개</Typography>
            <Typography variant="body1">
              안녕하세요! SNS를 통해 친구들과 소통하고 있습니다. 사진과 일상을 공유하는 것을 좋아해요.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default MyPage;