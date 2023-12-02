const ProfilePage = require('../profileobjects');
const expect = require('chai').expect

describe('This tests for profile page', function(){
    let profilepage; // Declare dashboard outside the beforeEach to make it accessible in all tests

    beforeEach(function() {
        // Create a new instance of Dashboard before each test
        profilepage = new ProfilePage();
    });

    it("form validation shows error", async function(){
        // Enter test steps
        const testResult = await profilepage.validation_test();
        expect(testResult).to.equal(true);
    });

    it("password matching validation", async function(){
        // Enter test steps
        const testResult = await profilepage.password_validation_test();
        expect(testResult).to.equal(true);
    });

    it("clicking exit redirect user to dashboard page", async function(){
        // Enter test steps
        const testResult = await profilepage.exitButton_test();
        expect(testResult).to.equal(true);
    });

    it("user can navigate to dashboard using user button", async function(){
        // Enter test steps
        const testResult = await profilepage.toDashboardPage_test();
        expect(testResult).to.equal(true);
    });
    
})