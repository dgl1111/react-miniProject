import React, { useEffect, useRef } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';


function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  useEffect(()=>{
    console.log(localStorage.getItem("token"));
    if(localStorage.getItem("token") != null){
      navigate("/mypage");
    }
    emailRef.current.focus();
  }, []);

  async function fnLogin(){
    console.log(emailRef.current.value);
    console.log(passwordRef.current.value);
    try {
      const res = await axios.post("http://localhost:3100/user", 
        {email : emailRef.current.value, password : passwordRef.current.value});

        if(res.data.success){
          console.log(res.data);
          localStorage.setItem("token", res.data.token);
          navigate("/mypage")
        }else{
          alert("다시")
        }

    } catch (err) {
      console.log("오류발생");
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
          로그인
        </Typography>
        <TextField inputRef={emailRef} label="이메일" variant="outlined" margin="normal" fullWidth />
        <TextField
          inputRef={passwordRef}
          label="비밀번호"
          variant="outlined"
          margin="normal"
          fullWidth
          type="password"
        />
        <Button onClick={fnLogin} variant="contained" color="primary" fullWidth style={{ marginTop: '20px' }}>
          로그인
        </Button>
        <Typography variant="body2" style={{ marginTop: '10px' }}>
        계정이 없으신가요? <Link to="/join">가입하기</Link>
        </Typography>
      </Box>
    </Container>
  );
}

export default Login;
