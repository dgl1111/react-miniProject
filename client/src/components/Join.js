import React, { useRef } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



function Join() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPwdRef = useRef();
  const userIdRef = useRef();
  const nameRef = useRef();
  const birthRef = useRef();
  const navigate = useNavigate();

  
  async function fnJoin(){
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const confirmPwd= confirmPwdRef.current.value;
    const userId = userIdRef.current.value;
    const name = nameRef.current.value;
    const birth = birthRef.current.value;

    if(password !== confirmPwd){
      alert("비밀번호가 다릅니다.")
      return;

    }

    try{
      const res = await axios.post("http://localhost:3100/user/insert", {name, email, password, birth, userId});

      if(res.data.success){
        navigate("/login")

    }else{
      alert("다시 확인하세요.")
    }

  }catch (error) {
      
  }

}


  return (
    <Container maxWidth="xs">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="100vh"
      >
        <Typography variant="h4" gutterBottom>
          회원가입
        </Typography>
        
        <TextField inputRef={emailRef} label="이메일 주소" variant="outlined" margin="normal" fullWidth />
        <TextField
          inputRef={passwordRef}
          label="비밀번호"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
        />
        <TextField inputRef={confirmPwdRef} label="비밀번호 확인" variant="outlined" type="password" fullWidth margin="normal" />
        <TextField inputRef={userIdRef} label="사용자 이름" variant="outlined" margin="normal" fullWidth />
        <TextField inputRef={nameRef} label="성명" variant="outlined" margin="normal" fullWidth />
        <TextField inputRef={birthRef} label="생년월일" variant="outlined" margin="normal" fullWidth />
        <Button onClick={fnJoin} variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
            가입
        </Button>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
          이미 회원이라면? <Link to="/login">로그인</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Join;