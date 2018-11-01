require('chromedriver');
var webdriver = require('selenium-webdriver');
const {Builder, By, Key, until} = require('selenium-webdriver');


(async function example() {
    let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
  try {
    await driver.get('http://182.76.79.200/Empower/Login.aspx');
    //await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    await driver.wait(until.titleIs('Vserv Timesheet Login'), 1000);

    
  } finally {
    //await driver.quit();
  }
})();