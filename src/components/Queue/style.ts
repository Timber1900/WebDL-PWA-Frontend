import styled from 'styled-components'

export const Container = styled.div`
  height: 90vh;
  width: 98vw;
  margin: 1vh 1vw;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const QueueDiv = styled.div`
  flex: 2;
  height: 100%;
  width: auto;
  margin: 1vh 1vw;
  display: flex;
  overflow-y: scroll;
  overflow-x: hidden;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const QueueButtonsDiv = styled.div`
  flex: 1;
  height: 100%;
  width: auto;
  margin: 1vh 1vw;
`;

export const ItemContainer = styled.div`
  height: 100px;
  width: 100%;

  img {
    height: 100%;
    border-radius: 2px;
  }
`;

