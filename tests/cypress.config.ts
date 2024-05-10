import { addCucumberPreprocessorPlugin } from "@badeball/cypress-cucumber-preprocessor";
import browserify from "@badeball/cypress-cucumber-preprocessor/browserify";
import { defineConfig } from "cypress";

module.exports = defineConfig({
  projectId: "4g1xhq",
  chromeWebSecurity: false,
  viewportWidth: 1280,
  viewportHeight: 720,
  defaultCommandTimeout: 20000,
  retries: 2,
  video: true,
  videoCompression: 32,

  env: {
    testEnv: "https://api.nugverse.test.scaliolabs.com", //Envs can be updated here or in a cypress/support/requests/JobListingAddRequest.ts file
    stageEnv: "https://api.nugverse.stage.scaliolabs.com/",
  },
  e2e: {
    specPattern: ["cypress/e2e/**/*.{feature,features}"],
    baseUrl: "https://app.nugverse.test.scaliolabs.com/",
    supportFile: "cypress/support/e2e.ts",
    setupNodeEvents(on, config) {
      // This is required for the preprocessor to be able to generate JSON reports after each run, and more,
      addCucumberPreprocessorPlugin(on, config);
      on(
        "file:preprocessor",
        browserify(config, {
          typescript: require.resolve("typescript"),
        })
      );
      return config;
    },
    // Make sure to return the config object as it might have been modified by the plugin.
  },
});
