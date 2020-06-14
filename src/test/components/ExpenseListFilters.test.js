import React from "react";
import { shallow } from "enzyme";
import { DateRangePicker } from "react-dates";
import moment from "moment";
import { ExpenseListFilters } from "../../components/ExpenseListFilters";
import { filters, altFilters } from "../fixtures/filters";

let wrapper, setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate;

beforeEach(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
  setTextFilter = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setTextFilter={setTextFilter}
      sortByAmount={sortByAmount}
      sortByDate={sortByDate}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test("should render expenseListFilters properly", () => {
  expect(wrapper).toMatchSnapshot();
});

test("should render expenseListFilters with alt Data properly", () => {
  wrapper.setProps({
    filters: altFilters,
  });
  expect(wrapper).toMatchSnapshot();
});

test("should handle text change", () => {
  const value = "newTextFilter";
  wrapper.find("input").simulate("change", { target: { value } });
  expect(setTextFilter).toHaveBeenCalledWith(value);
});

test("should sort by date", () => {
  const value = "date";
  wrapper.find("select").simulate("change", { target: { value } });
  expect(sortByDate).toHaveBeenCalled();
});

test("should sort by amount", () => {
  const value = "amount";
  wrapper.find("select").simulate("change", { target: { value } });
  expect(sortByAmount).toHaveBeenCalled();
});

test("should handle date changes", () => {
  const startDate = moment(0).subtract(5, "years");
  const endDate = moment(0).add(7, "months");
  wrapper.find(DateRangePicker).prop("onDatesChange")({ startDate, endDate });
  expect(setStartDate).toHaveBeenCalledWith(startDate);
  expect(setEndDate).toHaveBeenCalledWith(endDate);
});

test("should date focus changes", () => {
  const calendarFocused = true;
  wrapper.find(DateRangePicker).prop("onFocusChange")(calendarFocused);
  expect(wrapper.state("calendarFocused")).toBe(calendarFocused);
});
