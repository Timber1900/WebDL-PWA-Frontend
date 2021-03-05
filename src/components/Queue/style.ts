import styled from 'styled-components';

export const Outer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 90vw;
  height: calc(100vh - (110px + 4vh));
  padding: 2vh 5vw;
  z-index: 10;

  @media only screen and (max-width: 660px) {
    flex-direction: column;
  }
`;

export const QueueContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 58vw;
  margin: 1vh 1vw 1vh 0;
  border-radius: 5px;
  border: 2px solid var(--almost-black);
  overflow-y: scroll;

  @media only screen and (max-width: 660px) {
    margin: 1vh 1vw;
    height: 100%;
    width: 88vw;
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
    background-color: var(--black);
  }

  &::-webkit-scrollbar {
    background-color: #181a1b;
    width: 8px;
    margin: 0 auto;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #555;
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  width: 28vw;
  padding: 1vh 1vw 1vh 1vw;

  @media only screen and (max-width: 660px) {
    width: 88vw;
    height: fit-content;
  }

  > button {
    height: 8vh;
    min-height: 40px;

    &:disabled {
      background-color: var(--almost-black);
    }
  }
`;

export const NavDiv = styled.div`
  padding: 1vh 0;
`;

export const NavLabel = styled.label`
  display: block;
`;

export const NavSpan = styled.span`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: max(28vw, 90px);
`;
