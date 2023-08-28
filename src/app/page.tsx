"use client"

import {
  DatePicker,
  DatePickerControl,
  DatePickerInput,
  DatePickerTrigger,
  DatePickerClearTrigger,
  DatePickerContent,
  DatePickerYearSelect,
  DatePickerMonthSelect,
  DatePickerPrevTrigger,
  DatePickerViewTrigger,
  DatePickerNextTrigger,
  DatePickerGrid,
  DatePickerRowHeader,
  DatePickerColumnHeader,
  DatePickerRowGroup,
  DatePickerRow,
  DatePickerDayCell,
  DatePickerDayCellTrigger,
  DatePickerMonthCell,
  DatePickerMonthCellTrigger,
  DatePickerYearCell,
  DatePickerYearCellTrigger,
  Portal,
  DatePickerPositioner,
  Select,
  SelectContent,
  SelectLabel,
  SelectOption,
  SelectOptionGroup,
  SelectOptionGroupLabel,
  SelectPositioner,
  SelectTrigger,
} from '@ark-ui/react'
import { useEffect, useState } from 'react'

export default function Home() {
  const [input, setInput] = useState("")
  const [date, setDate] = useState<any>(undefined)
  const [select, setSelect] = useState<any>(undefined)

  useEffect(() => {
    date && console.log(date)
  }, [date])

  useEffect(() => {
    input && console.log(input)
  }, [input])

  useEffect(() => {
    select && console.log(select)
  }, [select])

  return (
    <main>
      <input type="text" value={input} onChange={(e) => setInput(e.target.value)} />

      <DatePicker value={date} onChange={(e) => setDate(e.value)}>
        {(api) => (
          <>
            <DatePickerControl>
              <span>View mode: {api.view}</span>
              <DatePickerInput />
              <DatePickerTrigger>🗓</DatePickerTrigger>
              <DatePickerClearTrigger>Clear</DatePickerClearTrigger>
            </DatePickerControl>
            <Portal>
              <DatePickerPositioner>
                <DatePickerContent>
                  <DatePickerYearSelect />
                  <DatePickerMonthSelect />
                  <div>
                    <DatePickerPrevTrigger>Prev</DatePickerPrevTrigger>
                    <DatePickerViewTrigger>
                      {api.view === 'day' && api.visibleRangeText.start}
                      {api.view === 'month' && api.visibleRange.start.year}
                      {api.view === 'year' && `${api.getDecade().start} - ${api.getDecade().end}`}
                    </DatePickerViewTrigger>
                    <DatePickerNextTrigger>Next</DatePickerNextTrigger>
                  </div>
                  {api.view === 'day' && (
                    <DatePickerGrid>
                      <DatePickerRowHeader>
                        {api.weekDays.map((day, i) => (
                          <DatePickerColumnHeader key={i} aria-label={day.long}>
                            {day.narrow}
                          </DatePickerColumnHeader>
                        ))}
                      </DatePickerRowHeader>
                      <DatePickerRowGroup>
                        {api.weeks.map((week, id) => (
                          <DatePickerRow key={id}>
                            {week.map((day, id) => (
                              <DatePickerDayCell key={id} value={day}>
                                <DatePickerDayCellTrigger>{day.day}</DatePickerDayCellTrigger>
                              </DatePickerDayCell>
                            ))}
                          </DatePickerRow>
                        ))}
                      </DatePickerRowGroup>
                    </DatePickerGrid>
                  )}
                  {api.view === 'month' && (
                    <DatePickerGrid>
                      <DatePickerRowGroup>
                        {api.getMonthsGrid({ columns: 4, format: 'short' }).map((months, row) => (
                          <DatePickerRow key={row}>
                            {months.map((month, index) => (
                              <DatePickerMonthCell key={index} value={month.value}>
                                <DatePickerMonthCellTrigger>{month.label}</DatePickerMonthCellTrigger>
                              </DatePickerMonthCell>
                            ))}
                          </DatePickerRow>
                        ))}
                      </DatePickerRowGroup>
                    </DatePickerGrid>
                  )}
                  {api.view === 'year' && (
                    <DatePickerGrid>
                      <DatePickerRowGroup>
                        {api.getYearsGrid({ columns: 4 }).map((years, row) => (
                          <DatePickerRow key={row}>
                            {years.map((year, index) => (
                              <DatePickerYearCell key={index} value={year.value}>
                                <DatePickerYearCellTrigger>{year.label}</DatePickerYearCellTrigger>
                              </DatePickerYearCell>
                            ))}
                          </DatePickerRow>
                        ))}
                      </DatePickerRowGroup>
                    </DatePickerGrid>
                  )}
                </DatePickerContent>
              </DatePickerPositioner>
            </Portal>
          </>
        )}
      </DatePicker>

      <Select selectedOption={select} onChange={(e) => setSelect(e?.value)}>
        {({ selectedOption }) => (
          <>
            <SelectLabel>Framework</SelectLabel>
            <SelectTrigger>{selectedOption?.label ?? 'Select option'}</SelectTrigger>
            <Portal>
              <SelectPositioner>
                <SelectContent>
                  <SelectOption value="react" label="React" />
                  <SelectOption value="solid" label="Solid">
                    Solid
                  </SelectOption>
                  <SelectOption value="vue" label="Vue">
                    Vue
                  </SelectOption>
                </SelectContent>
              </SelectPositioner>
            </Portal>
          </>
        )}
      </Select>
    </main>
  )
}
