const { Builder, By, Key, until } = require('selenium-webdriver');
const BASE_URL = 'https://frontend-estadia-ja.vercel.app';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getFutureDate = (daysToAdd) => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString().split('T')[0];
};

async function runClientTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  console.log('Iniciando Fluxo Completo de CLIENTE...');

  try {
    await driver.get(BASE_URL + '/');
    console.log('Acessou a Home');
    await sleep(2000);

    await driver.wait(until.elementLocated(By.css('[data-testid="header-login-link-desktop"]')), 50000);
    await driver.findElement(By.css('[data-testid="header-login-link-desktop"]')).click();

    await driver.wait(until.elementLocated(By.css('[data-testid="login-email-input"]')), 50000);
    await driver.findElement(By.css('[data-testid="login-email-input"]')).sendKeys('cabeceira2003@gmail.com');
    await driver.findElement(By.css('[data-testid="login-password-input"]')).sendKeys('SenhaMuitoSegura123!');
    await sleep(1000);
    await driver.findElement(By.css('[data-testid="login-submit-button"]')).click();

    await driver.wait(until.elementLocated(By.css('[data-testid="header-profile-button-desktop"]')), 50000);
    console.log('Login realizado.');
    await sleep(2000);

    await driver.findElement(By.css('[data-testid="header-home-link"]')).click();
    await sleep(3000);

    let firstPropertyCard = await driver.wait(until.elementLocated(By.css('a[data-testid^="listing-card-"]')), 50000);
    await firstPropertyCard.click();
    console.log('Imovel selecionado.');
    await sleep(2000);

    console.log('Aguardando calendario...');
    await driver.wait(until.elementLocated(By.css('[data-testid="booking-calendar-daypicker"]')), 50000);

    const checkInDate = getFutureDate(3);
    const checkOutDate = getFutureDate(6);

    console.log(`Tentando selecionar Check-in: ${checkInDate} e Check-out: ${checkOutDate}`);

    const checkInSelector = By.css(`td[data-day='${checkInDate}'] .rdp-day_button`);
    const checkOutSelector = By.css(`td[data-day='${checkOutDate}'] .rdp-day_button`);

    try {
      let btnCheckIn = await driver.wait(until.elementLocated(checkInSelector), 10000);
      await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", btnCheckIn);
      await sleep(1000);
      await driver.executeScript("arguments[0].click();", btnCheckIn);
      console.log(`Clicou no Check-in (${checkInDate})`);
      await sleep(1500);

      let btnCheckOut = await driver.findElement(checkOutSelector);
      await driver.executeScript("arguments[0].click();", btnCheckOut);
      console.log(`Clicou no Check-out (${checkOutDate})`);
      await sleep(3000);

    } catch (error) {
      console.error("Erro na selecao exata. Tentando fallback...");
      let days = await driver.findElements(By.css('[data-testid="booking-calendar-daypicker"] .rdp-day:not(.rdp-day_disabled):not(.rdp-day_outside) .rdp-day_button'));
      await driver.executeScript("arguments[0].click();", days[2]);
      await sleep(1000);
      await driver.executeScript("arguments[0].click();", days[5]);
      await sleep(3000);
    }

    let reserveButton = await driver.findElement(By.css('[data-testid="booking-calendar-reserve-button"]'));

    if (await reserveButton.isEnabled()) {
      console.log('Botao Reservar habilitado. Clicando...');
      await reserveButton.click();
    } else {
      throw new Error("Botao Reservar continua desabilitado.");
    }

    await driver.wait(until.elementLocated(By.css('[data-testid="confirm-reservation-modal-confirm-button"]')), 30000);
    await sleep(1000);
    await driver.findElement(By.css('[data-testid="confirm-reservation-modal-confirm-button"]')).click();

    await driver.wait(until.elementLocated(By.css('[data-testid="success-modal-close-button"]')), 50000);
    await sleep(1000);
    await driver.findElement(By.css('[data-testid="success-modal-close-button"]')).click();
    console.log('Reserva criada.');
    await sleep(2000);

    await driver.findElement(By.css('[data-testid="header-profile-button-desktop"]')).click();
    await driver.wait(until.elementLocated(By.css('[data-testid="header-profile-dropdown-my-profile-link"]')), 30000);
    await sleep(500);
    await driver.findElement(By.css('[data-testid="header-profile-dropdown-my-profile-link"]')).click();

    await driver.wait(until.elementLocated(By.css('[data-testid="profile-page-container"]')), 50000);
    console.log('Acessou o Perfil.');
    await sleep(3000);

    let payButton = await driver.wait(until.elementLocated(By.xpath("//button[contains(., 'Pagar Reserva')]")), 50000);
    await payButton.click();

    await driver.wait(until.elementLocated(By.css('[data-testid="payment-modal-radio-pix"]')), 30000);
    await sleep(1000);
    await driver.findElement(By.css('[data-testid="payment-modal-radio-pix"]')).click();
    await sleep(500);
    await driver.findElement(By.css('[data-testid="payment-modal-confirm-button"]')).click();

    await driver.wait(until.elementLocated(By.css('[data-testid="success-modal-close-button"]')), 50000);
    await sleep(1000);
    await driver.findElement(By.css('[data-testid="success-modal-close-button"]')).click();
    console.log('Pagamento realizado.');
    await sleep(3000);

    let updateButton = await driver.findElement(By.xpath("//button[contains(., 'Atualizar')]"));
    await updateButton.click();

    await driver.wait(until.elementLocated(By.css('[data-testid="update-reservation-modal-daypicker"]')), 30000);

    const newCheckInDate = getFutureDate(1);
    const newCheckOutDate = getFutureDate(4);
    const updateCheckInSelector = By.css(`td[data-day='${newCheckInDate}'] .rdp-day_button`);
    const updateCheckOutSelector = By.css(`td[data-day='${newCheckOutDate}'] .rdp-day_button`);

    try {
      let btnUpdateIn = await driver.wait(until.elementLocated(updateCheckInSelector), 10000);
      await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", btnUpdateIn);
      await sleep(1000);
      await driver.executeScript("arguments[0].click();", btnUpdateIn);
      await sleep(1000);

      let btnUpdateOut = await driver.findElement(updateCheckOutSelector);
      await driver.executeScript("arguments[0].click();", btnUpdateOut);
      await sleep(2000);

    } catch (error) {
      console.error("Erro na selecao de atualizacao. Tentando fallback...");
      let updateDays = await driver.findElements(By.css('[data-testid="update-reservation-modal-daypicker"] .rdp-day:not(.rdp-day_disabled):not(.rdp-day_outside) .rdp-day_button'));
      await driver.executeScript("arguments[0].click();", updateDays[8]);
      await sleep(1000);
      await driver.executeScript("arguments[0].click();", updateDays[10]);
      await sleep(2000);
    }

    await driver.findElement(By.css('[data-testid="update-reservation-modal-confirm-button"]')).click();

    await driver.wait(until.elementLocated(By.css('[data-testid="success-modal-close-button"]')), 50000);
    await sleep(1000);
    await driver.findElement(By.css('[data-testid="success-modal-close-button"]')).click();
    console.log('Reserva atualizada.');
    await sleep(3000);

    let cancelButton = await driver.findElement(By.xpath("//button[contains(., 'Cancelar')]"));
    await cancelButton.click();

    await driver.wait(until.elementLocated(By.css('[data-testid="confirm-modal-confirm-button"]')), 30000);
    await sleep(1000);
    await driver.findElement(By.css('[data-testid="confirm-modal-confirm-button"]')).click();

    await driver.wait(until.elementLocated(By.css('[data-testid="success-modal-close-button"]')), 50000);
    await sleep(1000);
    await driver.findElement(By.css('[data-testid="success-modal-close-button"]')).click();
    console.log('Reserva cancelada.');

    console.log('CICLO DO CLIENTE COMPLETO COM SUCESSO!');

  } catch (error) {
    console.error('Erro no fluxo do cliente:', error);
    await sleep(50000);
  } finally {
    await driver.quit();
  }
}

runClientTest();