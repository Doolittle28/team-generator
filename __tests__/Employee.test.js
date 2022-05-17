const employee = require('../lib/Employee');

test("Can create new Employee object", () => {
    const employee = new Employee();
    
 expect(typeof{employee}).toBe('object');   
});