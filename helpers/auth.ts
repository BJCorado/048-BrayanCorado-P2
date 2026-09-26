import { Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

export async function loginAs(page: Page) {
  const loginPage = new LoginPage(page);
  await loginPage.navigate();
  await loginPage.login('Admin', 'admin123');
}