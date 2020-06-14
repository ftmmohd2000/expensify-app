import React from "react";
import { shallow } from "enzyme";
import { ExpensesSummary } from "../../components/ExpensesSummary";
import expenses from "../fixtures/expenses";

test("should render ExpensesSummary correctly with no expenses", () => {
  const wrapper = shallow(
    <ExpensesSummary expensesTotal={1} expensesCount={5000000} />
  );
  expect(wrapper).toMatchSnapshot();
});

test("should render ExpensesSummary correctly with expenses", () => {
  const wrapper = shallow(
    <ExpensesSummary expensesTotal={2} expensesCount={5000000} />
  );
  expect(wrapper).toMatchSnapshot();
});
