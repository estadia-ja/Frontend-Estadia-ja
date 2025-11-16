// e2e/login.test.js

const { Builder, By, Key, until } = require('selenium-webdriver');
const BASE_URL = 'https://frontend-estadia-ja.vercel.app';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function testeLoginSucesso() {
  let driver = await new Builder().forBrowser('chrome').build();
  console.log('Iniciando teste de LOGIN COM SUCESSO...');

  try {
    await driver.get(BASE_URL + '/');

    await driver.wait(until.elementLocated(By.css('[data-testid="header-login-link-desktop"]')), 10000);
    
    await driver.findElement(By.css('[data-testid="header-login-link-desktop"]')).click();

    await driver.wait(until.elementLocated(By.css('[data-testid="login-email-input"]')), 10000);

    let emailInput = await driver.findElement(By.css('[data-testid="login-email-input"]'));
    let passwordInput = await driver.findElement(By.css('[data-testid="login-password-input"]'));
    let submitButton = await driver.findElement(By.css('[data-testid="login-submit-button"]'));

    await emailInput.sendKeys('joao.silva@email.com');
    await passwordInput.sendKeys('SenhaSegura123');
    await submitButton.click();

    await driver.wait(until.elementLocated(By.css('[data-testid="header-profile-button-desktop"]')), 10000);
    
    console.log('-----------------------------------------');
    console.log('TESTE DE LOGIN COM SUCESSO... PASSOU!');
    console.log('-----------------------------------------');

    console.log('Pausando por 3 segundos para você ver o resultado...');

  } catch (error) {
    console.error('TESTE DE LOGIN COM SUCESSO... FALHOU!', error);
    await sleep(5000);
  } finally {
    await driver.quit();
  }
} 


async function testeLoginFalha() {
  let driver = await new Builder().forBrowser('chrome').build();
  console.log('Iniciando teste de LOGIN COM FALHA...');

  try {
    await driver.get(BASE_URL + '/');
    
    await driver.wait(until.elementLocated(By.css('[data-testid="header-login-link-desktop"]')), 10000);
    await driver.findElement(By.css('[data-testid="header-login-link-desktop"]')).click();

    await driver.wait(until.elementLocated(By.css('[data-testid="login-email-input"]')), 10000);

    let emailInput = await driver.findElement(By.css('[data-testid="login-email-input"]'));
    let passwordInput = await driver.findElement(By.css('[data-testid="login-password-input"]'));
    let submitButton = await driver.findElement(By.css('[data-testid="login-submit-button"]'));

    await emailInput.sendKeys('joao.silva@email.com');
    await passwordInput.sendKeys('senha-com-certeza-errada');
    await submitButton.click();

    await driver.wait(until.elementLocated(By.css('[data-testid="login-api-message"]')), 10000);
    let errorMessage = await driver.findElement(By.css('[data-testid="login-api-message"]')).getText();
    
    if (errorMessage.includes('Email ou senha inválidos')) {
      console.log('-----------------------------------------');
      console.log('TESTE DE LOGIN COM FALHA... PASSOU! (Mensagem de erro exibida)');
      console.log('-----------------------------------------');
    } else {
      throw new Error('Mensagem de erro não foi a esperada.');
    }

    console.log('Pausando por 3 segundos para você ver o resultado...');
    await sleep(3000); 

  } catch (error) {
    console.error('TESTE DE LOGIN COM FALHA... FALHOU!', error);
    await sleep(5000);
  } finally {
    await driver.quit();
  }
}

(async function rodarTestes() {
  console.log('Iniciando suíte de testes E2E...');
  
  await testeLoginSucesso();
  
  await testeLoginFalha();
  
  console.log('Suíte de testes E2E finalizada.');
})();