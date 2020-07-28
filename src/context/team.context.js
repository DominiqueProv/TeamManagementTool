import React, { createContext, useReducer } from 'react';
import teamReducer from '../reducer/team.reducer';
export const TeamContext = createContext();
export const DispatchContext = createContext();

export function TeamProvider({ children }) {
  const [team, dispatch] = useReducer(teamReducer, []);

  return (
    <TeamContext.Provider value={team}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TeamContext.Provider>
  );
}
