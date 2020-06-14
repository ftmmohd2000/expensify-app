import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import numeral from "numeral";
import getExpensesTotal from "../selectors/expenses-total";
import expenseSelector from "../selectors/expenses";

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => (
  <div className="page-header">
    <div className="content-container">
      <h1 className="page-header__title">
        Viewing <span>{expenseCount}</span> expense
        {expenseCount === 1 ? "" : "s"} totalling{" "}
        <span>{numeral(expensesTotal).format("$0,0.00")}</span>
        <div className="page-header__actions">
          <Link className="button" to="/create">
            Add Expense
          </Link>
        </div>
      </h1>
    </div>
  </div>
);

const mapStateToProps = (state) => {
  const filteredExpenses = expenseSelector(state);
  return {
    expenseCount: filteredExpenses.length,
    expensesTotal: getExpensesTotal(filteredExpenses) / 100,
  };
};

export default connect(mapStateToProps)(ExpensesSummary);
