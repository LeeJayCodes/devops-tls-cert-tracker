const LandingPage = require('../landingpageobjects');
const expect = require('chai').expect

describe('This tests for registration page', function(){
    let landingpage; // Declare dashboard outside the beforeEach to make it accessible in all tests

    beforeEach(function() {
        // Create a new instance of Dashboard before each test
        landingpage = new LandingPage();
    });

    it("user can move to sign in page from landing page", async function(){
        // Enter test steps
        const testResult = await landingpage.toSignInPage_test();
        expect(testResult).to.equal(true);
    });

    
})