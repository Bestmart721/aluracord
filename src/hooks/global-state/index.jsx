import React, { useState, useContext, createContext } from "react";

const initialState = {
  user: null,
};

function globalState() {
  const Context = createContext();

  const Provider = function ContextProvider(props) {
    const [state, setState] = useState(initialState);

    const ctxValue = [state, (newState) => setState(newState)];

    return (
      <Context.Provider value={ctxValue}>{props.children}</Context.Provider>
    );
  };

  return [() => useContext(Context), Provider];
}

const [useGlobaState, Provider] = globalState(initialState);

const GlobaStateProvider = Provider;

export { useGlobaState };
export default GlobaStateProvider;
