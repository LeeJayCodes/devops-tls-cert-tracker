const puppeteer = require('puppeteer');

class RegistrationPage {
  async validation_test() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    try {
        await page.goto('http://localhost:3000/registration.html');
        await page.waitForTimeout(1000);


        const button = await page.$x('//*[@id="register-form"]/input[1]')
        button[0].click();
        await page.waitForTimeout(1000);

        await page.waitForSelector('#errors-register-form', {
            visible: true, timeout: 2000
        })

        const errors = await page.$$('#errors-register-form ul li');

        if (errors.length === 5) {
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
        await page.goto('http://localhost:3000/registration.html');
        await page.waitForTimeout(1000);
  
        const button = await page.$x('//*[@id="register-form"]/a')
        button[0].click();
        await page.waitForTimeout(1000);

        const currentUrl = await page.url();
        const isLandingPage = currentUrl.includes('index.html');
            
        return isLandingPage;

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
  }

  async reset_test(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    try {
        await page.goto('http://localhost:3000/registration.html');
        await page.waitForTimeout(1000);
  
        await page.type('#firstname', 'test');
        await page.type('#lastname', 'test');
        await page.type('#email', 'test');
        await page.type('#password', 'test');
        await page.type('#password-confirm', 'test');
        
        const button = await page.$x('//*[@id="register-form"]/input[2]')
        button[0].click();
        await page.waitForTimeout(1000);

        // Check if all input fields are cleared
        const inputsCleared = await page.evaluate(() => {
            const firstnameValue = document.getElementById('firstname').value;
            const lastnameValue = document.getElementById('lastname').value;
            const email = document.getElementById('firstname').value;
            const password = document.getElementById('lastname').value;
            const passwordConfirm = document.getElementById('firstname').value;

            return firstnameValue === '' && lastnameValue === '' && email === '' && password === '' && passwordConfirm === '';
        });

        return inputsCleared;

    }catch (error) {
      console.error('Error:', error);
    } finally {
      await browser.close();
    }

  }

  async password_validation_test() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    try {
        await page.goto('http://localhost:3000/registration.html');
        await page.waitForTimeout(1000);

        await page.type('#firstname', 'test');
        await page.type('#lastname', 'test');
        await page.type('#email', 'test@test.com');
        await page.type('#password', 'test@1');
        await page.type('#password-confirm', 'test@2');
        await page.waitForTimeout(1000);

        const button = await page.$x('//*[@id="register-form"]/input[1]')
        button[0].click();
        await page.waitForTimeout(1000);

        await page.waitForSelector('#errors-register-form', {
            visible: true, timeout: 2000
        })

        const errors = await page.$$('#errors-register-form ul li');

        if (errors.length === 1) {
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

}

module.exports = RegistrationPage;