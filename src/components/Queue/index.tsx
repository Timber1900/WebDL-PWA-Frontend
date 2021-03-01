import React, { useEffect, useState } from 'react'
import {Container, QueueDiv, QueueButtonsDiv,ItemContainer} from './style'
import streamSaver from 'streamsaver'

export let curQueue: Array<item>;
export let setCurQueue: React.Dispatch<React.SetStateAction<item[]>>;

export interface item {
  Thumbnail: string,
  Title: string,
  Info: any,
  Format: any
}

const Item = (props: item) => {
  return(
    <ItemContainer>
      <img src={props.Thumbnail} alt='404'/>
      <label>{props.Title}</label>
    </ItemContainer>
  )
}

const Queue = () => {
  const emptyQueue: Array<item> = [];
  const [items, setItems] = useState(emptyQueue);

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

  return(
  <Container>
    <QueueDiv>
      {items.map((val, i) => {
        return <Item Thumbnail={val.Thumbnail} Title={val.Title} Info={val.Info} Format={val.Format} key={i}/>
      })}
    </QueueDiv>
    <QueueButtonsDiv>
      <button onClick={download}>Download Videos</button>
    </QueueButtonsDiv>
  </Container>
  )
}



export default Queue
