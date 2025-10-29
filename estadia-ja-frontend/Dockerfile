FROM node:20-alpine

# 2. Define o diretório de trabalho dentro do container
WORKDIR /app

# 3. Copia os arquivos de dependência
COPY package.json package-lock.json ./

# 4. Instala as dependências
RUN npm install

# 5. Copia o restante do código-fonte
COPY . .

# 6. Expõe a porta que o Vite usa
EXPOSE 5173

# 7. Comando padrão
CMD ["npm", "run", "dev"]
