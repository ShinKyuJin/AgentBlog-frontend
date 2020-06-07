import React from 'react';
import styled from 'styled-components';

interface SidebarProps {
  content: string;
}

const test1 = /#+\n/;
const test2 = /##+\n/;
const test3 = /###+' '\n/;

const PostDetailSidebar: React.FC<SidebarProps> = ({ content }) => {
  console.log(content.split('\n'));
  const strArr = content.split('\n');
  const mappingCard = strArr.map((text) => {
    if (test1.test(text)) {
      return <Test1>{text}</Test1>;
    }
    else if (test2.test(text)) {
      return <Test2>{text}</Test2>;
    }
    else if (test3.test(text)) {
      return <Test3>{text}</Test3>;
    }
  })
  
  return (
    <Container>
      {mappingCard}
    </Container>
  );
}

const Container = styled.div`
  position: absolute; 
  right: 0;
  top: 300px;
  border-left: 1px solid rgb(200,210,220);
`
const Theme = styled.div`
  font-size: 16px;
  color: rgb(200,210,220);
`
const Test1 = styled(Theme)`
  margin-left: 0;
`
const Test2 = styled(Theme)`
  margin-left: 10px;
`
const Test3 = styled(Theme)`
  margin-left: 20px;
`

export default PostDetailSidebar;