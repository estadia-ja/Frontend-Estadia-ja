const { Builder, By, Key, until } = require('selenium-webdriver');
const path = require('path');
const BASE_URL = 'https://frontend-estadia-ja.vercel.app';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const getFutureDate = (daysToAdd) => {
  const date = new Date();
  date.setDate(date.getDate() + daysToAdd);
  return date.toISOString().split('T')[0];
};

async function runOwnerTest() {
  let driver = await new Builder().forBrowser('chrome').build();
  console.log('Iniciando Fluxo Completo de PROPRIETARIO...');

  const nomeImovel = `Casa Teste ${Date.now()}`;

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

    await driver.findElement(By.css('[data-testid="header-profile-button-desktop"]')).click();
    await driver.wait(until.elementLocated(By.css('[data-testid="header-profile-dropdown-my-profile-link"]')), 30000);
    await sleep(1000);
    await driver.findElement(By.css('[data-testid="header-profile-dropdown-my-profile-link"]')).click();
    
    await driver.wait(until.elementLocated(By.css('[data-testid="profile-page-container"]')), 50000);
    console.log('Acessou o Perfil.');
    await sleep(3000);

    let createBtn;
    try {
        createBtn = await driver.findElement(By.css('[data-testid="my-properties-add-new-link"]'));
    } catch (e) {
        createBtn = await driver.findElement(By.css('[data-testid="become-owner-link-button"]'));
    }
    await createBtn.click();

    await driver.wait(until.elementLocated(By.css('[data-testid="new-property-form"]')), 50000);
    
    await driver.findElement(By.xpath("//label[contains(text(), 'Tipo')]/..//input")).sendKeys(nomeImovel);
    await driver.findElement(By.xpath("//label[contains(text(), 'Valor')]/..//input")).sendKeys('250');
    await driver.findElement(By.xpath("//label[contains(text(), 'Rua')]/..//input")).sendKeys('Rua Teste');
    await driver.findElement(By.xpath("//label[contains(text(), 'Número')]/..//input")).sendKeys('100');
    await driver.findElement(By.xpath("//label[contains(text(), 'Bairro')]/..//input")).sendKeys('Centro');
    await driver.findElement(By.xpath("//label[contains(text(), 'Cidade')]/..//input")).sendKeys('São Paulo');
    await driver.findElement(By.xpath("//label[contains(text(), 'Estado')]/..//input")).sendKeys('SP');
    await driver.findElement(By.xpath("//label[contains(text(), 'CEP')]/..//input")).sendKeys('01001-000');
    await driver.findElement(By.css('[data-testid="form-textarea-description"]')).sendKeys('Um lugar muito bom para toda a sua família');

    const imagePath = path.resolve(__dirname, 'teste.jpg'); 
    await driver.findElement(By.css('[data-testid="form-image-upload-input"]')).sendKeys(imagePath);
    await sleep(3000);

    await driver.findElement(By.css('[data-testid="new-property-submit-button"]')).click();
    console.log('Cadastro enviado.');
    
    await driver.wait(until.elementLocated(By.css('[data-testid="profile-page-container"]')), 50000);
    await sleep(4000); 

    let pageSource = await driver.getPageSource();
    if(!pageSource.includes(nomeImovel)) throw new Error("Imovel nao apareceu na lista!");
    console.log('Imovel encontrado na lista.');

    let editButton = await driver.findElement(By.xpath(`//h3[contains(text(), '${nomeImovel}')]/ancestor::div[contains(@class, 'rounded-lg')]//button[contains(., 'Editar')]`));
    await editButton.click();

    await driver.wait(until.elementLocated(By.css('[data-testid="update-property-form"]')), 50000);
    let priceInput = await driver.findElement(By.xpath("//label[contains(text(), 'Valor')]/..//input"));
    await priceInput.clear();
    await priceInput.sendKeys('999');
    await sleep(2000);
    
    await driver.findElement(By.css('[data-testid="update-property-submit-button"]')).click();
    await driver.wait(until.elementLocated(By.css('[data-testid="profile-page-container"]')), 50000);
    console.log('Imovel editado.');
    await sleep(4000);

    await driver.findElement(By.css('[data-testid="header-home-link"]')).click();
    await sleep(4000);
    
    let propertyCard = await driver.wait(until.elementLocated(By.xpath(`//h3[contains(text(), '${nomeImovel}')]/ancestor::a`)), 50000);
    await driver.executeScript("arguments[0].scrollIntoView({block: 'center'});", propertyCard);
    await sleep(1000);
    await propertyCard.click();
    console.log('Clicou no imovel na Home.');

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
        await reserveButton.click();
    } else {
        throw new Error("Botao Reservar continua desabilitado.");
    }

    await driver.wait(until.elementLocated(By.css('[data-testid="confirm-reservation-modal-confirm-button"]')), 30000);
    await sleep(2000);
    await driver.findElement(By.css('[data-testid="confirm-reservation-modal-confirm-button"]')).click();

    await driver.wait(until.elementLocated(By.css('[data-testid="error-modal-message"]')), 50000);
    let errorMsg = await driver.findElement(By.css('[data-testid="error-modal-message"]')).getText();
    console.log(`Mensagem de erro esperada recebida: "${errorMsg}"`);
    
    await sleep(5000);
    await driver.findElement(By.css('[data-testid="error-modal-close-button"]')).click();
    await sleep(2000);

    await driver.findElement(By.css('[data-testid="header-profile-button-desktop"]')).click();
    await driver.wait(until.elementLocated(By.css('[data-testid="header-profile-dropdown-my-profile-link"]')), 30000);
    await sleep(1000);
    await driver.findElement(By.css('[data-testid="header-profile-dropdown-my-profile-link"]')).click();
    await driver.wait(until.elementLocated(By.css('[data-testid="profile-page-container"]')), 50000);

    let deleteButton = await driver.findElement(By.xpath(`//h3[contains(text(), '${nomeImovel}')]/ancestor::div[contains(@class, 'rounded-lg')]//button[contains(., 'Deletar')]`));
    await deleteButton.click();

    await driver.wait(until.elementLocated(By.css('[data-testid="confirm-modal-confirm-button"]')), 30000);
    await sleep(2000);
    await driver.findElement(By.css('[data-testid="confirm-modal-confirm-button"]')).click();
    
    await driver.wait(until.elementLocated(By.css('[data-testid="success-modal-close-button"]')), 50000);
    
    await sleep(5000);
    
    await driver.findElement(By.css('[data-testid="success-modal-close-button"]')).click();
    console.log('Imovel deletado.');

    console.log('CICLO DO PROPRIETARIO COMPLETO COM SUCESSO!');

  } catch (error) {
    console.error('Erro no fluxo do proprietario:', error);
    await sleep(50000);
  } finally {
    await driver.quit();
  }
}

runOwnerTest();