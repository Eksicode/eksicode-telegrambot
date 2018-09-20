/**
 * Bu script, eksicode.org telegram grupları üzerinde ki kayıtlı üye sayılarını ölçmek
 * ve ilerde chat vb geliştirmeler için yapılmıştır.
 */

const Telegraf = require('telegraf');
const fs = require('fs');
const bot = new Telegraf(process.env.BOT_TOKEN);
const resultFileName = 'telegram';
let allGroups = [
  {
    name: 'Genel Konular',
    logo: 'material-icons',
    icon: 'chat',
    members: 72,
    link: 'https://t.me/joinchat/G0kqtVFVFl2cWMnmJdUniw',
    channelID: '-1001364530781'
  },
  {
    name: 'JavaScript',
    logo: 'devicon-javascript-plain colored',
    icon: '',
    members: 163,
    link: 'https://t.me/joinchat/G0kqtQ2bMHbsHgiIMKMpyg',
    channelID: '-1001156686363'
  },
  {
    name: 'Python',
    logo: 'devicon-python-plain colored',
    icon: '',
    members: 200,
    link: 'https://t.me/joinchat/G0kqtQ-rkgcsqiPbm4q_6g',
    channelID: '-1001353326048'
  },
  {
    name: 'PHP',
    logo: 'devicon-php-plain colored',
    icon: '',
    members: 28,
    link: 'https://t.me/joinchat/G0kqtUgwV5JmLHug4VBwpA',
    channelID: '-1001211127698'
  },
  {
    name: 'C++',
    logo: 'devicon-cplusplus-plain colored',
    icon: '',
    members: 25,
    link: 'https://t.me/joinchat/G0kqtUgjXMM2jDEysQFTsA',
    channelID: '-1001210277059'
  },
  {
    name: 'C',
    logo: 'devicon-c-plain colored',
    icon: '',
    members: 17,
    link: 'https://t.me/joinchat/G0kqtQ0-rHk9g1v61dUWsA',
    channelID: '-1001277875067'
  },
  {
    name: 'C#',
    logo: 'devicon-csharp-plain colored',
    icon: '',
    members: 18,
    link: 'https://t.me/joinchat/G0kqtU9zTmZKbyCpNqkobA',
    channelID: '-1001332956774'
  },
  {
    name: 'Java',
    logo: 'devicon-java-plain colored',
    icon: '',
    members: 15,
    link: 'https://t.me/joinchat/G0kqtVLK6GPjF1BrtzJQlg',
    channelID: '-1001389029475'
  },
  {
    name: 'Ruby',
    logo: 'devicon-ruby-plain colored',
    icon: '',
    members: 2,
    link: 'https://t.me/joinchat/G0kqtRIEXv8_XPZVygG1ZQ',
    channelID: '-1001369784092'
  },
  {
    name: 'DevOps',
    logo: 'devicon-debian-plain colored',
    icon: '',
    members: 15,
    link: 'https://t.me/joinchat/G0kqtUoWMoxyIXb7u2vhlg',
    channelID: '-1001242968716'
  },
  {
    name: 'Veri Bilimi',
    logo: 'material-icons',
    icon: 'blur_on',
    members: 24,
    link: 'https://t.me/joinchat/G0kqtU8wTomSdNKA2EO-0Q',
    channelID: '-1001328565897'
  },
  {
    name: 'Matematik',
    logo: 'material-icons',
    icon: 'functions',
    members: 2,
    link: 'https://t.me/joinchat/G0kqtUUj8nBxHk2OfnDTNg',
    channelID: '-1001159983728'
  },
  {
    name: 'İngilizce',
    logo: 'material-icons',
    icon: 'school',
    members: 63,
    link: 'https://t.me/joinchat/G0kqtRGgWUViQ7fZzA93UQ',
    channelID: '-1001263722948'
  }
];

let groupCounts = allGroups.length;
while (groupCounts--) {
  let channel = allGroups[groupCounts];
  (async channel => {
    await bot.telegram
      .getChatMembersCount(channel.channelID)
      .then(data => (channel.members = data))
      .catch(err => console.log(`${channel.name} için data çekilemedi.`));
  })(channel);
  delete channel.channelID;
}
allGroups = JSON.stringify(allGroups);
fs.writeFile(`./${resultFileName}.json`, allGroups, function(err) {
  if (err) console.log('Dosya yazdırılamadı');
  console.log(`${resultFileName}.json dosyasına kayıt edildi.`);
});
