import React, { FC } from "react";
import styled from "styled-components";

interface SkeletonSuspenseProps {
  loading: boolean;
  children?: React.ReactNode;
  height?: number;
}

const SkeletonSuspense: FC<SkeletonSuspenseProps> = ({
  loading,
  children,
  height,
}) => {
  if (loading) return <Conatiner style={{ height }} />;
  else return <>{children}</>;
};

const Conatiner = styled.div`
  background-color: #eee;
  background-image: linear-gradient(90deg, #eee, #f5f5f5, #eee);
  background-size: 200px 100%;
  background-repeat: no-repeat;
  border-radius: 4px;
  display: inline-block;
  line-height: 1;
  width: 100%;
  height: 100%;
  -webkit-animation: animation-16jpnkj 1.2s ease-in-out infinite;
  animation: animation-16jpnkj 1.2s ease-in-out infinite;
`;

export default SkeletonSuspense;
