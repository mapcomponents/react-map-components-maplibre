import initStoryshots from "@storybook/addon-storyshots";
import { imageSnapshot } from "@storybook/addon-storyshots-puppeteer";

initStoryshots({
  //storyKindRegex: /^.*\[\t\].*$/,
  //storyKindRegex: /^((?!.*?DontTest).)*$/,
  test: imageSnapshot({
    storybookUrl: "http://localhost:6006/",
    /**
     * modify page before puppeteer.goto
     *
     * Note: Emulation and Viewport settings don't work here
     */
    //customizePage: (page) => page,

    testTimeout: 30000,
    /**
     * puppeteer.goto options
     * @link https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagegotourl-options
     */
    getGotoOptions: ({ context, url }) => ({
      waitUntil: "networkidle2",
    }),

    /**
     * set the page viewport size
     * wait before taking screenshot to give uncontrollable animations time to complete (Highcharts)
     */
    //beforeScreenshot: async (page, { context: { kind, story }, url }) => {
    //  //await page.waitFor(10000);
    //},

    /**
     * Emulate a collection of viewport dimensions
     */
    emulateViewports: [
      { width: 1920, height: 1080 },
      { width: 1600, height: 900 },
    ],

    /**
     * Emulate a collection of devices
     * @link https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pageemulateoptions
     * @link https://github.com/GoogleChrome/puppeteer/blob/master/DeviceDescriptors.js
     */
    //emulateDevices: [
    //  devices['iPhone 6'],
    //  devices['iPhone 6 landscape'],
    //  devices['iPad'],
    //  devices['iPad landscape']
    //],

    /**
     * puppeteer screenshot configuration
     * @link https://github.com/GoogleChrome/puppeteer/blob/master/docs/api.md#pagescreenshotoptions
     */
    getScreenshotOptions: ({
      context: { kind, framework, story },
      url,
      device,
    }) => ({
      fullPage: true,
    }),
  }),
});
