import React, { FC } from "react";
import styled from "styled-components";
import { Helmet } from "react-helmet";

interface PageTabProps {
  tabItems: { title?: string; url: string; component: React.ReactNode }[];
  tabNum: number;
  setTabNum: any;
  tabWidth?: number;
}

const PageTab: FC<PageTabProps> = ({
  tabNum,
  setTabNum,
  tabItems,
  tabWidth,
}) => {
  const tabButtonHandler = (idx: number) => {
    const newTabItem = tabItems[idx];
    console.log(idx);
    console.log(newTabItem);
    setTabNum(idx);
    window.history.replaceState(null, newTabItem.title || "", newTabItem.url);
  };

  return (
    <nav>
      <Helmet>
        <title>{tabItems[tabNum].title}</title>
      </Helmet>
      <TabContainer tabCount={tabItems.length} tabWidth={tabWidth || 7}>
        {tabItems.map((tab, idx) => (
          <TabButton
            tabNum={tabNum}
            tabWidth={tabWidth || 7}
            onClick={() => tabButtonHandler(idx)}
          >
            {tabItems[idx].component}
          </TabButton>
        ))}
        <FocusBar tabNum={tabNum} tabCount={tabItems.length} />
      </TabContainer>
    </nav>
  );
};

interface TabContainerProps {
  tabCount: number;
  tabWidth: number;
}
const TabContainer = styled.div<TabContainerProps>`
  width: ${(props) => props.tabCount * props.tabWidth + `rem`};
  min-height: min-content;
  display: flex;
  flex-wrap: wrap;
`;

interface TabProps {
  tabNum: number;
  tabWidth: number;
}
const TabButton = styled.div<TabProps>`
  width: ${(props) => props.tabWidth + `rem`};
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  font-size: 1.125rem;
  height: 3rem;
  text-decoration: none;
  &:nth-child(${(props) => props.tabNum + 1}) {
    color: rgb(52, 58, 64);
    font-weight: bold;
  }
  color: rgb(134, 142, 150);
  cursor: pointer;
`;

interface TabFocusProps {
  tabCount: number;
  tabNum: number;
}
const FocusBar = styled.div<TabFocusProps>`
  width: ${(props) => (props.tabCount === 0 ? 0 : 100 / props.tabCount + `%`)};
  height: 2px;
  bottom: 0px;
  background: rgb(52, 58, 64);
  transition: transform 0.35s cubic-bezier(0, 0, 0.1, 1.5) 0s;
  position: relative;
  transform: ${(props) => `translateX(${props.tabNum * 100}%);`};
`;

export default PageTab;
