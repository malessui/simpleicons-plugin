import React, { useEffect, useState } from 'react'
import ReactDOM from 'react-dom'
import Grid from "./components/grid"
import GridItem from "./components/grid-item"
import './ui.css'

const App = () => {
  const [data, setData] = useState([])
  const [searchText, setSearchText] = useState(null)
  const [loading, setLoading] = useState(false)
  const [dataSearch, setDataSearch] = useState({})

  useEffect(() => {
    const loadWeb = async () => {
      setLoading(true)
      const url = "https://simpleicons.org/";
      const response = await fetch(url);

      const htmlString = await response.text(); // get response text
      var parser = new DOMParser();
      var htmlDoc = parser.parseFromString(htmlString, "text/html");
      const listItem = htmlDoc.getElementsByClassName(
        "grid-item grid-item--light"
      );
      setLoading(false)
      setData([...listItem]);
    };

    loadWeb();
  }, [])

  useEffect(() => {
    setLoading(true)
    data.filter((item) => {
      const text = item.querySelector("h2").innerText;
      if (text.toLowerCase().includes(searchText)) {
        setLoading(false)
        setDataSearch({[text]: item, ...dataSearch})
      }
    })
  }, [searchText])

  const handleClick = e => {
    const svgEl = e.currentTarget.querySelector("svg")
    const svg = svgEl.outerHTML
    parent.postMessage({ pluginMessage: { type: 'insert-svg', svg} }, '*')
  }

  const handleChange = e => {
    setSearchText(e.target.value)
  }

  const searchingSVG = () => {
    return Object.keys(dataSearch).map((key, index) => {
      const className = dataSearch[key].getAttribute("class");
      const color = dataSearch[key]
        .getAttribute("style")
        .match(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi);
      const text = dataSearch[key].querySelector("h2").innerText;
      const svg = dataSearch[key].querySelector("svg").outerHTML;
      return (
        <GridItem
          key={index}
          handleClick={handleClick}
          color={color}
          className={className}
          text={text}
          svg={svg}
        />
      )
    })
  }

  return (
    <div className="simpleicons">
      <div className="search-wrapper">
        <input type="text" placeholder="Search" value={searchText} onChange={handleChange}/>
      </div>
      {
        searchText ? (
          <Grid>
            {
              searchingSVG()
            }
          </Grid>
        ) : null
      }
      {
        loading ? (
          <div className="spinner">
            <div className="lds-ripple"><div></div><div></div></div>
          </div>
        ) : null
      }
      {
        data.length && !searchText ? (
          <Grid>
            {data.map((item, index) => {
              const className = item.getAttribute("class");
              const color = item
                .getAttribute("style")
                .match(/#[0-9a-f]{6}|#[0-9a-f]{3}/gi);
              const text = item.querySelector("h2").innerText;
              const svg = item.querySelector("svg").outerHTML;
              return (
                <GridItem
                  key={index}
                  handleClick={handleClick}
                  color={color}
                  className={className}
                  text={text}
                  svg={svg}
                />
              );
            })}
          </Grid>
        ) : null
      }
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('app'))