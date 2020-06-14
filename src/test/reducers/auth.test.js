import authReducer from "../../reducers/auth";

test("should set default state", () => {
  const state = authReducer(undefined, { type: "@@INIT" });
  expect(state).toEqual({});
});

test("should login user", () => {
  const uid = "buyvt6u475iTUFKFRf76RFt6iy";

  const state = authReducer(
    {},
    {
      type: "LOGIN",
      uid,
    }
  );

  expect(state).toEqual({ uid });
});

test("should logout user", () => {
  const state = authReducer({ uid: "abcdef" }, { type: "LOGOUT" });
  expect(state).toEqual({});
});

test("should logout user without any logins", () => {
  const state = authReducer({}, { type: "LOGOUT" });
  expect(state).toEqual({});
});
