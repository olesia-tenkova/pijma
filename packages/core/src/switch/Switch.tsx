import React, {FunctionComponent} from 'react'

import {Svg, Rect} from '../primitive'

export interface SwitchProps {
  disabled?: boolean
  focused?: boolean
  checked?: boolean
}

export const Switch: FunctionComponent<SwitchProps> = props => (
  <Svg viewBox="0 0 40 20" width="40" height="20">
    <defs>
        <filter x="-45.8%" y="-29.2%" width="191.7%" height="191.7%" filterUnits="objectBoundingBox" id="filter-2">
            <feOffset dx="0" dy="2" in="SourceAlpha" result="shadowOffsetOuter1"/>
            <feGaussianBlur stdDeviation="1.5" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
            <feColorMatrix values="0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.25 0" type="matrix" in="shadowBlurOuter1" />
        </filter>
    </defs>

    <Rect
      width="40"
      height="20"
      x="0"
      y="0"
      rx="10"
      fill={
        props.checked ? (props.disabled ? '#e6e6e6' : '#ff8c00') : '#e6e6e6'
      }
      transition="all 100ms cubic-bezier(0.4, 0.0, 0.2, 1)"
    />

    <Rect
      width="12"
      height="12"
      x={props.checked ? '24' : '4'}
      y="4"
      rx="6"
      filter="url(#filter-2)"
      fillOpacity={props.disabled
        ? '0'
        : '1'}
    />
    <Rect
      width="12"
      height="12"
      x={props.checked ? '24' : '4'}
      y="4"
      rx="6"
      fill={
        props.checked
          ? props.disabled
            ? '#ccc'
            : '#fff'
          : props.disabled
          ? '#ccc'
          : '#fff'
      }
      transition="all 100ms cubic-bezier(0.4, 0.0, 0.2, 1)"
    />
  </Svg>
)
