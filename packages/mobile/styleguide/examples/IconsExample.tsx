import React, {Component, Fragment} from 'react'

import {styled, Icon} from '@qiwi/pijma-core'
import {IconName} from '@qiwi/pijma-media'

const IconWrapper = styled('span')({
  display: 'inline-block',
  width: 24,
  height: 24,
  margin: 8,
})

const iconNames: IconName[] = [
  'calendar',
  'clock',
  'cross',
  'download',
  'eye-closed',
  'eye-opened',
  'hamburger',
  'login',
  'logout',
  'percent',
  'question',
  'repeat',
  'search',
  'settings',
  'share',
  'star',
]

export default class IconsExample extends Component {

  public render() {
    return (
      <Fragment>
        {iconNames.map(name => (
          <IconWrapper key={name}>
            <Icon name={name}/>
          </IconWrapper>
        ))}
      </Fragment>
    )
  }

}