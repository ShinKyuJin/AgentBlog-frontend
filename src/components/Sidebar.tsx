import React from 'react';
import styled from 'styled-components';

const Sidebar = () => {
  return (
    <Container>
      <ContentContainer>
        <b>공지 사항</b>
        -------
        1234
        1234
      </ContentContainer>
    </Container>
  );
}

const Container = styled.aside`
`

const ContentContainer = styled.div`
  position: fixed;
  top: 90px;
`



export default Sidebar;