import React, {FC} from 'react'
import {Pos, Box, Card, CardProps, Grid, Flex, Icon, Typo, CalendarControl, CalendarConstructor, CalendarControlChildrenProps} from '@qiwi/pijma-core'
import {BlockContent, MenuLink} from '../'

const defaultDays = ['ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ', 'ВС']
const defaultMonths = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь']
const defaultFirstDayIndex = 1

export interface CalendarProps {
  activeDate?: Date
  activeDateTo?: Date
  days?: string[]
  months?: string[]
  firstDayIndex?: number
  saveDate?: (date: Date) => void
}

const getNextDay = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1)

const getDates = (startDate: Date, stopDate: Date) => {
  const dateArray = []
  let currentDate = startDate
  while (currentDate <= stopDate) {
    dateArray.push(new Date(currentDate).toDateString())
    currentDate = getNextDay(currentDate)
  }
  return dateArray
}

export const Calendar: FC<CalendarProps> = props => {
  const days = props.days || defaultDays
  const months = props.months || defaultMonths
  const firstDayIndex = props.firstDayIndex === undefined ? defaultFirstDayIndex : props.firstDayIndex

  const selectedDates = getDates(props.activeDate!, props.activeDateTo!)

  const getDateItems = (renderProps: CalendarControlChildrenProps) => {
    return renderProps.dates.map(({date, disabled}, key) => {
      const selectedDatesIndex = selectedDates.indexOf(date.toDateString())
      if (selectedDatesIndex !== -1) {
        const cardProps: CardProps = {}
        let typoColor = '#fff'

        switch (selectedDatesIndex) {
          case 0:
            cardProps.bg = '#ff8c00'
            cardProps.rbl = 20
            cardProps.rtl = 20
            break

          case selectedDates.length - 1:
            cardProps.bg = '#ff8c00'
            cardProps.rbr = 20
            cardProps.rtr = 20
            break

          default:
            cardProps.bg = 'rgba(255,140,0,0.2)'
            typoColor = '#000'
            break
        }

        return (
          <Pos key={key} type="absolute">
            <Card
              width={10}
              height={10}
              mt={-2}
              ml={-2}
              p={2}
              cursor="pointer"
              onClick={renderProps.onDesktopSelectDate(date)}
              {...cardProps}
            >
              <Typo size={4} weight={300} height={6} color={typoColor} align="center" css={{'user-select': 'none'}}>
                {date.getDate()}
              </Typo>
            </Card>
          </Pos>
        )
      }

      switch (date.toDateString()) {
        case renderProps.activeDate && renderProps.activeDate.toDateString():
          return (
            <Pos key={key} type="absolute">
              <Card
                width={10}
                height={10}
                mt={-2}
                ml={-2}
                p={2}
                bg="#ff8c00"
                r={20}
                cursor="pointer"
                onClick={renderProps.onDesktopSelectDate(date)}
              >
                <Typo size={4} weight={300} height={6} color="#fff" align="center" css={{'user-select': 'none'}}>
                  {date.getDate()}
                </Typo>
              </Card>
            </Pos>
          )

        case new Date().toDateString():
          return (
            <Pos key={key} type="absolute">
              <Card
                width={10}
                height={10}
                mt={-2}
                ml={-2}
                p={2}
                bg="#f5f5f5"
                r={20}
                cursor="pointer"
                onClick={renderProps.onDesktopSelectDate(date)}
              >
                <Typo size={4} weight={500} height={6} align="center" css={{'user-select': 'none'}}>
                  {date.getDate()}
                </Typo>
              </Card>
            </Pos>
          )

        default:
          return (
            <Typo
              key={key}
              size={4}
              weight={300}
              height={6}
              align="center"
              color={disabled ? '#666' : 'default'}
              cursor={disabled ? 'default' : 'pointer'}
              onClick={renderProps.onDesktopSelectDate(date)}
              css={{'user-select': 'none'}}
            >
              {date.getDate()}
            </Typo>
          )
      }
    },
    )
  }

  return (
    <CalendarControl
      calendar={new CalendarConstructor(firstDayIndex, props.activeDate)}
      saveDate={props.saveDate}
      children={renderProps => (
        <BlockContent indent="s">
          <Flex justify="space-between" mb={4}>
            <Box
              cursor="pointer"
              onClick={renderProps.toPrevMonth}
              children={<Icon name="angle-left" />}
            />
            <Box onClick={renderProps.toggleSelectMonth}>
              <Typo display="inline" weight={500} size={4.5} height={6} css={{'user-select': 'none'}}>
                {months[renderProps.date.getMonth()]} {renderProps.date.getFullYear()}
              </Typo>
              <Box
                display="inline"
                cursor="pointer"
                children={<Icon name={renderProps.showSelectMonth ? 'angle-small-up' : 'angle-small-down'} />}
              />
            </Box>
            <Box
              cursor="pointer"
              onClick={renderProps.toNextMonth}
              children={<Icon name="angle-right" />}
            />
          </Flex>
          {renderProps.showSelectMonth ? (
            <Box maxHeight={91} overflow="auto">
              {months.map((month, index) => (
                <MenuLink
                  key={index}
                  title={month}
                  active={index === renderProps.date.getMonth()}
                  onClick={() => renderProps.selectMonth(index)}
                />
              ))}
            </Box>
          ) : (
            <Grid columns={7} layout={1} gutter={16}>
              {days.map(day => (
                <Typo key={day} size={3.5} weight={300} height={5} align="center" color="#666" css={{'user-select': 'none'}}>
                  {day}
                </Typo>
              ))}
              {getDateItems(renderProps)}
            </Grid>
          )}
        </BlockContent>
      )}
    />
  )
}
