import React, { useEffect } from 'react';
import Layout from './components/Layout'
import GlobalStyles from './styles/global';
import {curQueue, setCurQueue, item} from './components/Queue';


function App() {
  useEffect(() => {
    const url = new URL(window.location.href).searchParams.get('text');
    if(url) {
      // fetch(`http://localhost:8080/info`, {
      fetch(`https://api.web-dl.live/info`, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url })
      })
      .then(res => res.json())
      .then(res => {
        const newQueue = [...curQueue]
        const parsedData = res;
        for(const item of parsedData){
          const { info } = item;
          let bestFormat = {quality: -1};

          for(const format of info.formats) {
            if(format.quality > bestFormat.quality){
              bestFormat = format;
            }
          }

          console.log(info)
          const newItem: item = {
            Info: info,
            Thumbnail: info.thumbnail,
            Title: info.title,
            Format: bestFormat
          };
          newQueue.push(newItem)
        }
        setCurQueue(newQueue);
      })
    }
  }, [])

  return (
    <>
      <Layout />
      <GlobalStyles />
    </>
  );
}

export default App;
