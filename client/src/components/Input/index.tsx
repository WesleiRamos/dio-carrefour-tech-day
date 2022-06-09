import InputWrapper, * as Style from './styles'

type InputProps = {
  text?: string,
  className?: string,
  placeholder?: string,
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void,
  onClick?: (e: React.MouseEvent<HTMLInputElement, MouseEvent>) => void
}

const DEFAULT_CALLBACK = () => {}

const Input = (props: InputProps) => {
  return (
    <InputWrapper className={props.className || ''}>
      <input
        type='text'
        placeholder={props.placeholder || ''}
        onChange={props.onChange || DEFAULT_CALLBACK}
      />
      
      <Style.Button onClick={props.onClick || DEFAULT_CALLBACK}>
        { props.text || <i className='gg-search' /> }
      </Style.Button>
    </InputWrapper>
  )
}

export default Input
