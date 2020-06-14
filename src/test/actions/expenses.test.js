import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import database from "../../firebase/firebase";
import {
  startAddExpense,
  addExpense,
  startEditExpense,
  editExpense,
  startRemoveExpense,
  removeExpense,
  setExpenses,
  startSetExpenses,
} from "../../actions/expenses";
import expenses from "../fixtures/expenses";

const createMockStore = configureMockStore([thunk]);
const uid = "testUID";
const defaultState = { auth: { uid } };

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt };
  });
  database
    .ref(`users/${uid}/expenses`)
    .set(expensesData)
    .then(() => done());
});

test("should set up remove expense action object", () => {
  const action = removeExpense({ id: "sexytimes" });
  expect(action).toEqual({
    type: "REMOVE_EXPENSE",
    id: "sexytimes",
  });
});

test("should delete expense from database and store", (done) => {
  const store = createMockStore(defaultState);
  const id = expenses[2].id;
  store
    .dispatch(startRemoveExpense({ id }))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "REMOVE_EXPENSE",
        id,
      });
      return database.ref(`users/${uid}expenses/${id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
});

test("should set up edit expense action object", () => {
  const action = editExpense(56, { note: "I want to punch Krish" });
  expect(action).toEqual({
    type: "EDIT_EXPENSE",
    id: 56,
    updates: {
      note: "I want to punch Krish",
    },
  });
});

test("should edit expense in database and store", (done) => {
  const store = createMockStore(defaultState);
  const updates = {
    amount: 1,
    description: "afera",
    note: "qr43er",
    createdAt: 4535,
  };
  const id = expenses[0].id;
  store
    .dispatch(startEditExpense(id, updates))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "EDIT_EXPENSE",
        updates,
        id,
      });
      return database.ref(`users/${uid}/expenses/${id}`).once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(updates);
      done();
    });
});

test("should set up add expense action object when expense is passed in", () => {
  const action = addExpense(expenses[2]);
  expect(action).toEqual({
    type: "ADD_EXPENSE",
    expense: expenses[2],
  });
});

test("should add expense to database and store", (done) => {
  const store = createMockStore(defaultState);
  const expenseData = {
    amount: 1,
    description: "afera",
    note: "qr43er",
    createdAt: 435,
  };
  store
    .dispatch(startAddExpense(expenseData))
    .then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: "ADD_EXPENSE",
        expense: {
          ...expenseData,
          id: expect.any(String),
        },
      });
      return database
        .ref(`users/${uid}/expenses/${actions[0].expense.id}`)
        .once("value");
    })
    .then((snapshot) => {
      expect(snapshot.val()).toEqual(expenseData);
      done();
    });
});

test("should setup set expense action object with data", () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: "SET_EXPENSES",
    expenses,
  });
});

test("should retrieve expenses from database", (done) => {
  const store = createMockStore(defaultState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: "SET_EXPENSES",
      expenses,
    });
    done();
  });
});
