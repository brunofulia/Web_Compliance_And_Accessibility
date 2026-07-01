import { test, expect } from '@fixtures/test.fixtures';

test.describe('The Internet HerokuApp - Privacy Alert Interaction', () => {

  //==========Test Ok==========//
  test('The Internet HerokuApp - Privacy Alert Interaction', async ({ page, herokuAlertsPage }) => {
    // 1. Set up native listener to intercept and accept the dialog
    page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('I am a JS Alert');
      await dialog.accept();
    });

    // 2. Navigate to the Heroku JS Alerts page
    await herokuAlertsPage.navigate();

    // 3. Trigger the alert via the POM method
    await herokuAlertsPage.clickJSAlertButton();
  });

  //==========Test Fail==========//
  test('The Internet HerokuApp - Privacy Alert Interaction - Fail', async ({ page, herokuAlertsPage }) => {
    // 1. Set up native listener to intercept and accept the dialog
    page.on('dialog', async (dialog) => {
      expect(dialog.type()).toBe('alert');
      expect(dialog.message()).toBe('I am NOT a JS Alert'); // Wrong Message to fail 
      await dialog.accept();
    });

    // 2. Navigate to the Heroku JS Alerts page
    await herokuAlertsPage.navigate();

    // 3. Trigger the alert via the POM method
    await herokuAlertsPage.clickJSAlertButton();
  });

});
