const mineflayer = require('mineflayer');
const { pathfinder, Movements, goals } = require('mineflayer-pathfinder');

const bot = mineflayer.createBot({
  host: 'localhost',
  port: 25565,
  username: 'BotName'
});

bot.loadPlugin(pathfinder);

bot.once('spawn', () => {
  console.log("Бот подключился к серверу!");
  bot.chat("Привет от бота!");
});

bot.on('chat', (username, message) => {
  if (message === 'follow') {
    const player = bot.players[username];
    if (!player || !player.entity) {
      bot.chat("Не вижу тебя!");
      return;
    }
    
    const mcData = require('minecraft-data')(bot.version);
    const defaultMove = new Movements(bot, mcData);
    bot.pathfinder.setMovements(defaultMove);
    
    const goal = new goals.GoalFollow(player.entity, 1);
    bot.pathfinder.setGoal(goal, true);
  }
});