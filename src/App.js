import React, { useReducer } from "react";
import "./App.css";
import Digitbutton from "./utils/Digitsbutton";
import Operationbutton from "./utils/Operationbutton";

export const Actions = {
  ADD_DIGIT: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  DELETE_DIGIT: "delete-digit",
  CLEAR: "clear",
  EVALUATE: "evaluate",
};
const initialstate = { currentOperand: "" };
function reducer(state = initialstate, { type, payload }) {
  switch (type) {
    case Actions.ADD_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          currentOperand: payload.digit,
          overwrite: false,
        };
      }
      if (payload.digit === "0" && state.currentOperand === "0") {
        return state;
      }
      if (payload.digit === "." && (state.currentOperand || "").includes(".")) {
        return state;
      }
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };

    case Actions.CHOOSE_OPERATION:
      if (state.currentOperand === null && state.previousOperand === null) {
        return state;
      }
      if (state.currentOperand == null) {
        return {
          ...state,
          operation: payload.operation,
        };
      }
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case Actions.DELETE_DIGIT:
      if (state.overwrite) {
        return {
          ...state,
          overwrite: false,
          currentOperand: null,
        };
      }
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1) {
        return {
          ...state,
          currentOperand: null,
        };
      }
      return {
        ...state,
        currentOperand: state.currentOperand.slice(0, -1),
      };
    case Actions.CLEAR:
      return {};

    case Actions.EVALUATE:
      if (
        state.operation == null ||
        state.currentOperand == null ||
        state.previousOperand == null
      ) {
        return state;
      }
      return {
        ...state,
        overwrite: true,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
  }
}
function evaluate({ currentOperand, previousOperand, operation }) {
  const prev = parseFloat(previousOperand);
  const current = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(current)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + current;
      break;

    case "-":
      computation = prev - current;
      break;

    case "*":
      computation = prev * current;
      break;

    case "/":
      computation = prev / current;
      break;
  }
  return computation.toString();
}

const INT_FORMATTER = new Intl.NumberFormat("en-us", {
  maximunFractionDigits: 0,
});
function formatoperand(operand) {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INT_FORMATTER.format(integer);
  return `${INT_FORMATTER.format(integer)}.${decimal}`;
}
function App() {
  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    reducer,
    {}
  );
  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previous-operand">
          {formatoperand(previousOperand)} {operation}
        </div>
        <div className="current-operand">{formatoperand(currentOperand)}</div>
      </div>
      <button
        className="span-two"
        onClick={() => dispatch({ type: Actions.CLEAR })}
      >
        AC
      </button>
      <button onClick={() => dispatch({ type: Actions.DELETE_DIGIT })}>
        Del
      </button>
      <Operationbutton operation="/" dispatch={dispatch} />
      <Digitbutton digit="1" dispatch={dispatch} />
      <Digitbutton digit="2" dispatch={dispatch} />
      <Digitbutton digit="3" dispatch={dispatch} />
      <Operationbutton operation="*" dispatch={dispatch} />

      <Digitbutton digit="4" dispatch={dispatch} />
      <Digitbutton digit="5" dispatch={dispatch} />
      <Digitbutton digit="6" dispatch={dispatch} />
      <Operationbutton operation="+" dispatch={dispatch} />

      <Digitbutton digit="7" dispatch={dispatch} />
      <Digitbutton digit="8" dispatch={dispatch} />
      <Digitbutton digit="9" dispatch={dispatch} />
      <Operationbutton operation="-" dispatch={dispatch} />
      <Digitbutton digit="." dispatch={dispatch} />
      <Digitbutton digit="0" dispatch={dispatch} />
      <button
        style={{ borderRadius: "0 0 20px 0" }}
        className="span-two"
        onClick={() => dispatch({ type: Actions.EVALUATE })}
      >
        =
      </button>
    </div>
  );
}

export default App;
