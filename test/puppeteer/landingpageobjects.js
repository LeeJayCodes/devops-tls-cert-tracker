const puppeteer = require('puppeteer');

class LandingPage {


  async toSignInPage_test() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    try {
        await page.goto('http://localhost:3000');
        await page.waitForTimeout(1000);
  
        const button = await page.$x('//*[@id="wb-so"]/div/div/a')
        button[0].click();
        await page.waitForTimeout(1000);

        const currentUrl = await page.url();
        const isLandingPage = currentUrl.includes('signin.html');
            
        return isLandingPage;

    } catch (error) {
        console.error('Error:', error);
    } finally {
        await browser.close();
    }
  }

}

module.exports = LandingPage;