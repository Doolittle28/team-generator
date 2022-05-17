const intern = require('../lib/Intern');

test("Can create new Intern object", () => {
    const intern = new Intern();
    
 expect(typeof{intern}).toBe('object');   
});