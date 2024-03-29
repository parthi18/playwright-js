import CommonFunctions from "../../page/common.page";
import HeaderPage from "../../page/header.page";
import LoginPage from "../../page/login.page";
import Env from "../../utils/environment";
import * as data from "../../data/login.cred.json";
import { test, Page,  } from '@playwright/test';
import ReportUtils from "../../utils/reportUtils";

declare const page: Page;
declare const reporter: any;

describe("TC002", () => {
    // my pages
    let header: HeaderPage;
    let login: LoginPage;
    let common: CommonFunctions;

    beforeAll(async () => {
        await page.goto(Env.test);
        header = new HeaderPage(page);
        login = new LoginPage(page);
        common = new CommonFunctions(page);
    })

    afterAll(async () => {
        await page.close();
        await context.close();
        await browser.close();
    })

    test("TC002 Login 1", async () => {
        await reporter
            .description("Login into LetCode")
            .story("JIRA101");
        await reporter.startStep("Navigate to letcode");
        expect(page.url()).toBe("https://letcode.in/")
        await ReportUtils.screenshot("naviagation")
        await reporter.endStep();
        await reporter.startStep("Click login link");
        await header.clickLoginLink();
        await reporter.endStep();
        expect(page.url()).toBe("https://letcode.in/signin")
        await reporter.startStep("enter username");
        await login.enterUserName(data.email);
        await ReportUtils.screenshot("username")
        // const screenshotBuffer = await page.screenshot();
        // await reporter.addAttachment("username", screenshotBuffer, "image/png");
        await reporter.endStep();
        await reporter.startStep("enter password");
        await login.enterUserPassword(data.pass);
        await ReportUtils.screenshot();
        await reporter.endStep();
        await login.clickLoginBtn();
        const toaster = await common.toaster();
        expect(await toaster?.textContent()).toContain("Welcome");
        await reporter.startStep("Log out");
        await header.clickSignOutLink();
        await ReportUtils.screenshot("done")
        await reporter.endStep();

    });
    // test("TC002 Login 2", async () => {
    //     await page.goto(Env.test, {
    //         waitUntil: "domcontentloaded"
    //     });
    //     await header.clickLoginLink();
    //     await login.login("koushik350@gmail.com", "Pass123$");
    //     await page.waitForNavigation();
    //     expect(page.url()).toBe("https://letcode.in/")
    //     await ReportUtils.screenshot("done")
    // })
})

function beforeAll(arg0: () => Promise<void>) {
    throw new Error("Function not implemented.");
}


function afterAll(arg0: () => Promise<void>) {
    throw new Error("Function not implemented.");
}


function expect(arg0: string) {
    throw new Error("Function not implemented.");
}
