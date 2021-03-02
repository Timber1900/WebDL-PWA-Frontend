import React, { FC, useEffect, useState } from 'react';
import { Outer, QueueContainer, ButtonsContainer, NavSpan, NavLabel, NavDiv } from './style';
import Item from './Item';
import streamSaver from 'streamsaver'
// import { changeSearch, searchIsUp } from '../Search/index';

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
    setCurQueue = setItems;
  }, [])

  const download = async () => {
    let curItems = [...items];
    for(const curItem of items){
      // eslint-disable-next-line no-loop-func
      await new Promise((res, rej) => {
        // fetch(`http://localhost:8080/video`, {
        fetch(`https://api.web-dl.live/video`, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ url: curItem.Info.webpage_url, info: curItem.Info })
        })
        .then(res => {
          console.log(curItem)
          if(res.body){
            const fileStream = streamSaver.createWriteStream(`${curItem.Title}.mkv`, {
              size: parseInt(curItem.Format.filesize),
              writableStrategy: undefined,
              readableStrategy: undefined
            })
            res.body.pipeTo(fileStream)
            .then(console.log, console.error)
          }
        })
        .catch(rej)
        .finally(() => {
          curItems = curItems.filter((val, i) => val !== curItem)
          setItems(curItems);
          res("Done")
        });
      })
      .then(console.log)
      .catch(console.error)
    }
  }

  // const downloadQueue = () => {
  //   updateQueue(outQueue);

  //   let skipped = 0;
  //   const callback = () => {
  //     const removedQueue = [...outQueue];
  //     removedQueue.splice(skipped, 1);
  //     setQueue(removedQueue);
  //     let tryAgain = true;
  //     while (tryAgain) {
  //       if (removedQueue.length > skipped) {
  //         const vid = removedQueue[skipped];
  //         if (vid.download) tryAgain = false;
  //         if (tryAgain) skipped++;
  //       } else {
  //         tryAgain = false;
  //       }
  //     }

  //     if (removedQueue.length > skipped) {
  //       const vid = removedQueue[skipped];
  //       const format = vid.quality.get(vid.curQual);
  //       if (Math.sign(parseInt(vid.ext)) === -1) {
  //         let ext: string = vid.ext === '-3' ? 'mkv' : vid.ext === '-2' ? 'mp4' : 'webm';
  //         downloadVideo(vid.id, callback, vid.title, vid.merge, format, ext, vid.clips, vid.duration);
  //       } else {
  //         let ext: string = vid.ext === '1' ? 'mp3' : 'm4a';
  //         downloadAudio(vid.id, callback, vid.title, ext, vid.clips, vid.duration);
  //       }
  //     } else {
  //       setDisable(false);
  //     }
  //   };

  //   let tryAgain = true;
  //   while (tryAgain) {
  //     if (outQueue.length > skipped) {
  //       const vid = outQueue[skipped];
  //       if (vid.download) tryAgain = false;
  //       if (tryAgain) skipped++;
  //     } else {
  //       tryAgain = false;
  //     }
  //   }
  //   if (outQueue.length > skipped) {
  //     const vid = outQueue[skipped];
  //     const format = vid.quality.get(vid.curQual);
  //     setDisable(true);
  //     if (Math.sign(parseInt(vid.ext)) === -1) {
  //       let ext: string = vid.ext === '-3' ? 'mkv' : vid.ext === '-2' ? 'mp4' : 'webm';
  //       downloadVideo(vid.id, callback, vid.title, vid.merge, format, ext, vid.clips, vid.duration);
  //     } else {
  //       let ext: string = vid.ext === '1' ? 'mp3' : 'm4a';
  //       downloadAudio(vid.id, callback, vid.title, ext, vid.clips, vid.duration);
  //     }
  //   }
  // };

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
          Download Videos
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
