import React from "react";
import styled from "styled-components";

class MyErrorBoundary extends React.Component<{}, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다.
    //logErrorToMyService(error, errorInfo);
    console.error(error);
    console.error(errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <FallbackContainer>문제가 발생했습니다!</FallbackContainer>;
    }

    return this.props.children;
  }
}
const FallbackContainer = styled.div`
  width: 100%;
  height: 20rem;
  font-size: 3rem;
  font-weight: bold;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MyErrorBoundary;
