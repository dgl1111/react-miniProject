import React, { useState } from 'react';
import { Container, Typography, Box, Avatar, Grid, Paper } from '@mui/material';
import axios from 'axios';
import { useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Feed from './Feed'; // Feed 컴포넌트 가져오기

  function MyPage() {
    const [userInfo, setUserInfo] = useState([]);
    const [feeds, setFeeds] = useState([]); // 피드를 위한 상태 추가
    const navigate = useNavigate();

    useEffect(() => {
      if(localStorage.getItem("token") == null){
        navigate("/login");
      }else{
        fnList();
      }
      //console.log("userInfo => ", userInfo);
    },[]);
    
    async function fnList() {
      const token = localStorage.getItem("token");
      const dToken = jwtDecode(token);
      const email = dToken.email;
      
      console.log(email);

      try {
        const res = await axios.post("http://localhost:3100/user/info", {email});
        //console.log(res);
        console.log("res.data.success =>", res.data.success);
        if(res.data.success){
          setUserInfo({
            ...res.data.list,
            postCount: res.data.totalCount // postCount 추가
          });
          console.log("res.data =>", res.data.totalCount);
          console.log("res.data.list =>", res.data.list);
        } else {
          console.log("에러");
        }
      } catch (err) {
        console.log("에러");
      }
    }
  
  return (
    <Container maxWidth="lg">
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
              src="/img/dog.jpg" // 프로필 이미지 경로
              sx={{ width: 100, height: 100, marginBottom: 2 }}
            />
            <Typography variant="h5">{userInfo.name}</Typography> 
            <Typography variant="body2" color="text.secondary">{userInfo.email}</Typography>
          </Box>
          <Grid container spacing={2} sx={{ marginTop: 2, justifyContent: 'center',  width: '810px', mx: 'auto' }}>
            <Grid item xs={4} textAlign="center" sx={{ paddingLeft: 0 }}>
              <Typography variant="h6">팔로워</Typography>
              <Typography variant="body1">0</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">팔로잉</Typography>
              <Typography variant="body1">0</Typography>
            </Grid>
            <Grid item xs={4} textAlign="center">
              <Typography variant="h6">게시물</Typography>
              <Typography variant="body1">{userInfo.postCount || 0}</Typography>
            </Grid>
          </Grid>
          <Box sx={{ marginTop: 3 }}>
            {/* <Typography variant="h6">내 소개</Typography>
            <Typography variant="body1">
              안녕하세요! SNS를 통해 친구들과 소통하고 있습니다. 사진과 일상을 공유하는 것을 좋아해요.
            </Typography> */}
          </Box>
          {/* 피드 추가 */}
         <Box mt={4} sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {/* <Typography variant="h5">내 피드</Typography> */}
          <Feed feeds={feeds} /> {/* Feed 컴포넌트에 피드를 전달 */}
        </Box>
        </Paper>
        
         

      </Box>
    </Container>
  );
}

export default MyPage;