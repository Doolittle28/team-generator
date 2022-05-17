const engineer = require('../lib/Engineer');

test("Can create new Engineer object", () => {
    const engineer = new Engineer();
    
 expect(typeof{engineer}).toBe('object');   
});