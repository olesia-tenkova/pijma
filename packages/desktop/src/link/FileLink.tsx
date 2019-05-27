import React, {FC} from 'react'

import {LinkControl, Lnk, FlexItem, Flex, IconWrapper, Box} from '@qiwi/pijma-core'
import {Icon} from '@qiwi/pijma-media'
import {Text} from '../typography'

export interface FileLinkProps {
  onClick?: (
    href?: string,
    target?: string,
    download?: string | boolean,
    rel?: string,
  ) => void
  onFocus?: () => void
  onBlur?: () => void
  tabIndex?: number
  href?: string
  target?: string
  download?: string | boolean
  rel?: string
  title?: string
  color?: 'default' | 'support'
}

const LinkColor: {[color in NonNullable<FileLinkProps['color']>]: string} = {
  default: '#000',
  support: '#666',
}

const FlexLink = Flex.withComponent(Lnk)

export const FileLink: FC<FileLinkProps> = (props) => (
  <LinkControl
    onClick={props.onClick}
    onFocus={props.onFocus}
    onBlur={props.onBlur}
    href={props.href}
    target={props.target}
    download={props.download}
    rel={props.rel}
    children={renderProps => (
      <FlexLink
        tabIndex={props.tabIndex}
        href={props.href}
        target={props.target}
        download={props.download}
        rel={props.rel}
        title={props.title}
        display="flex"
        onFocus={renderProps.onFocus}
        onBlur={renderProps.onBlur}
      >
        <FlexItem
          cursor="pointer"
          display="inline-block"
          width={6}
          height={6}
          mr={2}
          shrink={0}
          onClick={renderProps.onClick}
          onMouseEnter={renderProps.onMouseEnter}
          onMouseLeave={renderProps.onMouseLeave}
          onMouseUp={renderProps.onMouseUp}
          onMouseDown={renderProps.onMouseDown}
        >
          <IconWrapper
            color={
              renderProps.hover || renderProps.focus
                ? '#FF8C00'
                : props.color === undefined
                ? LinkColor.default
                : LinkColor[props.color]
            }
          >
            <Icon name="file" />
          </IconWrapper>
        </FlexItem>
        <Box
          cursor="pointer"
          onClick={renderProps.onClick}
          onMouseEnter={renderProps.onMouseEnter}
          onMouseLeave={renderProps.onMouseLeave}
          onMouseUp={renderProps.onMouseUp}
          onMouseDown={renderProps.onMouseDown}
        >
          <Text
            color={renderProps.hover || renderProps.focus ? 'warning' : props.color || 'default'}
            decoration="none"
            size="m"
            children={props.children}
          />
        </Box>
      </FlexLink>
    )}
  />
)
