const RegistrationPage = require('../registrationobjects');
const expect = require('chai').expect

describe('This tests for registration page', function(){
    let registration; // Declare dashboard outside the beforeEach to make it accessible in all tests

    beforeEach(function() {
        // Create a new instance of Dashboard before each test
        registration = new RegistrationPage();
    });

    it("form validation shows error", async function(){
        // Enter test steps
        const testResult = await registration.validation_test();
        expect(testResult).to.equal(true);
    });

    it("password matching validation", async function(){
        // Enter test steps
        const testResult = await registration.password_validation_test();
        expect(testResult).to.equal(true);
    });

    it("clicking exit redirect user to landing page", async function(){
        // Enter test steps
        const testResult = await registration.exitButton_test();
        expect(testResult).to.equal(true);
    });

    it("clicking reset resets the input fields", async function(){
        // Enter test steps
        const testResult = await registration.reset_test();
        expect(testResult).to.equal(true);
    });

    
})