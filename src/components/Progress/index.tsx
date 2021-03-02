import React, { useRef } from 'react';
import { Outer, Input, Submit } from './style';
import {curQueue, item, setCurQueue} from '../Queue'


const Progress = () => {
  let inputRef: HTMLInputElement;

  const getInfo = () => {
    // fetch(`http://localhost:8080/info`, {
    fetch(`https://api.web-dl.live/info`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ url: inputRef.value })
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

  return (
    <Outer>
      <Input type='text' ref={ref => {if(ref) inputRef = ref}}/>
      <Submit onClick={getInfo}>Add to queue</Submit>
    </Outer>
  );
};

export default Progress;
