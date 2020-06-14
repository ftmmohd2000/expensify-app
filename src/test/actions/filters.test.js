import moment from "moment";
import {
  setTextFilter,
  setStartDate,
  setEndDate,
  sortByDate,
  sortByAmount,
} from "../../actions/filters";

test("should generate set start date action object", () => {
  const action = setStartDate(moment(0));
  expect(action).toEqual({
    type: "SET_START_DATE",
    startDate: moment(0),
  });
});

test("should generate set end date action object", () => {
  const action = setEndDate(moment(0));
  expect(action).toEqual({
    type: "SET_END_DATE",
    endDate: moment(0),
  });
});

test("should generate set text filter action object", () => {
  const action = setTextFilter("oof");
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: "oof",
  });
});

test("should generate set text filter action object when nothing is passed in", () => {
  const action = setTextFilter();
  expect(action).toEqual({
    type: "SET_TEXT_FILTER",
    text: "",
  });
});
test("should generate sort by Date action object", () => {
  const action = sortByDate();
  expect(action).toEqual({
    type: "SORT_BY_DATE",
  });
});
test("should generate sort by Amount action object", () => {
  const action = sortByAmount();
  expect(action).toEqual({
    type: "SORT_BY_AMOUNT",
  });
});
