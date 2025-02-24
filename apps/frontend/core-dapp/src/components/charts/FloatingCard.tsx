import { ReactElement, ReactNode, RefObject, forwardRef } from 'react'
import styled, { Color, CSSProperties } from 'styled-components'
import { coreDappTheme, spacingIncrement } from 'prepo-ui'
import { FormatPrice, FormatTime, DetailsProps } from './chart-types'
import { formatChartTooltipTime } from './utils'
import { numberFormatter } from '../../utils/numberFormatter'

const { toUsd } = numberFormatter

const { Z_INDEX } = coreDappTheme

type Props = {
  label?: ReactNode | string
  style?: CSSProperties
  value?: ReactNode | string
  options: {
    valueColor: keyof Color
  }
}

const Label = styled.p`
  color: ${({ theme }): string => theme.color.neutral4};
  font-size: ${({ theme }): string => theme.fontSize.xs};
  font-weight: ${({ theme }): number => theme.fontWeight.medium};
  margin: 0;
`
const Value = styled.p<{ color: keyof Color }>`
  color: ${({ color, theme }): string => theme.color[color]};
  font-size: ${({ theme }): string => theme.fontSize.sm};
  font-weight: ${({ theme }): number => theme.fontWeight.semiBold};
  margin: 0;
`
const Wrapper = styled.div`
  background-color: ${({ theme }): string => theme.color.marketChartFloatingCard};
  border: 1px solid ${({ theme }): string => theme.color.primaryAccent};
  border-radius: ${({ theme }): string => theme.borderRadius.xs};
  box-shadow: ${({ theme }): string => theme.shadow.prepo};
  padding: ${spacingIncrement(4)} ${spacingIncrement(8)};
  text-align: center;
  width: max-content;
  z-index: ${Z_INDEX.floatingBox};
`

export const FloatingCard = forwardRef<HTMLDivElement, Props>(
  ({ label, options, style, value }, ref) => (
    <Wrapper ref={ref} style={style}>
      <Label>{label}</Label>
      <Value color={options.valueColor}>{value}</Value>
    </Wrapper>
  )
)

export const renderFloatingCardWithChartDetails = (
  ref: RefObject<HTMLDivElement>,
  details?: DetailsProps,
  formatPrice: FormatPrice = toUsd,
  formatTime: FormatTime = formatChartTooltipTime,
  valueColor: keyof Color = 'success'
): ReactElement | null => {
  if (!details) return null

  const label = formatTime(details.time, details.timeframe)
  const price = formatPrice(details.price)

  return (
    <FloatingCard
      style={{ position: 'absolute', ...details.position }}
      ref={ref}
      label={label}
      value={price}
      options={{ valueColor }}
    />
  )
}

FloatingCard.displayName = 'Floating Card'
