import QuantityWrapper from './styles'

type QuantityProps = {
  value: number,
  className?: string,
  onChange: (quantity: number) => void
}

const Quantity = (props: QuantityProps) => {
  return (
    <QuantityWrapper className={props.className || ''}>
      <button onClick={() => props.onChange(Math.max(props.value - 1, 0))}>
        -
      </button>
      <span>
        {props.value}
      </span>
      <button onClick={() => props.onChange(Math.max(props.value + 1, 0))}>
        +
      </button>
    </QuantityWrapper>
  )
}

export default Quantity

