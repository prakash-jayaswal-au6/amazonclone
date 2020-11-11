import React, { createContext, useContext, useReducer } from 'react';

//prepate the data layer
export const StateContext = createContext();

//wrap our app and provide the data layer  to every componentes
export const StateProvider = ({ reducer, initialState, children }) => (
    <StateContext.Provider value={useReducer(reducer, initialState)}>
        {children}
    </StateContext.Provider>
)

//pull information from data layer
export const useStateValue = () => useContext(StateContext);