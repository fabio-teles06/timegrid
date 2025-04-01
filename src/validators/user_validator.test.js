const validater = require('./user_validator');

describe("User Validator Tests", () => {
    it("Should validate a valid name", () => {
        const name = "John Doe";
        const result = validater.validateName(name);
        expect(result).toBe(true);
    });
    it("Should invalidate an invalid name", () => {
        const name = "John123";
        const result = validater.validateName(name);
        expect(result).toBe(false);
    });
    it("Should invalidate a name with special characters", () => {
        const name = "John@Doe";
        const result = validater.validateName(name);
        expect(result).toBe(false);
    });
    it("Should invalidate a name with numbers", () => {
        const name = "John123";
        const result = validater.validateName(name);
        expect(result).toBe(false);
    });
    it("Should invalidate a name with empty string", () => {
        const name = "";
        const result = validater.validateName(name);
        expect(result).toBe(false);
    });
    it("Should invalidate a name with null", () => {
        const name = null;
        const result = validater.validateName(name);
        expect(result).toBe(false);
    });
    it("Should invalidate a name with undefined", () => {
        const name = undefined;
        const result = validater.validateName(name);
        expect(result).toBe(false);
    });
    it("Should validate a valid email", () => {
        const email = "JohnDoe@test.com";
        const result = validater.validateEmail(email);
        expect(result).toBe(true);
    });
    it("Should invalidate an invalid email", () => {
        const email = "JohnDoe@test";
        const result = validater.validateEmail(email);
        expect(result).toBe(false);
    });
    it("Should invalidate an email with special characters", () => {
        const email = "JohnDoe@te!st.com";
        const result = validater.validateEmail(email);
        expect(result).toBe(false);
    });
    it("Should invalidate an email with empty string", () => {
        const email = "";
        const result = validater.validateEmail(email);
        expect(result).toBe(false);
    });
    it("Should invalidate an email with null", () => {
        const email = null;
        const result = validater.validateEmail(email);
        expect(result).toBe(false);
    });
    it("Should invalidate an email with undefined", () => {
        const email = undefined;
        const result = validater.validateEmail(email);
        expect(result).toBe(false);
    });
    it("Should validate a valid password", () => {
        const password = "Password123!";
        const result = validater.validatePassword(password);
        expect(result).toBe(true);
    });
    it("Should invalidate an invalid password", () => {
        const password = "password";
        const result = validater.validatePassword(password);
        expect(result).toBe(false);
    });
    it("Should invalidate a empty password", () => {
        const password = "";
        const result = validater.validatePassword(password);
        expect(result).toBe(false);
    });
    it("Should invalidate a password with null", () => {
        const password = null;
        const result = validater.validatePassword(password);
        expect(result).toBe(false);
    });
    it("Should invalidate a password with undefined", () => {
        const password = undefined;
        const result = validater.validatePassword(password);
        expect(result).toBe(false);
    });
});
