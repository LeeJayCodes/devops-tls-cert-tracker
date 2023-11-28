const domain = "http://localhost:8080"

class ConfigurationPage{
    static dashboardTestingURL(){
        return `${domain}/test/dashboard.html`;
    }
    static landingPageTestingURL(){
        return `${domain}/test/certificate-tracker.html`;
    }
    static profilePageTestingURL(){
        return `${domain}/test/profile.html`;
    }
    static registrationPageTestingURL(){
        return `${domain}/test/registration.html`;
    }
    static signinPageTestingURL(){
        return `${domain}/test/signin.html`;
    }
}

module.exports = ConfigurationPage