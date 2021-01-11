import React from "react"

const Grid = ({children}) => {
  return (
    <ul
      style={{
        padding: 0,
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(6rem, 1fr))",
        gridAutoRows: "min-content",
        gridGap: "0.375rem",
        gridAutoFlow: "dense",
        listStyle: "none"
      }}
      className="lists"
    >
      {children}
    </ul>
  )
}

export default Grid