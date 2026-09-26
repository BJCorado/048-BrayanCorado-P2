import { Page, Locator, expect } from '@playwright/test';

export type MenuModule = 'PIM' | 'Leave' | 'Directory';

const modulePaths: Record<MenuModule, string> = {
  PIM: '/web/index.php/pim/viewEmployeeList',
  Leave: '/web/index.php/leave/viewLeaveList',
  Directory: '/web/index.php/directory/viewDirectory',
};

export class DashboardPage {
  readonly page: Page;
  readonly dashboardHeading: Locator;
  readonly assignLeaveButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.dashboardHeading = page.getByRole('heading', { name: 'Dashboard', exact: true });
    this.assignLeaveButton = page.getByRole('button', { name: 'Assign Leave', exact: true });
  }

  async navigateToModule(module: MenuModule) {
    await this.page.getByRole('link', { name: module, exact: true }).click();
  }

  async expectDashboard() {
    await expect(this.dashboardHeading).toBeVisible();
    await expect(this.page).toHaveURL(/\/web\/index\.php\/dashboard\/index$/);
  }

  async expectQuickLaunchVisible() {
    await expect(this.assignLeaveButton).toBeVisible();
  }

  async expectModuleOpened(module: MenuModule) {
    await expect(this.page).toHaveURL(new RegExp(`${modulePaths[module]}$`));
  }
}