const express = require('express');
const bodyParser = require('body-parser');
const { Telegraf } = require('telegraf');

const app = express();
app.use(bodyParser.json());

// Replace with your Telegram bot token
const botToken = '6178309099:AAE1RbyOq2eGMwwe2eQyoeCcbLhObhzeDf8';
const bot = new Telegraf(botToken);

// Replace with your Telegram channel chatId
const chatId = '391257505';

app.post('/webhook', (req, res) => {
  const resource = req.header('Sentry-Hook-Resource');
  const action = req.body.action;
  const issue = req.body.issue;

  if (resource === 'issue') {
    const message = `Issue ${action}: ${issue.web_url}\nProject: ${issue.project_url}`;
    bot.telegram.sendMessage(chatId, message);
  }

  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});