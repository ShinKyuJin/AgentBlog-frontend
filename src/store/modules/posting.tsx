const SET = "posting/SET" as const;
const PUT = "posting/PUT" as const;
const ADD_CONTENT = "posting/ADD_CONTENT" as const;
const CLEAR = "posting/CLEAR" as const;

interface postingSetProps {
  key: keyof postingProps;
  value: any;
}

export const posting_set = (data: postingSetProps) => ({
  type: SET,
  payload: data,
});

export const posting_addContent = (data: string) => ({
  type: ADD_CONTENT,
  payload: data,
});

export const posting_put = (data: postingProps) => ({
  type: PUT,
  payload: data,
});

export const posting_clear = () => ({ type: CLEAR });

type PostingAction = ReturnType<
  | typeof posting_set
  | typeof posting_addContent
  | typeof posting_put
  | typeof posting_clear
>;

interface postingProps {
  isEditing: boolean;
  id: string;
  title: string;
  content: string;
  hashtags: string[];
  series_id: string;
  thumbnail: string;
  url: string;
}

const initialState: postingProps = {
  isEditing: false,
  id: "",
  title: "",
  content: "",
  hashtags: [],
  series_id: "",
  thumbnail: "",
  url: "",
};

export default function reducer(state = initialState, action: PostingAction) {
  switch (action.type) {
    case SET:
      const { key, value } = action.payload as postingSetProps;
      (state[key] as any) = value;
      return state;
    case ADD_CONTENT:
      state.content = state.content.concat(action.payload as string);
      return state;
    case PUT:
      return action.payload;
    case CLEAR:
      return initialState;
    default:
      return state;
  }
}
