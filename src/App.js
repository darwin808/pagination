import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [name, setname] = useState("");
  const [title, settitle] = useState("");
  const [last, setlast] = useState("");
  const [picture, setpicture] = useState("");
  const [collect, setcollect] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [postperpage] = useState(5);

  useEffect(() => {
    fetchuse();
  }, []);

  const fetchuse = () => {
    axios.get("https://randomuser.me/api/").then((e) => {
      console.log(e.data.results[0].picture.medium);
      setname(e.data.results[0].name.first);
      settitle(e.data.results[0].name.title);
      setlast(e.data.results[0].name.last);
      setpicture(e.data.results[0].picture.medium);
    });
  };
  const adduser = () => {
    fetchuse();
    setcollect([{ name, last, title, id: Math.random(), picture }, ...collect]);
  };

  ///////// display #of person per page

  const indexoflast = currentpage * postperpage;
  const indexoffirst = indexoflast - postperpage;
  const currentposts = collect.slice(indexoffirst, indexoflast);

  ////////////// display pagination #of pages
  const pagenum = [];
  for (let i = 1; i <= Math.ceil(collect.length / postperpage); i++) {
    pagenum.push(i);
  }

  const renderpagenum = pagenum.map((e) => (
    <div
      className="page"
      key={e}
      onClick={() => {
        handleclick(e);
      }}>
      {e}
    </div>
  ));
  ///////// goto specific page
  const handleclick = (e) => {
    setcurrentpage(e);
  };

  return (
    <div className="App">
      <h1>Hello{pagenum}</h1> <button onClick={adduser}>aDD</button>
      {currentposts.map((e) => (
        <div key={e.id}>
          <img src={e.picture} alt="" /> {e.title} {e.name} {e.last}
        </div>
      ))}
      {renderpagenum}
    </div>
  );
}

export default App;
