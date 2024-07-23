import { Actions } from "../App";

export default function Operationbutton({ dispatch, operation }) {
  return (
    <button
      onClick={() =>
        dispatch({ type: Actions.CHOOSE_OPERATION, payload: { operation } })
      }
    >
      {operation}
    </button>
  );
}
