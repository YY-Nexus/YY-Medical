import { describe, beforeEach, it } from "cypress"

describe("用户认证流程", () => {
  beforeEach(() => {
    // 清理数据库
    cy.task("clearDatabase")
    // 访问登录页面
    cy.visit("/login")
  })

  it("应该能够成功登录", () => {
    // 检查页面元素
    cy.get('[data-testid="logo"]').should("be.visible")
    cy.get("h1").should("contain", "登录到言语云³")

    // 填写登录表单
    cy.get('input[name="email"]').type("doctor@yanyu-cloud.com")
    cy.get('input[name="password"]').type("password123")

    // 提交表单
    cy.get('button[type="submit"]').click()

    // 验证登录成功
    cy.url().should("include", "/dashboard")
    cy.get('[data-testid="welcome-message"]').should("contain", "欢迎使用言语云³")
  })

  it("应该显示登录错误信息", () => {
    // 填写错误的登录信息
    cy.get('input[name="email"]').type("wrong@email.com")
    cy.get('input[name="password"]').type("wrongpassword")

    // 提交表单
    cy.get('button[type="submit"]').click()

    // 验证错误信息
    cy.get('[data-testid="error-message"]').should("contain", "邮箱或密码错误")
    cy.url().should("include", "/login")
  })

  it("应该能够注册新用户", () => {
    // 点击注册链接
    cy.get('a[href="/register"]').click()

    // 验证注册页面
    cy.url().should("include", "/register")
    cy.get("h1").should("contain", "注册言语云³账户")

    // 填写注册表单
    cy.get('input[name="email"]').type("newuser@yanyu-cloud.com")
    cy.get('input[name="password"]').type("newpassword123")
    cy.get('input[name="confirmPassword"]').type("newpassword123")

    // 提交表单
    cy.get('button[type="submit"]').click()

    // 验证注册成功
    cy.get('[data-testid="success-message"]').should("contain", "注册成功")
  })

  it("应该支持键盘导航", () => {
    // 使用Tab键导航
    cy.get("body").tab()
    cy.focused().should("have.attr", "data-testid", "skip-to-content")

    cy.focused().tab()
    cy.focused().should("have.attr", "name", "email")

    cy.focused().tab()
    cy.focused().should("have.attr", "name", "password")

    // 使用Enter键提交
    cy.get('input[name="email"]').type("test@yanyu-cloud.com")
    cy.get('input[name="password"]').type("password123")
    cy.get('input[name="password"]').type("{enter}")
  })

  it("应该在离线状态下显示离线通知", () => {
    // 模拟离线状态
    cy.window().then((win) => {
      cy.stub(win.navigator, "onLine").value(false)
      win.dispatchEvent(new Event("offline"))
    })

    // 验证离线通知
    cy.get('[data-testid="offline-notification"]').should("be.visible")
    cy.get('[data-testid="offline-notification"]').should("contain", "您当前处于离线状态")
  })
})
