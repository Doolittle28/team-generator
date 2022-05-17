const manager = require("../lib/Manager");

test("Can create new Manager object", () => {
    const manager = new Manager();

    expect(typeof { manager }).toBe('object');
});