const { time } = require('console');
const { Builder, By, Key, until } = require('selenium-webdriver');
const BASE_URL = 'https://frontend-estadia-ja.vercel.app';

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function gerarCPF() {
  let n = 9;
  let n1 = Math.floor(Math.random() * n);
  let n2 = Math.floor(Math.random() * n);
  let n3 = Math.floor(Math.random() * n);
  let n4 = Math.floor(Math.random() * n);
  let n5 = Math.floor(Math.random() * n);
  let n6 = Math.floor(Math.random() * n);
  let n7 = Math.floor(Math.random() * n);
  let n8 = Math.floor(Math.random() * n);
  let n9 = Math.floor(Math.random() * n);
  let d1 =
    n9 * 2 +
    n8 * 3 +
    n7 * 4 +
    n6 * 5 +
    n5 * 6 +
    n4 * 7 +
    n3 * 8 +
    n2 * 9 +
    n1 * 10;
  d1 = 11 - (d1 % 11);
  if (d1 >= 10) d1 = 0;
  let d2 =
    d1 * 2 +
    n9 * 3 +
    n8 * 4 +
    n7 * 5 +
    n6 * 6 +
    n5 * 7 +
    n4 * 8 +
    n3 * 9 +
    n2 * 10 +
    n1 * 11;
  d2 = 11 - (d2 % 11);
  if (d2 >= 10) d2 = 0;
  return `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;
}

async function testeCadastroSucesso() {
  let driver = await new Builder().forBrowser('chrome').build();
  console.log('Iniciando o teste de CADASTRO COM SUCESSO...');

  const timestamp = Date.now();
  const emailUnico = `teste.selenium.${timestamp}@email.com`;
  const cpfUnico = gerarCPF();
  const telefoneUnico = `199${String(timestamp).slice(-8)}`;

  try {
    await driver.get(BASE_URL + '/');

    await driver.wait(
      until.elementLocated(
        By.css('[data-testid="header-signup-link-desktop"]')
      ),
      10000
    );
    await driver
      .findElement(By.css('[data-testid="header-signup-link-desktop"]'))
      .click();

    await driver.wait(
      until.elementLocated(By.css('[data-testid="signup-name-input"]')),
      10000
    );

    await driver
      .findElement(By.css('[data-testid="signup-name-input"]'))
      .sendKeys('Usuário de Teste Selenium');
    await driver
      .findElement(By.css('[data-testid="signup-email-input"]'))
      .sendKeys(emailUnico);
    await driver
      .findElement(By.css('[data-testid="signup-cpf-input"]'))
      .sendKeys(cpfUnico);
    await driver
      .findElement(By.css('[data-testid="signup-phone-input"]'))
      .sendKeys(telefoneUnico);
    await driver
      .findElement(By.css('[data-testid="signup-password-input"]'))
      .sendKeys('SenhaForte123!');

    await driver
      .findElement(By.css('[data-testid="signup-submit-button"]'))
      .click();

    await driver.wait(
      until.elementLocated(
        By.css('[data-testid="header-profile-button-desktop"]')
      ),
      20000
    );

    console.log('-----------------------------------------');
    console.log(
      `TESTE DE CADASTRO SUCESSO... PASSOU! (Usuário: ${emailUnico})`
    );
    console.log('-----------------------------------------');

    console.log('Pausando por 3 segundos para você ver o resultado...');
    await sleep(3000);
  } catch (error) {
    console.error('TESTE DE CADASTRO SUCESSO... FALHOU!', error);
    await sleep(5000);
  } finally {
    await driver.quit();
  }
}

async function testeCadastroFalhaSenha() {
  let driver = await new Builder().forBrowser('chrome').build();
  console.log('Iniciando teste de CADASTRO COM FALHA (Senha Fraca)...');

  try {
    await driver.get(BASE_URL + '/');

    await driver.wait(
      until.elementLocated(
        By.css('[data-testid="header-signup-link-desktop"]')
      ),
      10000
    );
    await driver
      .findElement(By.css('[data-testid="header-signup-link-desktop"]'))
      .click();

    await driver.wait(
      until.elementLocated(By.css('[data-testid="signup-name-input"]')),
      10000
    );

    await driver
      .findElement(By.css('[data-testid="signup-name-input"]'))
      .sendKeys('Teste Falha');
    await driver
      .findElement(By.css('[data-testid="signup-email-input"]'))
      .sendKeys('falha@email.com');
    await driver
      .findElement(By.css('[data-testid="signup-cpf-input"]'))
      .sendKeys('000.000.000-00');
    await driver
      .findElement(By.css('[data-testid="signup-phone-input"]'))
      .sendKeys('(32) 97654-6789');

    let passwordInput = await driver.findElement(
      By.css('[data-testid="signup-password-input"]')
    );
    await passwordInput.sendKeys('123');

    await driver
      .findElement(By.css('[data-testid="signup-submit-button"]'))
      .click();

    await driver.wait(
      until.elementLocated(By.css('[data-testid="signup-password-error"]')),
      10000
    );
    let errorMessage = await driver
      .findElement(By.css('[data-testid="signup-password-error"]'))
      .getText();

    if (errorMessage.includes('8+ dígitos')) {
      console.log('-----------------------------------------');
      console.log(
        'TESTE DE CADASTRO FALHA... PASSOU! (Mensagem de senha fraca exibida)'
      );
      console.log('-----------------------------------------');
    } else {
      throw new Error('Mensagem de erro de senha não foi a esperada.');
    }

    console.log('Pausando por 3 segundos para você ver o resultado...');
    await sleep(3000);
  } catch (error) {
    console.error('TESTE DE CADASTRO FALHA... FALHOU!', error);
    await sleep(5000);
  } finally {
    await driver.quit();
  }
}

(async function rodarTestesCadastro() {
  console.log('Iniciando suíte de testes de CADASTRO...');

  await testeCadastroSucesso();

  await testeCadastroFalhaSenha();

  console.log('Suíte de testes de CADASTRO finalizada.');
})();
