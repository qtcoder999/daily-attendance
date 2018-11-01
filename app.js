require('chromedriver');
var webdriver = require('selenium-webdriver');
const { Builder, By, Key, until } = require('selenium-webdriver');

var pjson = require('./package.json');
console.log(pjson.username);
console.log(pjson.password);

main();


async function main() {
  let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
  try {

    //Opens and login into timesheet
    await login(driver);

  } finally {
    await driver.sleep(5000);
    await driver.quit();
  }
};


async function login(driver) {
  await driver.get('http://182.76.79.200/Empower/Login.aspx');
  //await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
  await driver.wait(until.titleIs('Vserv Timesheet Login'), 1000);
  await driver.findElement(By.id('txtUserID')).sendKeys(pjson.username.trim());
  await driver.findElement(By.id('txtPassword')).sendKeys(pjson.password.trim());
  await driver.findElement(By.id('btnUserLogin')).click();
}

