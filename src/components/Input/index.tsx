import React from 'react';
import { Outer, Input, Submit } from './style';
import {curQueue, item, setCurQueue} from '../Queue'
import axios from 'axios';
import { INFO_URL } from '../../Constants';

const Progress = () => {
  let inputRef: HTMLInputElement;

  const getInfo = async () => {
    const infoResponse = await axios.post(INFO_URL, { url: inputRef.value }, {onDownloadProgress: prg => {console.log(`%c ${prg.loaded} bits of data loaded`, 'color: #4488FF')}, responseType: 'json'})
    console.log(infoResponse)
    const newQueue = [...curQueue]
    const parsedData = infoResponse.data;
    for(const info of parsedData){
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
  }

  return (
    <Outer>
      <Input type='text' ref={ref => {if(ref) inputRef = ref}}/>
      <Submit onClick={getInfo}>Add to queue</Submit>
    </Outer>
  );
};

export default Progress;
