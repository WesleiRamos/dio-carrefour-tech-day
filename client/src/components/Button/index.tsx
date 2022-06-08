import ButtonWrapper from './styles'

type ButtonProps = {
  children?: React.ReactNode,
  className?: string,
  onClick?: () => void
}

const Button = (props: ButtonProps) => (
  <ButtonWrapper className={props.className || ''} onClick={props.onClick || (() => {})}>
    {props.children}
  </ButtonWrapper>
)

export default Button

