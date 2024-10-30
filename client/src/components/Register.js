import React, { useState, useEffect, useRef } from 'react';
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
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState('');
  const [email, setEmail] = useState(''); // email 상태 추가
  const navigate = useNavigate();
  const contentRef = useRef(null);

  const handleFileChange = (event) => {
    const selectedFiles = Array.from(event.target.files); // 선택된 파일 배열
    setFiles((prevFiles) => [
      ...prevFiles,
      ...selectedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file), // 미리 보기 URL 생성
      })),
    ]);
  };

  const removeImage = (index) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index)); // 이미지 삭제
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('email', email);
    formData.append('content', content);
    for (let i = 0; i < files.length; i++) {
      formData.append('images', files[i].file);
    }
    

    try {
      const res = await axios.post("http://localhost:3100/feed", formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // 헤더 설정
        },
      });

      alert(res.data.message);
      navigate("/mypage");
      
    } catch (error) {
      console.log("등록 중 오류", error);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setEmail(decodedToken.email); // 사용자 이메일 설정
        contentRef.current.focus();
      } catch (err) {
        console.log("토큰 디코딩 에러:", err);
      }
    }
  }, []);



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
          inputRef={contentRef} // 여기에서 ref를 연결합니다.
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
            multiple
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <IconButton color="primary" component="span">
              <PhotoCamera />
            </IconButton>
          </label>

          
          <Box display="flex" flexWrap="wrap" gap={2} mt={2}>
            {files.map((fileObj, index) => (
              <Box key={index} position="relative">
                <Avatar
                  alt={`uploaded-${index}`}
                  src={fileObj.preview} // 미리 보기 이미지
                  sx={{ width: 56, height: 56 }}
                />
                <IconButton
                  onClick={() => removeImage(index)} // 이미지 삭제 버튼
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: -20,
                    color: 'white',
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            ))}
          </Box>
          <Typography variant="body1" sx={{ marginLeft: 2 }}>
            {files ? files.name : '첨부할 파일 선택'}
          </Typography>
        </Box>

        <Button 
          variant="contained" 
          color="primary" 
          fullWidth 
          style={{ marginTop: '20px' }}
          onClick={handleRegister}
          disabled={files.length === 0} // 파일이 없으면 비활성화
          >
          등록하기
        </Button>
      </Box>
    </Container>
  );
}

export default Register;