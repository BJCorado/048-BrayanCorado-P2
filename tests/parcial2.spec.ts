import { test } from '../fixtures';
import { MenuModule } from '../pages/DashboardPage';

test.describe('Autenticación y menú de OrangeHRM', () => {
  test('test-1 Login exitoso', async ({ loginPage, dashboardPage }) => {
    await loginPage.navigate();
    await loginPage.login('Admin', 'admin123');
    await dashboardPage.expectDashboard();
  });

  test('test-2Login con credenciales inválidas', async ({ loginPage }) => {
    await loginPage.navigate();
    await loginPage.login('usuario_invalido', 'clave_invalida');
    await loginPage.expectInvalidCredentials();
  });

  test('test4- libre muestra las acciones de acceso rápido en el dashboard', async ({ authenticatedDashboard }) => {
    await authenticatedDashboard.expectDashboard();
    await authenticatedDashboard.expectQuickLaunchVisible();
  });

  const modulos: MenuModule[] = ['PIM', 'Leave', 'Directory'];

  for (const modulo of modulos) {
    test(`test-3 navega al módulo ${modulo} desde el menú lateral`, async ({ authenticatedDashboard }) => {
      await authenticatedDashboard.navigateToModule(modulo);
      await authenticatedDashboard.expectModuleOpened(modulo);
    });
  }
});