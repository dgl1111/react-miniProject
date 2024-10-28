import React, { useState } from 'react';
import {
  TextField,
  Button,
  Container,
  Typography,
  Box,
  Avatar,
  IconButton,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';
import axios from 'axios';

function Register() {
  const [file, setFile] = React.useState(null);
  const [content, setContent] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleRegister = async () => {
    const formData = new FormData();
    formData.append('content', content);

    if(file){
      formData.append('img_path', file);
    }

    try {
      const res = await axios.post("http://localhost:3100/feed", formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 헤더 설정
        },
      });

      console.log(res.data);
      
    } catch (error) {
      console.log("error");
    }
  };



  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="flex-start" // 상단 정렬
        minHeight="100vh"
        sx={{ padding: '20px' }} // 배경색 없음
      >
        <Typography variant="h4" gutterBottom>
          등록
        </Typography>

        <TextField
          label="내용"
          variant="outlined"
          margin="normal"
          fullWidth
          multiline
          rows={4}
          value={content}
          onChange={(e)=> setContent(e.target.value)}
        />

        <Box display="flex" alignItems="center" margin="normal" width="100%">
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>
          {file && (
            <Avatar
              alt="첨부된 이미지"
              src={URL.createObjectURL(file)}
              sx={{ width: 56, height: 56, marginLeft: 2 }}
            />
          )}
          <Typography variant="body1" sx={{ marginLeft: 2 }}>
            {file ? file.name : '첨부할 파일 선택'}
          </Typography>
        </Box>

        <Button 
          variant="contained" 
          color="primary" 
          fullWidth style={{ marginTop: '20px' }}
          onClick={handleRegister}>
          등록하기
        </Button>
      </Box>
    </Container>
  );
}

export default Register;