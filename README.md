<p align="center" >
<a href="#" align="center"> <img src="https://user-images.githubusercontent.com/13609011/84003962-c3ecde80-a9a5-11ea-8722-8a7e9d99681f.png" width="250" height="250" align="center"/></a>
</p>
<h1 align="center">
  Agent Blog Client </br>  <img alt="React" src="https://img.shields.io/badge/React-16.9.34-red.svg"> <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-3.7.5-blue.svg"> <img alt="Hooks" src="https://img.shields.io/badge/Hooks-0.5.0-blueviolet.svg"> <img alt="Apollo" src="https://img.shields.io/badge/React_Apollo-3.1.5-green.svg"> <img alt="platform" src="https://img.shields.io/badge/platform-Web-orange.svg">
</h1>

### 🔥 Motivation

> React + TypeScript + Hooks + Apollo 기술을 공부하고, **협업능력**을 기르기 위해 시작한 프로젝트입니다. <br /> <br /> 또한 React를 Javascript로 개발해오면서 디버깅이 불편하고 유지보수도 어렵다는 단점을 개선하고자 **TypeScript**를 도입하게 되었습니다.  (+ 효율적인 협업을 위해)


## 서비스 소개

### [Velog](https://velog.io/) 블로그 서비스 클론코딩 프로젝트
- 개발자들을 위한 블로그 서비스.
- 마크다운 (Markdown) 문법을 사용하여 개발자들이 쉽고 빠르게 예쁘게 꾸며진 포스트를 작성 할 수 있습니다.
- 메인 페이지에서 개발 트렌드 및 인기 태그 제공을 통해 융용한 정보를 쉽고 빠르게 찾을 수 있습니다.
- 개발자들을 위한 블로그 서비스인 velog를 프론트엔드, 벡엔드 모두 클론코딩하여 Markdown 기반 게시물 작성, 해시태그 설정, 게시물 검색, 해시태그 검색, 반응형디자인 등 대부분의 기능을 구현하였습니다.

