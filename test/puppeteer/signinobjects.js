const puppeteer = require('puppeteer');

class SigninPage {
    async validation_test() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
      
        try {
            await page.goto('http://localhost:3000/signin.html');
            await page.waitForTimeout(1000);
    
    
            const button = await page.$x('//*[@id="signin-form"]/input')
            button[0].click();
            await page.waitForTimeout(1000);
    
            await page.waitForSelector('#errors-signin-form', {
                visible: true, timeout: 2000
            })
    
            const errors = await page.$$('#errors-signin-form ul li');
    
            if (errors.length === 2) {
                console.log('Validation passed!');
                return true;
            } else {
                console.error(`Validation failed!`);
                return false;
            }
    
        } catch (error) {
            console.error('Error:', error);
        } finally {
            await browser.close();
        }
      }
    
    async exitButton_test() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
      
        try {
            await page.goto('http://localhost:3000/signin.html');
            await page.waitForTimeout(1000);
      
            const button = await page.$x('//*[@id="exit-btn"]')
            button[0].click();
            await page.waitForTimeout(1000);
    
            const currentUrl = await page.url();
            const isDashboardPage = currentUrl.includes('index.html');
                
            return isDashboardPage;
    
        } catch (error) {
            console.error('Error:', error);
        } finally {
            await browser.close();
        }
    }
    async toForgotPasswordPage_test() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
      
        try {
            await page.goto('http://localhost:3000/signin.html');
            await page.waitForTimeout(1000);
      
            const button = await page.$x('//*[@id="signin-form"]/div[2]/p/a')
            button[0].click();
            await page.waitForTimeout(1000);
    
            const currentUrl = await page.url();
            const isPasswordRecoveryPage = currentUrl.includes('password-recovery.html');
                
            return isPasswordRecoveryPage;
    
        } catch (error) {
            console.error('Error:', error);
        } finally {
            await browser.close();
        }
    }
    async toRegistrationPage_test() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
      
        try {
            await page.goto('http://localhost:3000/signin.html');
            await page.waitForTimeout(1000);
      
            const button = await page.$x('//*[@id="wb-auto-4"]/p/a')
            button[0].click();
            await page.waitForTimeout(1000);
    
            const currentUrl = await page.url();
            const isRegistrationPage = currentUrl.includes('registration.html');
                
            return isRegistrationPage;
    
        } catch (error) {
            console.error('Error:', error);
        } finally {
            await browser.close();
        }
    }
    
}

module.exports = SigninPage;