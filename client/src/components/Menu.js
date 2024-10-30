import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemText, Typography, Toolbar, ListItemIcon } from '@mui/material';
import { Home, Add, AccountCircle } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';



function Menu() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(!!localStorage.getItem("token"));

  function fnLogout(){
    localStorage.clear();
    setIsLogin(false);
    navigate("/main");
}


  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240, // 너비 설정
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 240, // Drawer 내부의 너비 설정
          boxSizing: 'border-box',
        },
      }}
    >
      <Toolbar />
      <Typography variant="h6" component="div" sx={{ p: 2 }}>
        SNS 메뉴
      </Typography>
      <List>
        <ListItem button component={Link} to="/feed">
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="피드" />
        </ListItem>
        <ListItem button component={Link} to="/register">
          <ListItemIcon>
            <Add />
          </ListItemIcon>
          <ListItemText primary="등록" />
        </ListItem>
        <ListItem button component={Link} to="/mypage">
          <ListItemIcon>
            <AccountCircle />
          </ListItemIcon>
          <ListItemText primary="마이페이지" />
        </ListItem>
        <Stack direction="row" spacing={2}>
          {isLogin ? (
              <Button size="medium" onClick={fnLogout}>로그아웃</Button>
            ) : (
              <Button size="medium" component={Link} to="/login">로그인</Button>
          )}
      </Stack>
     
          
        
      </List>
    </Drawer>
  );
};

export default Menu;