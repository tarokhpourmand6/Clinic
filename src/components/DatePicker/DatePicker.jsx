import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';

import { Calendar } from './Calendar';
import DatePickerInput from './DatePickerInput';
import { getValueType } from './shared/generalUtils';
import { TYPE_SINGLE_DATE, TYPE_MUTLI_DATE, TYPE_RANGE } from './shared/constants';

const DatePicker = ({
  value,
  onChange,
  formatInputText,
  inputPlaceholder,
  inputClassName,
  inputName,
  renderInput,
  wrapperClassName = '',
  calendarClassName,
  calendarTodayClassName,
  calendarSelectedDayClassName,
  calendarRangeStartClassName,
  calendarRangeBetweenClassName,
  calendarRangeEndClassName,
  calendarPopperPosition = 'auto',
  disabledDays,
  onDisabledDayError,
  colorPrimary,
  colorPrimaryLight,
  slideAnimationDuration,
  minimumDate,
  maximumDate,
  selectorStartingYear,
  selectorEndingYear,
  locale = 'en',
  shouldHighlightWeekends,
  renderFooter,
  customDaysClassName,
}) => {
  const calendarContainerElement = useRef(null);
  const inputElement = useRef(null);
  const shouldPreventToggle = useRef(false);
  const [isCalendarOpen, setCalendarVisiblity] = useState(false);

  useEffect(() => {
    const handleBlur = () => {
      setCalendarVisiblity(false);
    };
    window.addEventListener('blur', handleBlur, false);
    return () => {
      window.removeEventListener('blur', handleBlur, false);
    };
  }, []);

  useEffect(() => {
    const valueType = getValueType(value);
    if (valueType === TYPE_MUTLI_DATE) return;
    const shouldCloseCalendar =
      valueType === TYPE_SINGLE_DATE ? !isCalendarOpen : !isCalendarOpen && value.from && value.to;
    if (shouldCloseCalendar && inputElement.current) inputElement.current.blur();
  }, [value, isCalendarOpen]);

  const handleBlur = e => {
    e.persist();
    if (!isCalendarOpen) return;
    if (!calendarContainerElement.current) return;

    const isInnerElementFocused = calendarContainerElement.current.contains(e.relatedTarget);
    if (shouldPreventToggle.current) {
      shouldPreventToggle.current = false;
      inputElement.current?.focus();
    } else if (isInnerElementFocused && e.relatedTarget) {
      e.relatedTarget.focus();
    } else {
      setCalendarVisiblity(false);
    }
  };

  const openCalendar = () => {
    if (!shouldPreventToggle.current) setCalendarVisiblity(true);
  };

  useLayoutEffect(() => {
    if (!isCalendarOpen || !calendarContainerElement.current) return;

    const { left, width, height, top } = calendarContainerElement.current.getBoundingClientRect();
    const { clientWidth, clientHeight } = document.documentElement;
    const isOverflowingFromRight = left + width > clientWidth;
    const isOverflowingFromLeft = left < 0;
    const isOverflowingFromBottom = top + height > clientHeight;

    const getLeftStyle = () => {
      const overflowFromRightDistance = left + width - clientWidth;
      if (!isOverflowingFromRight && !isOverflowingFromLeft) return;
      const overflowFromLeftDistance = Math.abs(left);
      const rightPosition = isOverflowingFromLeft ? overflowFromLeftDistance : 0;

      return isOverflowingFromRight
        ? `calc(50% - ${overflowFromRightDistance}px)`
        : `calc(50% + ${rightPosition}px)`;
    };

    calendarContainerElement.current.style.left = getLeftStyle();

    if (
      (calendarPopperPosition === 'auto' && isOverflowingFromBottom) ||
      calendarPopperPosition === 'top'
    ) {
      calendarContainerElement.current.classList.add('-top');
    }
  }, [isCalendarOpen]);

  const handleCalendarChange = newValue => {
    const valueType = getValueType(value);
    onChange(newValue);
    if (valueType === TYPE_SINGLE_DATE) setCalendarVisiblity(false);
    else if (valueType === TYPE_RANGE && newValue.from && newValue.to) setCalendarVisiblity(false);
  };

  const handleKeyUp = ({ key }) => {
    switch (key) {
      case 'Enter':
        setCalendarVisiblity(true);
        break;
      case 'Escape':
        setCalendarVisiblity(false);
        shouldPreventToggle.current = true;
        break;
    }
  };

  useEffect(() => {
    if (!isCalendarOpen && shouldPreventToggle.current) {
      inputElement.current?.focus();
      shouldPreventToggle.current = false;
    }
  }, [shouldPreventToggle, isCalendarOpen]);

  return (
    <div
      onFocus={openCalendar}
      onBlur={handleBlur}
      onKeyUp={handleKeyUp}
      className={`DatePicker ${wrapperClassName}`}
      role="presentation"
    >
      <DatePickerInput
        ref={inputElement}
        formatInputText={formatInputText}
        value={value}
        inputPlaceholder={inputPlaceholder}
        inputClassName={inputClassName}
        renderInput={renderInput}
        inputName={inputName}
        locale={locale}
      />
      {isCalendarOpen && (
        <>
          <div
  ref={calendarContainerElement}
  className="DatePicker__calendarContainer"
  data-testid="calendar-container"
  role="presentation"
  style={{
    position: 'absolute',
    zIndex: 9999, // ✅ این اضافه شده
  }}
          >
            <Calendar
              value={value}
              onChange={handleCalendarChange}
              calendarClassName={calendarClassName}
              calendarTodayClassName={calendarTodayClassName}
              calendarSelectedDayClassName={calendarSelectedDayClassName}
              calendarRangeStartClassName={calendarRangeStartClassName}
              calendarRangeBetweenClassName={calendarRangeBetweenClassName}
              calendarRangeEndClassName={calendarRangeEndClassName}
              disabledDays={disabledDays}
              colorPrimary={colorPrimary}
              colorPrimaryLight={colorPrimaryLight}
              slideAnimationDuration={slideAnimationDuration}
              onDisabledDayError={onDisabledDayError}
              minimumDate={minimumDate}
              maximumDate={maximumDate}
              selectorStartingYear={selectorStartingYear}
              selectorEndingYear={selectorEndingYear}
              locale={locale}
              shouldHighlightWeekends={shouldHighlightWeekends}
              renderFooter={renderFooter}
              customDaysClassName={customDaysClassName}
            />
          </div>
          <div className="DatePicker__calendarArrow" />
        </>
      )}
    </div>
  );
};

export default DatePicker;