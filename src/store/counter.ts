import { Action } from "@reduxjs/toolkit";

interface Counter {
  value: number;
}

export function counterReducer(state: Counter = { value: 0 }, action: Action) {
  switch (action.type) {
    default:
      return state;
  }
}
