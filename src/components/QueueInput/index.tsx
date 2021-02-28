import React from 'react'
import {Input, Submit, Container} from './style'
import {curQueue, setCurQueue, item} from '../Queue'
const QueueInput = (): JSX.Element => {
  let inputRef: HTMLInputElement;

  const getInfo = () => {
    fetch(`https://api.web-dl.live/info`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({url: inputRef.value})
    })
    .then(res => res.json())
    .then(res => {
      const newQueue = [...curQueue]

      for(const item of res){
        const info: ytdl.videoInfo = item.info;
        const newItem: item = {
          Info: info,
          Thumbnail: info.videoDetails.thumbnails[0].url,
          Title: info.videoDetails.title,
          Formats: item.formats
        };
        newQueue.push(newItem)
      }

      setCurQueue(newQueue);
    })
  }

  return(
  <Container>
    <Input type='text' ref={ref => {if(ref) inputRef = ref}}/>
    <Submit onClick={getInfo}>Add to queue</Submit>
  </Container>)
}


export default QueueInput
