import styled from 'styled-components'

const InputWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  border-radius: 5px;
  background-color: white;
  border: 1px solid #205BC6;
  transition: .3s;
  display: flex;

  &:focus-within {
    box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.2);
  }

  input {
    flex: 1;
    border: none;
    padding: 10px;
    outline: none;
  }
`

export const Button = styled.div`
  min-width: 40px;
  height: 35px;
  display: flex;
  color: white;
  padding: 0 5px;
  align-items: center;
  justify-content: center;
  background-color: #205BC6;
`

export default InputWrapper
