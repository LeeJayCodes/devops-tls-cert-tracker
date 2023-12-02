const puppeteer = require('puppeteer');

class PuppetTest {
  async validURL_Test(input) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    try {
      await page.goto('http://localhost:3000/dashboard.html');
      // Click the link with text "Click here to add new certificate"
      await page.waitForTimeout(1000);

      await page.click('#ptest');
 
      // Check if the specified text is displayed on the page

      let typeURL = await page.waitForSelector('#userInputUrl', {
        visible: true, timeout: 2000
      })

      let URL = input

      await typeURL.type(URL);

      await page.click('#submitUrl');

      await page.waitForTimeout(500);

      await page.click('#close-url-form');
      await page.waitForTimeout(500);

      // Select all rows
      const rows = await page.$$('tr');

      // Select the last row
      const lastRow = await rows[rows.length - 1];
      
      const urlCellText = await page.evaluate(row => {
        const secondTd = row.querySelector('td:nth-child(2)');
        return secondTd ? secondTd.textContent.trim() : null;
      }, lastRow);
            
      if (urlCellText == URL) {
        return true;
      } else {
        return false;
      }

    } catch (error) {
      console.error('Error:', error);
    } finally {
      await browser.close();
    }
  }

  async colorKey_test() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    try {
      await page.goto('http://localhost:3000/dashboard.html');
      await page.waitForTimeout(1000);
  
      await page.click('details summary');
      await page.waitForTimeout(1000);

      const isTextVisible = await page.waitForXPath('//span[contains(text(), "More than 6 weeks")]', { visible: true })
      .then(() => true)
      .catch(() => false);
      return isTextVisible;

    } catch (error) {
      console.error('Error:', error);
    } finally {
      await browser.close();
    }
  }

  async moreCert_test(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    try {
      await page.goto('http://localhost:3000/dashboard.html');
      await page.waitForTimeout(1000);

      await page.click('#wb-auto-6');
      await page.waitForTimeout(1000);

      
      await page.waitForXPath('//*[@id="certinfo-popup"]/div[1]/section/dl/dd[1]/span', {
        visible: true, timeout: 2000
      })
      
      const spanElement = await page.$x('//*[@id="certinfo-popup"]/div[1]/section/dl/dd[1]/span');
      if (spanElement.length > 0) {
        const spanText = await page.evaluate(span => span.textContent.trim(), spanElement[0]);
      
        // Check if the text content is equal to "www.dummy2.com"
        const isTextEqual = spanText === "www.dummy2.com";
      
        if (isTextEqual) {
          console.log('Text content of the span element is "www.dummy2.com".');
          return true;
        } else {
          console.log('Text content of the span element is not "www.dummy2.com".');
          return false;
        }
      } else {
        console.error('Element not found with the given XPath');
        return false;
      }
      
    }catch (error) {
      console.error('Error:', error);
    } finally {
      await browser.close();
    }

  }

  async deleteBtn_test(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    try {
      await page.goto('http://localhost:3000/dashboard.html');
      await page.waitForTimeout(1000);

      const initialRowCount = await page.$$eval('tr', trs => trs.length);
      const deleteButtons = await page.$$('.deleteBtn');
          
      await deleteButtons[0].click();
          
      await page.waitForTimeout(1000);
          
      const updatedRowCount = await page.$$eval('tr', trs => trs.length);  
      const isRowCountReduced = updatedRowCount === initialRowCount - 1;

      return isRowCountReduced;
    }catch (error) {
      console.error('Error:', error);
    } finally {
      await browser.close();
    }

  }

  async toProfilePage_test(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    try {
      await page.goto('http://localhost:3000/dashboard.html');

      await page.click('#open-user-overlay-btn');
      await page.waitForTimeout(1000);

      const linkToProfile = await page.$x('//*[@id="user-overlay"]/ul/li[1]/a');

      if (linkToProfile.length > 0) {
        // Click the profile link
        await linkToProfile[0].click();
      
        await page.waitForTimeout(1000);
      
        const currentUrl = await page.url();
        const isProfilePage = currentUrl.includes('profile.html');
            
        // Return the result
        return isProfilePage;
      }
    }catch (error) {
      console.error('Error:', error);
    } finally {
      await browser.close();
    }

  }

  async signOut_test(){
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
  
    try {
      await page.goto('http://localhost:3000/dashboard.html');

      await page.click('#open-user-overlay-btn');
      await page.waitForTimeout(1000);

      const signOut = await page.$x('//*[@id="user-overlay"]/ul/li[3]/button');

      if (signOut.length > 0) {
        // Click the profile link
        await signOut[0].click();
      
        await page.waitForTimeout(1000);
      
        const currentUrl = await page.url();
        const isProfilePage = currentUrl.includes('index.html');
            
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

module.exports = PuppetTest;