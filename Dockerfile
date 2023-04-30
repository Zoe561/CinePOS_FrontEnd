# 基於官方的 Node.js 16 映像檔建立映像檔
FROM node:16.20.0

# 安裝 Angular CLI
RUN npm install @angular/cli@14.2.0

# 將當前目錄內容複製到容器內的 /app 目錄
COPY . /app

# 設定容器的工作目錄為 /app
WORKDIR /app

# 執行指令安裝相依套件
RUN npm install

# 執行指令建立 production 環境的專案 build
RUN npm run build:patch

# 設定容器對外的埠號
EXPOSE 4200

# 設定容器的啟動指令，即執行 ng serve 指令
CMD ["npm", "run", "start"]