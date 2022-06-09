import styled from "styled-components";

const QuantityWrapper = styled.div`
  user-select: none;
  box-sizing: border-box;
  padding: 5px 0;
  box-shadow: rgb(0 0 0 / 15%) 0px 2px 4px;
  border: 1px solid rgb(64, 170, 96);
  border-radius: 5px;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  
  span {
    display: inline-block;
    width: 70px;
    text-align: center;
  }
  
  button {
    border: none;
    color: #02296d;
    font-size: 25px;
    cursor: pointer;
    background-color: transparent;
  }
`

export default QuantityWrapper
