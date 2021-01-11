import React from "react"

const GridItem = ({className, handleClick, color, text, svg}) => {
  return (
    <li
      onClick={handleClick}
      style={{
        backgroundColor: "#757575",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        color: "#fff",
        padding: "1rem",
        textAlign: "center",
        background: color[0]
      }}
    >
      <div className={className}>
        <div dangerouslySetInnerHTML={{ __html: svg }} />
        <h2>{text}</h2>
      </div>
    </li>
  )
}

export default GridItem