## File Setting
```
📦src
 ┣ 📂Apollo
 ┃ ┣ 📜Client.tsx
 ┃ ┗ 📜LocalState.tsx
 ┣ 📂components
 ┃ ┣ 📂atoms
 ┃ ┃ ┣ 📂post
 ┃ ┃ ┃ ┣ 📜Hashtag.tsx
 ┃ ┃ ┃ ┣ 📜HomePostCard.tsx
 ┃ ┃ ┃ ┣ 📜Markdown.tsx
 ┃ ┃ ┃ ┗ 📜SearchPostCard.tsx
 ┃ ┃ ┣ 📂system
 ┃ ┃ ┃ ┣ 📜ErrorBoundary.tsx
 ┃ ┃ ┃ ┣ 📜SkeletonSuspense.tsx
 ┃ ┃ ┃ ┗ 📜Uploader.tsx
 ┃ ┃ ┣ 📂theme
 ┃ ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┃ ┣ 📜DetailText.tsx
 ┃ ┃ ┃ ┣ 📜FatText.tsx
 ┃ ┃ ┃ ┣ 📜Icon.tsx
 ┃ ┃ ┃ ┣ 📜ImageLoader.tsx
 ┃ ┃ ┃ ┣ 📜Input.tsx
 ┃ ┃ ┃ ┗ 📜UnderlineButton.tsx
 ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┗ 📜Avatar.tsx
 ┃ ┣ 📂modules
 ┃ ┃ ┣ 📂Header
 ┃ ┃ ┃ ┣ 📜Dropdown.tsx
 ┃ ┃ ┃ ┣ 📜HeaderContainer.tsx
 ┃ ┃ ┃ ┣ 📜HeaderPresenter.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂HomePostList
 ┃ ┃ ┃ ┣ 📜HomePostList.tsx
 ┃ ┃ ┃ ┣ 📜HomePostListQueries.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂SearchPostList
 ┃ ┃ ┃ ┣ 📜SearchPostList.tsx
 ┃ ┃ ┃ ┣ 📜SearchPostListQueries.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂Sidebar
 ┃ ┃ ┃ ┣ 📜Sidebar.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂modal
 ┃ ┃ ┃ ┣ 📂Auth
 ┃ ┃ ┃ ┃ ┣ 📜AuthContainer.tsx
 ┃ ┃ ┃ ┃ ┣ 📜AuthPresenter.tsx
 ┃ ┃ ┃ ┃ ┣ 📜AuthQueries.tsx
 ┃ ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┃ ┣ 📜CloseButton.tsx
 ┃ ┃ ┃ ┗ 📜Modal.tsx
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┣ 📜PageTab.tsx
 ┃ ┃ ┗ 📜PostingToolbars.tsx
 ┃ ┗ 📂pages
 ┃ ┃ ┣ 📂PostDetail
 ┃ ┃ ┃ ┣ 📂Comment
 ┃ ┃ ┃ ┃ ┣ 📜Comment.tsx
 ┃ ┃ ┃ ┃ ┗ 📜addCommentQueries.tsx
 ┃ ┃ ┃ ┣ 📜PostDetailContainer.tsx
 ┃ ┃ ┃ ┣ 📜PostDetailPresenter.tsx
 ┃ ┃ ┃ ┣ 📜PostDetailQueries.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂UserHome
 ┃ ┃ ┃ ┣ 📜UserHome.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📂WritePost
 ┃ ┃ ┃ ┣ 📜WritePostContainer.tsx
 ┃ ┃ ┃ ┣ 📜WritePostPresenter.tsx
 ┃ ┃ ┃ ┗ 📜index.tsx
 ┃ ┃ ┣ 📜Auth.tsx
 ┃ ┃ ┣ 📜Home.tsx
 ┃ ┃ ┣ 📜LoginRequired.tsx
 ┃ ┃ ┣ 📜PageNotFound.tsx
 ┃ ┃ ┣ 📜Search.tsx
 ┃ ┃ ┣ 📜SearchHashtag.tsx
 ┃ ┃ ┗ 📜Setting.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useInput.tsx
 ┃ ┗ 📜useOnOutsideClick.tsx
 ┣ 📂models
 ┃ ┣ 📜hashtag.tsx
 ┃ ┣ 📜interfaces.ts
 ┃ ┣ 📜post.tsx
 ┃ ┗ 📜user.tsx
 ┣ 📂shared
 ┃ ┣ 📜App.tsx
 ┃ ┣ 📜Routes.tsx
 ┃ ┗ 📜utils.tsx
 ┣ 📂store
 ┃ ┣ 📂modules
 ┃ ┃ ┣ 📜counter.tsx
 ┃ ┃ ┣ 📜index.tsx
 ┃ ┃ ┣ 📜me.tsx
 ┃ ┃ ┣ 📜posting.tsx
 ┃ ┃ ┗ 📜todos.tsx
 ┃ ┣ 📜configure.tsx
 ┃ ┗ 📜index.tsx
 ┣ 📂styles
 ┃ ┣ 📜GlobalStyles.ts
 ┃ ┣ 📜devices.ts
 ┃ ┗ 📜theme.ts
 ┣ 📜index.tsx
```


## UI

### 1) 메인 홈페이지

