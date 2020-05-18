import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import searchIcon from '../assets/search_icon.png';

const Container = styled.div`
  padding: 30px;
  display: flex;
  justify-content: space-between;
`

const HomeLink = styled(Link)`
  color: red;
`

const SearchLink = styled(Link)`
`

const SearchIcon = styled.img`
  width: 20px;
  height: 20px;
`


const Nav = () => {
  return (
    <Container>
      <HomeLink to=''>AgentsBlog</HomeLink>
      <SearchLink to=''>
        <SearchIcon src={searchIcon} alt="search" />
      </SearchLink>
    </Container>
  )
}

export default Nav;