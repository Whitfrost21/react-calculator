import { Actions } from "../App";

export default function Digitbutton({ dispatch, digit }) {
  if (digit === ".") {
    return (
      <button
        style={{ borderRadius: "0 0 0 20px" }}
        onClick={() =>
          dispatch({ type: Actions.ADD_DIGIT, payload: { digit } })
        }
      >
        {digit}
      </button>
    );
  }
  return (
    <button
      onClick={() => dispatch({ type: Actions.ADD_DIGIT, payload: { digit } })}
    >
      {digit}
    </button>
  );
}
