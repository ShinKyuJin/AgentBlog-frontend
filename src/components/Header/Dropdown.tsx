import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

interface DropdownProps {
  items: {
    name: string;
    to: string;
  }[];
}

const Dropdown = React.forwardRef<HTMLElement, DropdownProps>(
  ({ items }, ref) => {
    return (
      <Container ref={ref as React.RefObject<HTMLDivElement>}>
        <Content>
          <Wrapper>
            {items.map((item, i) => (
              <Link to={item.to} key={i}>
                <DropdownItem>{item.name}</DropdownItem>
              </Link>
            ))}
          </Wrapper>
        </Content>
      </Container>
    );
  }
);

const Container = styled.div`
  position: relative;
  z-index: 10;
`;
const Content = styled.div`
  position: absolute;
  top: 100%;
  right: 0px;
  margin-top: 1rem;
`;
const Wrapper = styled.div`
  position: relative;
  width: 12rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
  background: white;
`;
const DropdownItem = styled.div`
  color: rgb(33, 37, 41);
  line-height: 1.5;
  font-weight: 500;
  cursor: pointer;
  padding: 0.75rem 1rem;
  &:hover {
    background: rgb(248, 249, 250);
  }
`;

export default Dropdown;
