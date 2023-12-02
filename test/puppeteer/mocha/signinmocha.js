const SigninPage = require('../signinobjects');
const expect = require('chai').expect

describe('This tests for signin page', function(){
    let signinpage; // Declare dashboard outside the beforeEach to make it accessible in all tests

    beforeEach(function() {
        // Create a new instance of Dashboard before each test
        signinpage = new SigninPage();
    });

    it("form validation shows error", async function(){
        // Enter test steps
        const testResult = await signinpage.validation_test();
        expect(testResult).to.equal(true);
    });

    it("clicking exit redirect user to dashboard page", async function(){
        // Enter test steps
        const testResult = await signinpage.exitButton_test();
        expect(testResult).to.equal(true);
    });

    it("clicking register to move to registration page", async function(){
        // Enter test steps
        const testResult = await signinpage.toRegistrationPage_test();
        expect(testResult).to.equal(true);
    });

    it("clicking forgot password linkg redirect user to password recovery page", async function(){
        // Enter test steps
        const testResult = await signinpage.toForgotPasswordPage_test();
        expect(testResult).to.equal(true);
    });


})