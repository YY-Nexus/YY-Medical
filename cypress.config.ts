import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    viewportWidth: 1280,
    viewportHeight: 720,
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    requestTimeout: 10000,
    responseTimeout: 10000,

    env: {
      // 测试环境变量
      TEST_USER_EMAIL: "test@yanyu-cloud.com",
      TEST_USER_PASSWORD: "testpassword123",
    },

    setupNodeEvents(on, config) {
      // 任务配置
      on("task", {
        log(message) {
          console.log(message)
          return null
        },

        // 数据库清理任务
        clearDatabase() {
          // 实现数据库清理逻辑
          return null
        },

        // 创建测试数据
        seedDatabase() {
          // 实现测试数据创建逻辑
          return null
        },
      })

      // 代码覆盖率
      require("@cypress/code-coverage/task")(on, config)

      return config
    },
  },

  component: {
    devServer: {
      framework: "next",
      bundler: "webpack",
    },
    specPattern: "cypress/component/**/*.cy.{js,jsx,ts,tsx}",
    supportFile: "cypress/support/component.ts",
  },
})
