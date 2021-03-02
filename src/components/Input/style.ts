import styled from 'styled-components';

export const Outer = styled.div`
  display: flex;
  flex-direction: row;
  width: 90vw;
  align-items: center;
  justify-content: space-between;
  min-height: 50px;
  padding: 10px 5vw 0 5vw;
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: row;
  width: 90vw;
  align-items: center;
  justify-content: space-between;
`;

export const Input = styled.input`
  margin: 0.5vh 0.5vw;
  flex: 1;
  border: 2px solid var(--almost-black);
  background-color: var(--black);
  color: var(--white);
  border-radius: 5px;
  height: 1.5rem;
`;

export const Submit = styled.button`
  margin: 0.5vh 0.5vw;
  height: 1.5rem;
`;
