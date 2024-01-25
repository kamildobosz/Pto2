import React, { createContext, useContext, useState } from 'react'

const ClickContext = createContext()

export const useClickContext = () => useContext(ClickContext)

export const ClickProvider = ({ children }) => {
  const [searchClicked, setSearchClicked] = useState(false)

  return (
    <ClickContext.Provider value={{ searchClicked, setSearchClicked }}>
      {children}
    </ClickContext.Provider>
  )
}
