const puppeteer = require('puppeteer');

class ProfilePage {
    async validation_test() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
      
        try {
            await page.goto('http://localhost:3000/profile.html');
            await page.waitForTimeout(1000);
    
    
            const button = await page.$x('//*[@id="change-pssword-form"]/input')
            button[0].click();
            await page.waitForTimeout(1000);
    
            await page.waitForSelector('#errors-change-pssword-form', {
                visible: true, timeout: 2000
            })
    
            const errors = await page.$$('#errors-change-pssword-form ul li');
    
            if (errors.length === 3) {
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
    
      async password_validation_test() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
      
        try {
            await page.goto('http://localhost:3000/profile.html');
            await page.waitForTimeout(1000);
    
            await page.type('#current-password', 'test@1');
            await page.type('#new-password', 'test@1');
            await page.type('#new-password-confirm', 'test@2');
            await page.waitForTimeout(1000);
    
            const button = await page.$x('//*[@id="change-pssword-form"]/input')
            button[0].click();
            await page.waitForTimeout(1000);
    
            await page.waitForSelector('#errors-change-pssword-form', {
                visible: true, timeout: 2000
            })
    
            const errors = await page.$$('#errors-change-pssword-form ul li');
    
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
    
    async exitButton_test() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
      
        try {
            await page.goto('http://localhost:3000/profile.html');
            await page.waitForTimeout(1000);
      
            const button = await page.$x('//*[@id="change-pssword-form"]/a')
            button[0].click();
            await page.waitForTimeout(1000);
    
            const currentUrl = await page.url();
            const isDashboardPage = currentUrl.includes('dashboard.html');
                
            return isDashboardPage;
    
        } catch (error) {
            console.error('Error:', error);
        } finally {
            await browser.close();
        }
    }

    async toDashboardPage_test(){
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
      
        try {
          await page.goto('http://localhost:3000/profile.html');
    
          await page.click('#open-user-overlay-btn');
          await page.waitForTimeout(1000);
    
          const linkToProfile = await page.$x('//*[@id="user-overlay"]/ul/li[2]/a');
    
          if (linkToProfile.length > 0) {
            // Click the profile link
            await linkToProfile[0].click();
          
            await page.waitForTimeout(1000);
          
            const currentUrl = await page.url();
            const isProfilePage = currentUrl.includes('dashboard.html');
                
            // Return the result
            return isProfilePage;
          }
        }catch (error) {
          console.error('Error:', error);
        } finally {
          await browser.close();
        }
    
      }
}

module.exports = ProfilePage;