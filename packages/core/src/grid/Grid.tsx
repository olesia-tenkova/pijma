import React, {FC, Children, ReactNode, ReactChildren} from 'react'
import {Flex, FlexItem} from '../primitive'

export interface GridProps {
  gutter?: number
  columns?: number
  layout?: number | number[]
  children?: ReactChildren
}

const arrSum = (arr: number[]) => arr.reduce((a: number, b: number) => a + b, 0)

export const Grid: FC<GridProps> = ({gutter = 20, columns = 12, layout = columns, children}) => {

  const elements: ReactNode[] = Children.toArray(children)
  const layoutArr: number[] = Array.isArray(layout) ? layout : [layout]
  const layoutSum: number = arrSum(layoutArr)

  const isValidLayout: boolean = columns % layoutSum === 0
  if (elements.length === 0 || !isValidLayout) {
    return null
  }

  const layoutLength: number = layoutArr.length
  const gutterInRowCount: number = columns - 1
  const rowBlocksCount: number = layoutLength > 1
    ? columns / layoutSum * layoutLength
    : columns / layoutSum

  return (
    <Flex wrap="wrap">
      {Children.map(elements, (child: ReactNode, index: number) => {
        const blockLayout: number = layoutArr[index % layoutLength]

        const oneColumnWidth: number = 100 * blockLayout / columns
        const oneColumnGutter: number = gutterInRowCount * gutter * blockLayout / columns
        console.log(oneColumnGutter)
        const gutterIncludesInColumn: number = (blockLayout - 1) * gutter
        const columnWidth: string = `calc(${oneColumnWidth}% - ${oneColumnGutter}px + ${gutterIncludesInColumn}px)`

        return (
          <FlexItem
            key={index}
            width={columnWidth}
            mt={index >= rowBlocksCount ? `${gutter}px` : 0}
            ml={index % rowBlocksCount !== 0 ? `${gutter}px` : 0}
            children={child}
          />
        )
      })}
    </Flex>
  )
}

Grid.defaultProps = {
  gutter: 20,
  columns: 12,
}
