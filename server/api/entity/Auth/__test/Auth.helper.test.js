import { sign } from "jsonwebtoken";
import { signToken, isPermission } from "./../Auth.helper";

jest.mock("jsonwebtoken", () => {
  return {
    __esModule: true,
    sign: jest.fn((obj, secret, options) => {
      expect(obj.id).toEqual("12345id");
      expect(secret).toEqual("secret");
      /* expect(options.expiresIn).toEqual(
        Date.now() + parseInt(10 * 24 * 60 * 60 * 1000) - 2// - 2 - its time for test complete
      ); */
    }),
  };
});

describe("Auth helpers", () => {
  afterEach(() => {
    sign.mockClear();
  });

  test("signToken - we call to jsonwebtoken.sign with our options", () => {
    process.env.JWT_SECRET = "secret";
    process.env.JWT_COOKIE_EXPIRES_AT = 10;

    const token = signToken("12345id");

    expect(sign).toHaveBeenCalledTimes(1);
  });

  test("isPermission", () => {
    const roles = ["admin", "guide"];
    const req = {
      user: {
        role: "user",
      },
    };

    let result = isPermission(roles, req);

    expect(result).toEqual(false);

    req.user.role = "guide";

    result = isPermission(roles, req);

    expect(result).toEqual(true);
  });
});
