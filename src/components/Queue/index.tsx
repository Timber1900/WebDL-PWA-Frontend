import React, { FC, useEffect, useState } from 'react';
import { Outer, QueueContainer, ButtonsContainer, NavSpan, NavLabel, NavDiv } from './style';
import Item from './Item';
import streamSaver from 'streamsaver'
// import { changeSearch, searchIsUp } from '../Search/index';
import axios from 'axios';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { AUDIO_URL, VIDEO_URL } from '../../Constants';

export let curQueue: Array<item>;
export let setCurQueue: React.Dispatch<React.SetStateAction<item[]>>;

export interface item {
  Thumbnail: string,
  Title: string,
  Info: any,
  Format: any
}

export let outExt: string;

const Queue: FC = () => {
  const emptyQueue: Array<item> = [];
  const [items, setItems] = useState(emptyQueue);
  const [ext, setExt] = useState('-3');

  useEffect(() => {
    outExt = ext;
  }, [ext]);

  useEffect(() => {
    curQueue = items;
  }, [items])

  useEffect(() => {
    setCurQueue = (val) => {
      const storage = window.localStorage;
      storage.setItem('queue', JSON.stringify(val))
      setItems(val)
    };
  }, [])

  const download = async () => {
    let curItems = [...items];
    for(let i = 0; i < items.length; i++){
      const func = function (this: item[], res: (value: unknown) => void, rej: (reason?: any) => void) {
        const curItem = items[i]
        const dataArray = [];

        dataArray.push(axios.post<Blob>(VIDEO_URL, {url: curItem.Info.webpage_url}, {onDownloadProgress: prg => {console.log(`%c ${prg.loaded} bits of data loaded`, 'color: #4488FF')}, responseType: "blob"}))
        dataArray.push(axios.post<Blob>(AUDIO_URL, {url: curItem.Info.webpage_url}, {onDownloadProgress: prg => {console.log(`%c ${prg.loaded} bits of data loaded`, 'color: #4488FF')}, responseType: "blob"}))

        Promise.all(dataArray)
        .then(async (res) => {
          const [audioData, videoData] = res.sort((a, b) => a.data.size - b.data.size);
          const ffmpeg = createFFmpeg({ progress: console.log });
          await ffmpeg.load();
          ffmpeg.FS('writeFile', 'audio.m4a', await fetchFile(audioData.data));
          ffmpeg.FS('writeFile', 'video.mkv', await fetchFile(videoData.data));
          await ffmpeg.run('-i', 'audio.m4a', '-i', 'video.mkv','-map', '0:a','-map', '1:v', '-c:v', 'copy', 'out.mkv');
          const out = ffmpeg.FS('readFile', 'out.mkv');
          const fileStream = streamSaver.createWriteStream(`${curItem.Title}.mkv`, {
            size: audioData.data.size + videoData.data.size,
            writableStrategy: undefined,
            readableStrategy: undefined
          })
          const writer = fileStream.getWriter();
          writer.write(out);
          writer.close();
        })
        .catch(rej)
        .finally(() => {
          setItems(this.filter((val: any, i: any) => val !== curItem));
          res("Done")
        });
      }
      await new Promise(func.bind(curItems))
      }

  }
  const downloadAudio = async () => {
    let curItems = [...items];
    for(const curItem of items){
      const down = async function (this: item[], res: (value: unknown) => void, rej: (reason?: any) => void) {
        const audioBlob = await axios.post<Blob>(AUDIO_URL, {url: curItem.Info.webpage_url}, {onDownloadProgress: prg => {console.log(`%c ${prg.loaded} bits of data loaded`, 'color: #4488FF')}, responseType: "blob"})
        const buffer = await audioBlob.data.arrayBuffer();
        const view = new Uint8Array(buffer);

        const fileStream = streamSaver.createWriteStream(`${curItem.Title}.m4a`, {
          size: audioBlob.data.size,
          writableStrategy: undefined,
          readableStrategy: undefined
        })
        const writer = fileStream.getWriter();
        writer.write(view);
        writer.close();
        setItems(this.filter((val: any, i: any) => val !== curItem));
        res("Done")
      }
      await new Promise(down.bind(curItems));
    }
  }
  // const search = () => {
  //   changeSearch(!searchIsUp);
  // };

  return (
    <Outer>
      <QueueContainer>
        {items.map((val, i) => (
          <Item
            Format={val.Format}
            Info={val.Info}
            Thumbnail={val.Thumbnail}
            Title={val.Title}
            key={i}
          />
        ))}
      </QueueContainer>
      <ButtonsContainer>
        <button onClick={download} /*disabled={disable}*/>
          Download Video
        </button>
        <button onClick={downloadAudio} /*disabled={disable}*/>
          Download Audio
        </button>
        <button onClick={() => {setCurQueue([])}}>
          Clear Queue
        </button>
        <NavDiv>
          <NavSpan>
            <NavLabel>Filetype:</NavLabel>
            <select defaultValue={ext} onChange={(e) => setExt(e.target.value)}>
              <optgroup label="Video">
                <option value={-3}>mkv</option>
                <option value={-2}>mp4</option>
                <option value={-1} disabled={true}>
                  webm
                </option>
              </optgroup>
              <optgroup label="Audio">
                <option value={1} disabled={true}>
                  mp3
                </option>
                <option value={2}>m4a</option>
              </optgroup>
            </select>
          </NavSpan>
        </NavDiv>
        {/* <button onClick={() => setQueue([])} disabled={disable}> */}
          {/* Clear queue */}
        {/* </button> */}
        {/* <button onClick={inputUrl}>Input url</button> */}
        {/* <button onClick={search}>Search Youtube</button> */}
        {/* <button onClick={() => addToQueue('PLKYU22RTU_BNQ-yXwT8rF94zBLGLy5iT-')}>Test</button> */}
      </ButtonsContainer>
    </Outer>
  );
};

export default Queue;
