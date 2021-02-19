import { MeProps } from "../../models/user";
import { gql } from "@apollo/client";

const SET = "me/SET" as const;
const PUT_ASYNC = "me/PUT_ASYNC" as const;
const CLEAR = "me/CLEAR" as const;

// export const increment = () => ({ type: INCREMENT });
// export const decrement = () => ({ type: DECREMENT });
//export const fetch =
export const me_set = (data: MeProps) => ({ type: SET, payload: data });
export const me_putAsync = (data: MeProps) => ({
  type: PUT_ASYNC,
  payload: data,
});
//createAction(FETCH);
export const me_clear = () => ({ type: CLEAR });
//export const clear = createAction(CLEAR);

// function* me_putSaga(action: ReturnType<typeof me_putAsync>) {
//   yield put(me_set(action.payload));
// }

export function* meSaga() {
  //yield takeLatest(PUT_ASYNC, me_putAsync);
}

type MeAction = ReturnType<typeof me_set> | ReturnType<typeof me_clear>;

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
