import { login, logout } from "../../actions/auth";

test("should set up login action object", () => {
  const uid = "hjvcfxdhfgngfmdwGJ7657";
  const action = login(uid);
  expect(action).toEqual({
    type: "LOGIN",
    uid,
  });
});

test("should set up logout action object", () => {
  const action = logout();
  expect(action).toEqual({ type: "LOGOUT" });
});
