require('chromedriver');
var pjson = require('./package.json');
var moment = require('moment');
var webdriver = require('selenium-webdriver');

const {
  Builder,
  By,
  Key,
  until
} = require('selenium-webdriver');

// console.log(pjson.username.trim());
// console.log(pjson.password.trim());
// console.log(pjson.startDate.trim());
// console.log(pjson.endDate.trim());

if (process.env.NODE_ENV == 'development') {
  DevMain();
} else {
  Main();
}
//NODE_ENV="development" node ./app.js

async function Main() {
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
  //DevAddNewTimesheet();
}


async function DevMain() {
  console.log("Paras - Development Build");
  let driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build();
  try {

    //Opens and login into timesheet
    //await DevLogin(driver);
    await DevAddNewTimesheet(driver);

  } finally {
    await driver.sleep(10000);
    await driver.quit();
  }
};
async function DevLogin(driver) {
  await driver.get('http://127.0.0.1:8887/Vserv%20Timesheet%20Login.html');
  //await driver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
  await driver.wait(until.titleIs('Vserv Timesheet Login'), 1000);
  await driver.findElement(By.id('txtUserID')).sendKeys(pjson.username.trim());
  await driver.findElement(By.id('txtPassword')).sendKeys(pjson.password.trim());
  await driver.findElement(By.id('btnUserLogin')).click();
}
async function DevAddNewTimesheet(driver) {
  await driver.get('http://127.0.0.1:8887/Vserv%20Timesheet%20Application2.html');

  //!imp

  // const actions = driver.actions({ bridge: true });
  // var elem = await driver.findElement(By.id("l21"));
  // await actions.move({ duration: 5000, origin: elem, x: 0, y: 0 }).perform();

  // var elem = await driver.findElement(By.id("34"));
  // await actions.move({ duration: 5000, origin: elem, x: 0, y: 0 }).perform();

  // await driver.findElement(By.id("34")).click();

  //!imp

  var a = moment(pjson.startDate.trim());
  var b = moment(pjson.endDate.trim());

  for (var m = moment(a); m.diff(b, 'days') <= 0; m.add(1, 'days')) {
    //weekend check
    if (m.isoWeekday() !== 6 && m.isoWeekday() !== 7) {
      //console.log(m.format('MM/DD/YYYY'));

      //Select project
      await driver.findElement(By.css('#cphMaster_MyDataGrid_ddlProjects_0 > option:nth-child(4)')).click();
      await driver.sleep(500);

      await driver.findElement(By.id('cphMaster_MyDataGrid_txtDate_0')).clear();
      await driver.findElement(By.id('cphMaster_MyDataGrid_txtDate_0')).sendKeys(String(m.format('MM/DD/YYYY')));
      await driver.findElement(By.id('cphMaster_MyDataGrid_txtHours_0')).clear();
      await driver.findElement(By.id('cphMaster_MyDataGrid_txtHours_0')).sendKeys(pjson.hours.trim());
      await driver.findElement(By.xpath('//*[@id="cphMaster_MyDataGrid"]/tbody/tr[2]/td[1]/a[1]')).click();
      //await driver.findElement(By.id('cphMaster_btnAddNewTimeSheetEntry')).click();
    }
  }

  //Publish button click
  //await driver.findElement(By.id('cphMaster_btnPublish')).click();
  //await driver.switchTo().alert().accept();

}

//View timesheet - production
//http://182.76.79.200/Empower/AddNewTimeSheetEntry.aspx