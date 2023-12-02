const Dashboard = require('../dashboardobjects');
const expect = require('chai').expect

describe('This tests for dashboard page', function(){
    let dashboard; // Declare dashboard outside the beforeEach to make it accessible in all tests

    beforeEach(function() {
        // Create a new instance of Dashboard before each test
        dashboard = new Dashboard();
    });
    it("Test if user's valid URL input is being added to the list", async function(){
        // Enter test steps
        const testResult = await dashboard.validURL_Test("https://google.com");
        expect(testResult).to.equal(true);
    });

    it("Test if user's invalid URL input is being prevented", async function(){
        // Enter test steps
        const testResult = await dashboard.validURL_Test("http://google.com");
        expect(testResult).to.equal(false);
    });
    
    it("Test if color key is visible when link is clicked", async function(){
        // Enter test steps
        const testResult = await dashboard.colorKey_test();
        expect(testResult).to.equal(true);
    });

    it("Test if more certification information displays", async function(){
        // Enter test steps
        const testResult = await dashboard.moreCert_test();
        expect(testResult).to.equal(true);
    });

    it("Test if user can delete certificate", async function(){
        // Enter test steps
        const testResult = await dashboard.deleteBtn_test();
        expect(testResult).to.equal(true);
    });

    it("Test if user can go to profile page", async function(){
        // Enter test steps
        const testResult = await dashboard.toProfilePage_test();
        expect(testResult).to.equal(true);
    });

    it("Test if clicking sign out redirect user to landing page", async function(){
        // Enter test steps
        const testResult = await dashboard.signOut_test();
        expect(testResult).to.equal(true);
    });
    
    
})