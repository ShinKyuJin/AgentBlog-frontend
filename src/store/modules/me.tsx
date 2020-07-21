import { createAction, handleActions } from "redux-actions";
import { MeProps } from "../../interface/user";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";

const SET = "me/SET" as const;
const CLEAR = "me/CLEAR" as const;

// export const increment = () => ({ type: INCREMENT });
// export const decrement = () => ({ type: DECREMENT });
//export const fetch =
export const set = (data: MeProps) => ({ type: SET, payload: data });
//createAction(FETCH);
export const clear = () => ({ type: CLEAR });
//export const clear = createAction(CLEAR);

type MeAction = ReturnType<typeof set> | ReturnType<typeof clear>;

const initialState: MeProps = {
  id: "",
  avatar: "",
  bio: "",
  blogname: "",
  email: "",
  posts: [],
  username: "",
};

export default function reducer(state = initialState, action: MeAction) {
  switch (action.type) {
    case SET:
      return action.payload;
    case CLEAR:
      return initialState;
    default:
      return state;
  }
}
// export default handleActions(
//   {
//     [FETCH]: async ({ id }) => {
//       return data;
//     },
//     [CLEAR]: () => initialState,
//   },
//   initialState
// );

export const ME_QUERY = gql`
  {
    me {
      id
      avatar
      bio
      blogname
      email
      posts {
        id
        url
        title
        description
        thumbnail
        likeCount
        createdAt
        commentCount
      }
      username
    }
  }
`;
