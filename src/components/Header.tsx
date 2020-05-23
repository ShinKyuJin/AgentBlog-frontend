import React from 'react';
import styled, { keyframes } from 'styled-components';
import SearchIcon from '../assets/search_icon.png';
import { Link } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 30px;
  height: 30px;
`

const Logo = styled(Link)`
  height: 30px;
  font-size: 24px;
`

const LoginHover = keyframes`
  from {
    background-color: rgb(52, 58, 64);
    color: white;
  }
  to {
    background-color: rgb(255, 255, 255);
    color: black;
  }
`

const Login = styled(Link)`
  height: 30px;
  margin-left: 30px;
  background-color: rgb(52, 58, 64);
  color: white;
  padding: 5px;
  border-radius: 12px;
  &:hover {
    animation: ${LoginHover} 0.5s;
  }
`

const Search = styled.img`
  width: 20px;
  height: 20px;
`




const Header = () => {
  return (
    <Container>
      <Logo to=''>AgentsBlog</Logo>
      <div>
        <Link to='/search'>
          <Search src={SearchIcon} alt='검색' />
        </Link>
        <Login to='/auth'>로그인</Login>
      </div>
    </Container>
  );
}

export default Header;