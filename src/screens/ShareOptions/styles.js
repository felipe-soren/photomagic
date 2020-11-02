import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .main-options,
  .share-options {
    display: flex;
    justify-content: space-between;
    width: 200px;
  }

  .share-options {
    margin-top: 100px;
  }
`;
