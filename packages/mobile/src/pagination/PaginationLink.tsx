import React, {FC} from 'react'

import {LinkControl, Lnk, Card, Value, RenderChild, Box} from '@qiwi/pijma-core'

export interface PaginationLinkProps {
  pageNumber: number
  disabled?: boolean
  height?: Value
  width?: Value
  boxWidth?: Value
  boxHeight?: Value
  s?: string
  onClick?: (index: number) => void
  children: RenderChild<{
    disabled: boolean
    hover: boolean
    focus: boolean
  }>
}

const CardLink = Card.withComponent(Lnk)

export const PaginationLink: FC<PaginationLinkProps> = props => (
  <LinkControl
    onClick={() =>
      !props.disabled && props.onClick && props.onClick(props.pageNumber)
    }
    children={renderProps => (
      <CardLink
        transition="all 100ms cubic-bezier(0.4, 0.0, 0.2, 1)"
        height={props.height}
        width={props.width}
        display="inline-flex"
        cursor={props.disabled ? 'default' : 'pointer'}
        bg={
          (renderProps.hover || renderProps.focus) && !props.disabled
            ? '#f5f5f5'
            : undefined
        }
        s={props.s}
        onClick={renderProps.onClick}
        onFocus={renderProps.onFocus}
        onBlur={renderProps.onBlur}
        onMouseEnter={renderProps.onMouseEnter}
        onMouseLeave={renderProps.onMouseLeave}
        onMouseUp={renderProps.onMouseUp}
        onMouseDown={renderProps.onMouseDown}
      >
        <Box
          m="auto"
          width={props.boxWidth}
          height={props.boxHeight}
          children={props.children({
            disabled: props.disabled || false,
            hover: renderProps.hover,
            focus: renderProps.focus,
          })}
        />
      </CardLink>
    )}
  />
)