![velog_feed mov](https://user-images.githubusercontent.com/13609011/84225378-edc71200-ab19-11ea-9fd8-371c31a68d09.gif)

- Card 디자인 & Skeleton 로딩 구현
- 트렌딩 / 최신 게시물 노출
- hover 애니메이션
- 인기태그 표시
- SPA의 단점인 초반 로딩 시간을 단축시키기 위해 라우터에서 React.lazy를 사용하여 페이지의 리소스를 필요할 때 동적으로 로딩함 (지연로딩)
    - 리소스 다운로드중엔 Suspense를 사용하여 로딩 중임을 표시




### 2) Responsive Layout
<table>
   <tr>
     <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/13609011/84225388-f586b680-ab19-11ea-812c-4adea276119b.gif"/>
       <br><br>[피드]
     </th>
     <th align="center">
       <img width="400" alt="2" src="https://user-images.githubusercontent.com/13609011/84225392-f7e91080-ab19-11ea-884a-ec2b1ec6920a.gif"/>
       <br><br>[검색] 
    </th>
  </tr>
</table>

- 미디어 쿼리를 이용하여 반응형 웹사이트를 구현



### 3) 로그인

<table>
   <tr>
     <th align="center">
       <img width="400" alt="1" src="https://user-images.githubusercontent.com/13609011/84225386-f3bcf300-ab19-11ea-96e1-073c342a652d.gif"/>
       <br><br>[로그인]
     </th>
     <th align="center">
       <img width="400" alt="2" src="https://user-images.githubusercontent.com/13609011/84225370-ebfd4e80-ab19-11ea-84d7-0becdc0e8765.gif"/>
       <br><br>[회원가입] 
    </th>
  </tr>
</table>

- 모달을 통해 로그인과 회원가입을 구현했습니다.
    - Portal 사용

![velog_login mov](https://user-images.githubusercontent.com/13609011/84225384-f1f32f80-ab19-11ea-8172-9adfed4cab7d.gif)

- 이메일 인증으로 로그인 구현
    - nodemailer 사용



### 4) 해시태그 검색

![velog_hashtag mov](https://user-images.githubusercontent.com/13609011/84225382-f0296c00-ab19-11ea-9582-e3b538e6a086.gif)

- Skeleton loading 구현



### 5) 게시물 검색

![velog_search mov](https://user-images.githubusercontent.com/13609011/84225393-f91a3d80-ab19-11ea-9db4-99c66a9edec0.gif)

- Input 값의 변화를 실시간으로 감지하여 입력 즉시 검색 데이터를 받아옴




## 활용기술
- **[Hooks]()**: 함수형 컴포넌트의 React State와 생명주기 관리를 도와주는 모듈로 기존의 함수형 컴포넌트에서 할 수 없었던 다양한 작업을 할 수 있게 도와줍니다. (클래스형 컴포넌트 기능 거의 대부분을 대체가능)
- **[Styled-component]()**: CSS 파일 없이 자바스크립트 안에서 CSS 작업을 할 수있게 도와주는 모듈로 HTML element + CSS + Javascript 코드를 Component로 캡슐화시켜 코드를 관리하기 용이하도록 도와준다. (클래스 기반 Component 스타일링 대체)
- **[Apollo]()**: GraphQL의 클라이언트 라이브러리 중 하나로 GraphQL 상태 관리 플랫폼입니다.
- **[Axios]()**: 파일 업로드를 처리하기 위해 도입한 HTTP 클라이언트 라이브러리로써, 비동기 방식으로 Node.js 서버에 HTTP 데이터 요청을 실행합니다. (파일 관리에 있어서는 RESTfull 방식이 GraphQL 방식보다 효과적)
- **[Sass]()**: CSS의 유지보수의 불편함을 개선하여 효율적인 스타일링을 도와주는 라이브러리입니다.
- **[Intersection Observer]()**: 기존 Scroll Event로 Infinite Scroll을 구현하면 엘리먼트의 offset을 구하기 위해 불필요한 함수 호출과 매번 layout을 새로 그려 성능의 문제가 발생하게 되는 데, Intersection Observer는 타겟 엘리먼트와, 타겟 엘리먼트의 부모나 뷰포트가 교차하는 부분의 변화를 비동기적으로 관찰하여 이러한 문제점을 해결해준다.
- **[Toastify]()**: Notification, Alert를 쉽고 예쁘게 처리하도록 도와준다.

## Todo
- [ ] 게시글 삭제 시 modal로 확인창 표시
- [ ] 좋아요 누르면 즉각 반응 처리
- [ ] 헤더에 블로그 이름 처리
- [ ] 댓글에 답글 달기
- [ ] 임시저장
- [ ] 시리즈 구현
- [ ] 글 쓰기 시 썸네일 및 시리즈 설정
- [ ] 좋아요 누른 게시물 표시
- [ ] https://github.com/connect-foundation/2019-03 참고해서 리드미 다듬기
