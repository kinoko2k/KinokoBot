const Discord = require('discord.js');
const client = new Discord.Client({
  disableMentions: 'everyone' // BOTがeveryoneメンションしないようにする
})
const http = require("http");
const token = 'TOKEN';
const fetch = require('node-fetch')
const settings = {
  prefix: 'k!',
  token: 'TOKEN'
};
const prefix = 'k!'

client.on('ready', () => {
    console.log('ログイン成功');
});

client.on('message', async message => {
  if (message.content.startsWith('!ban') && message.guild) {
    if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send('BANする権限がありません')
    if (message.mentions.members.size !== 1) return message.channel.send('BANするメンバーを1人指定してください')
    const member = message.mentions.members.first()
    if (!member.bannable) return message.channel.send('このユーザーをBANすることができません')
         
    await member.ban()
         
    message.channel.send(`${member.user.tag} をBANしました`)
  }
})



const { inspect } = require("util");
client.on("message", async message => {
  const args = message.content.split(" ").slice(1);

  if (message.content.startsWith("k!run")) {
    
    if (message.author.id !== "BOT管理者ID")
      return message.channel.send("このコマンドは管理者しか使えないよぉ〜えっ？使えると思ったの！？\nお前ごときじゃ無理だよwww");
    try {
      const code = args.join(" ");
      let evaled = eval(code);

      if (typeof evaled !== "string") evaled = require("util").inspect(evaled);

      message.channel.send(inspect(evaled), { code: "xl" });
    } catch (err) {
      message.channel.send({
        embed: {
          title: "実行エラー",
          description: "エラー内容:\n\`\`\`xl\n" + inspect(err) + "\`\`\`",
          color: 961818,
          timestamp: new Date(),
          footer: {
            icon_url: client.user.avatarURL,
            text: "(ノ・ω・)ノオオオォォォ-"
          }
        }
      });
    } //`\`エラー\nエラー内容:\` \`\`\`xl\n${inspect(err)}\n\`\`\``
  }
});

// const fetch = require("node-fetch");
client.on("message", async message => {
 const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
if  (command === "link") {
    try {
  const url = args[0];
    if (!url) return message.channel.send("エラー : URLを指定して下さい。")
 fetch(`https://safeweb.norton.com/report/show?url=${encodeURI(url)}&ulang=jpn`).then(res => res.text()).then(norton => {
     if (norton.indexOf("安全性") != -1) {
  message.channel.send({embed: {
                title: "結果は安全です。",
                description: `ノートン セーフウェブが ${url} を分析して安全性とセキュリティの問題を調べました。`,
                footer: {
                    text: "Powered by Norton Safeweb"
                },
                color: 0xffd700
                }})
         } else if (norton.indexOf("［注意］") != -1) {
          message.channel.send({embed: {
                title: "結果は注意です。",
                description: `［注意］の評価を受けた Web サイトは少数の脅威または迷惑を伴いますが、赤色の［警告］に相当するほど危険とは見なされません。サイトにアクセスする場合には注意が必要です。`,
                    footer: {
                    text: "Powered by Norton Safeweb"
                },
                color: 0xffd700
                }})
         } else if (norton.indexOf("警告[危ないぞ]") != -1) {
           message.channel.send({embed: {
                title: "結果は警告です。",
                description: `これは既知の危険な Web ページです。このページを表示**しない**ことを推奨します。`,
                    footer: {
                    text: "Powered by Norton Safeweb"
                },
                color: 0xffd700
                }})
         } else {
              message.channel.send({embed: {
                title: "結果は未評価です。",
                description: `このサイトはまだ評価されていません。`,
                    footer: {
                    text: "Powered by Norton Safeweb"
                },
                color: 0xffd700
                }})
         }
        });
    } catch (err) {
        message.channel.send("エラー : 解析中にエラーが発生しました。" + err)
    }
}
});

client.on('guildMemberAdd', (member, guild) => {
  const channel = member.guild.channels.cache.get("CHID");
  if (!channel) return;
  channel.send(`**参加** ${member.user.tag}(${member.user.id})さんが参加しました！<:wa:790549773567787038>`);
});

client.on('guildMemberRemove', (member, guild) => {
  const channel = member.guild.channels.cache.get("CHID");
  if (!channel) return;
  channel.send(`**退出** ${member.user.tag}(${member.user.id})さんが退出しました。`);
});

var isgd = require("isgd");
client.on("message", async (message) => {
  if (message.content.startsWith("k!shorturl")) {
    //コマンドを設定してください
    const aarsd = message.content.split(" ").slice(1).join(" ")
if (!aarsd) return message.channel.send("空白がないまたは入力されていません")
    isgd.shorten(aarsd, function (res) {
      message.channel.send(res);
    });
  }
});

const yts = require( 'yt-search' )//yt-searchを読み込む



client.on('message', async message => {
  if (message.content.match(/k!slow/)) { // slow
    if (!message.member.hasPermission('MANAGE_CHANNELS')) return message.channel.send('<:kiken:812497914168475678>権限がありません')
    let slow = message.content;
    slow = slow.replace(/k!slow /g, "");
    message.channel.setRateLimitPerUser(slow)
    message.channel.send('低速モードを' + slow + '秒に設定しました。')
    }
});

client.on('message', async message => {
  if (message.content.match(/k!twitter/)) { // slow
    let twitter = message.content;
    twitter = twitter.replace(/k!twitter /g, "");
    message.channel.setRateLimitPerUser(twitter)
    message.channel.send(`https://twitter.com/${twitter}`)
    }
});




///
client.once('ready', () => console.log('READY'))

client.on('message', message => {
  const URL_PATTERN = /http(?:s)?:\/\/(?:.*)?discord(?:app)?\.com\/channels\/(?:\d{17,19})\/(?<channelId>\d{17,19})\/(?<messageId>\d{17,19})/g
  let result

  while ((result = URL_PATTERN.exec(message.content)) !== null) {
    const group = result.groups

    client.channels.fetch(group.channelId)
      .then(channel => channel.messages.fetch(group.messageId))
      .then(targetMessage => message.channel.send(targetMessage.cleanContent, [ ...targetMessage.attachments.values(), ...targetMessage.embeds ] + "\n" + URL_PATTERN))
      .catch(error => message.reply(error)
        .then(message => message.delete({ timeout: 10000 }))
        .catch(console.error)
      )
  }
})
///
client.on('message', async message => {
  if (message.author.bot) return;
  if (message.content.match(/k!say/)) { // slow
    if (message.author.id === "信用ID") return message.channel.send("使用権限がありません。");
    let say = message.content;
    say = say.replace(/k!say /g, "");
    message.channel.setRateLimitPerUser(say)
    message.delete();
    message.channel.send(say + "\nby " + message.author.tag)
    console.log(say + "\nby " + message.author.tag)
    }
});

client.on('message', async message => {
  if (message.content.match(/k!owo/)) { // slow
    message.channel.send(`<:think:791638697044475935><:think:791638697044475935><:think:791638697044475935><:think:791638697044475935><:think:791638697044475935><:think:791638697044475935>`)
    }
});


client.on("guildCreate", guild => {
  client.channels.cache.get("ID").send({
    embed: {
      title: "サーバー参加ログ",
      color: 7506394,
      timestamp: new Date(),
      footer: {
        icon_url: client.user.avatarURL,
        text: "[k!][k/]きのこBOT-参加ログ"
      },
      thumbnail: {
        url:
          ""
      },
      fields: [
        {
          name: "サーバー名/サーバーID",
          value: `${guild.name}server | (ID:${guild.id})`
        },
        {
          name: "オーナー名/ownerID",
          value: `${client.users.cache.get.name} | (ID:${guild.ownerID})`
        }
      ]
    }
  });
});


client.on("message", async message => {
  if (message.content === "k!restart") {
    if (message.author.id != AdminID) return;
   message.channel.send("再起動を実行しました。");
   client.destroy();
   client.login("TOKEN"); 
  }
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith("k!")) return;
  const args = message.content
     .slice(2)
     .trim()
     .split(/ +/g);
   const command = args.shift().toLowerCase();
  if (command === "gsend1") 
 try {
   var [title,message1,message2,message3] = args;
  if (!title || !message1) return message.channel.send("エラー : 引数が不正です。");
  if (!message2) {message2 = ""}
  if (!message3) {message3 = ""}
 const m = await message.channel.send("送信しています...");
  client.channels.cache.forEach(ch => {
   if (ch.name === "kinoko-global") {
    ch.send({embed: {
     title: title,
     description: message1 + message2 + message3,
     color:0xff0000
    }});
  m.edit("送信が完了しました。");
  }
  });
 } catch(err) {
  message.channel.send("エラー : 実行中にエラーが発生しました。\nエラー内容:" + err);
 }
  }
);


///

 client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.content.startsWith("k!")) return;
  const args = message.content
     .slice(2)
     .trim()
     .split(/ +/g);
   const command = args.shift().toLowerCase();
  if (command === "gsend2") {
 try {
   var [title,message1,message2,message3] = args;
  if (!title || !message1) return message.channel.send("エラー : 引数が不正です。");
  if (!message2) {message2 = ""}
  if (!message3) {message3 = ""}
 const m = await message.channel.send("送信しています...");
  client.channels.cache.forEach(ch => {
   if (ch.name === "kinoko-global") {
    ch.send({embed: {
     title: title,
     description: message1 + message2 + message3,
     color:15844367
    }});
  m.edit("送信が完了しました。");
  }
  });
 } catch(err) {
  message.channel.send("エラー : 実行中にエラーが発生しました。\nエラー内容:" + err);
 }
  }
 });

client.on("message", async message => {
  if (!message.content.startsWith(prefix)) return; //ボットのプレフィックスからメッセージが始まっているか確認
  const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
  const command = args.shift().toLowerCase();
  if (message.content.match("http")) return;
  if (command === "count") {
    const moment = require('moment');
    let userinfoget = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.member(message.author)
    message.delete();
    const period = Math.round(
      (Date.now() - message.member.joinedAt) / 86400000
    );
    const created = Math.round(
      (Date.now() - message.member.user.createdAt) / 86400000
    );
    message.reply(
      `は約**${created}**日間Discordをしていて\n約**${period}**日間**${message.member.guild.name}**に参加していました(k!user [ID])\n` +  moment(userinfoget.joinedAt).format('yyyy年MM月DD日 A HH:mm:ss ')
    );
  }
      });
    

client.on('message', async message => {
  if (message.content.match(/^kt!user/)) { // ここはなんでもいい
    try {
      let naiyou = message.content.replace(/kt!user /g, "");
    if(!naiyou) return message.channel.send("エラー : IDが指定されていません。");
    let usernaiyou = await client.users.fetch(id);
    let bot = usernaiyou.bot;
    message.channel.send(bot);
     } catch(err) {
message.channel.send("エラー : ユーザーが見つかりませんでした。");
     }
    }
});

client.on("message", async message =>{
  if (message.content === "k!serverlist") {
    if(message.author.id === "ID") return message.channel.send("あなたはBOT管理者ではありません");
    // ↓ここに指定した文字列がボットの発言になる
    let serverlist = client.guilds.cache.map(a => a.name);
          const aaa = await message.channel.send(serverlist);
          message.channel.send('server数' + "**" + client.guilds.cache.size + "**")
  }

})

client.on('message', message => {
    if (message.content === 'k!ping') {
      message.channel.send(`Ping を確認しています...`)
      .then((pingcheck) => pingcheck.edit(`botの速度|${pingcheck.createdTimestamp - message.createdTimestamp} ms`))
      
    }
})
client.on('message', async message => { // +
    if (!message.content.startsWith(prefix)) return
    const [command, ...args] = message.content.slice(prefix.length).split(' ')
    if (command === 'add') {
      const [a, b] = args.map(str => Number(str))
      message.channel.send(`${a} + ${b} = ${a + b}`)
    }
})

client.on('message', async message => {
    if (!message.content.startsWith(prefix)) return
    const [command, ...args] = message.content.slice(prefix.length).split(' ')
    if (command === "poll") {
      message.delete();
      const [title, ...choices] = args;
      if (!title) return message.channel.send("タイトルを指定してください");
      const emojis = [
        "🇦","🇧","🇨","🇩","🇪","🇫","🇬","🇭","🇮","🇯","🇰","🇱","🇲","🇳","🇴","🇵","🇶","🇷","🇸","🇹"
      ];
      if (choices.length < 2 || choices.length > emojis.length)
        return message.channel.send(
          `選択肢は2から${emojis.length}つを指定してください`
        );
      const poll = await message.channel.send({
        embed: {
          color: 0x7ef5bb,
          title: title,
          description: choices.map((c, i) => `${emojis[i]} ${c}`).join("\n"),
          footer: {
            text: message.author.icon + "この人がコマンドを打った人だよ〜：" + message.author.username + "(" + message.author.id + ")"
          }
        }
      });
      emojis.slice(0, choices.length).forEach(emoji => poll.react(emoji));
    }
    }
)

client.on('message', async message => {
    if (message.content === 'k!banlist' && message.guild) {
      const bans = await message.guild.fetchBans()
      message.channel.send(bans.map(ban => ban.user.tag).join(', ') || 'none')
    }
})

client.on('message', message => {
    if (!message.content.startsWith(prefix)) return
    const [command, ...args] = message.content.slice(prefix.length).split(' ')
  
    if (command === 'timer') {
      // 引数から待ち時間を取り出す
      const seconds = Number(args[0])
      message.channel.send(`タイマーを${seconds}秒に設定しました。`)
      setTimeout(() => {
        message.reply(`${seconds}秒経ちました`)
      }, seconds * 1000) // setTimeoutに指定するのはミリ秒なので秒数に1000を掛ける
    }
});
 



client.on('message', message =>{
  if (message.author.id == client.user.id || message.author.bot){
    return;
  }
  //ぴえんの例
  if (message.content.match(/🤔/)) {
    let react = '🤔';
    message.react(react)
      .then(message => console.log("リアクション: 🤔"))
      .catch(console.error);
  }
  if (message.content.match(/🥺/)) {
    let react = '🥺';
    message.react(react)
      .then(message => console.log("リアクション: 🥺"))
      .catch(console.error);
    }
});
client.on("message", message => {
  if (message.content === "k!help" && message.guild) {
  message.channel.send({
          embed: {
            title: "ヘルプ画面",
            description:
              "`k!help <コマンド名>`コマンドの情報を手に入れることができます。(未実装)",
            color: 7506394,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: ""
            },
            thumbnail: {
              url:
                ""
            },
            fields: [
              {
                name: ":one:便利機能",
                value: "`k!clear`,`k!invite`,`k!poll`,`k!yt-serach`.`k!shorturl`,`k!url`"
              },
              {
                name: ":two:その他の機能",
                value: "`k!botinfo`,`k!ping`,`k!setumei`,`k!serverinfo`,`k!user`,`k!status`"
              },
              {
                name: ":three:グローバルチャット",
                value: "`k!global_setup`"
              },
              {
                name: ":four:遊び",
                value: "`k!uranai`,`k!coin`,`k!dice`,`k!play`"
              },
              {
                name: ":five:vc系",
                value: "`k!play`,`k/join`,`k/leave`,`k/rejoin`"
              },
              {
                name: "サーバー管理系コマンド",
                value: "`k!kick`,`k!ban`,`k!slow`"
              },
              {
                name: "コマンド以外の機能一覧",
                value: "**!d bumpお知らせ機能**\n!d bumpをしたあとに、教えてくれます。"
              },
              {
                name: "問い合わせ",
                value: "~~!report <report内容>~~ "
              },
              {
                name: "links",
                value:
                  '[<:discord:808681678951284737>サポートサーバー]()\n[📥サーバーへ導入]()\n[<:twitter:808681706865164289>公式きのこbotTwitter]()'
              }
            ]
          }
});
}
});
client.on("message", message => {
  if (message.content === "k!serverinfo" && message.guild) {
  message.channel.send({
          embed: {
            title: message.guild.name + 'サーバー情報',
            description:
              "コマンド",
            color: 7506394,
            timestamp: new Date(),
            footer: {
              icon_url: message.guild.icon_url,
              text: "Created by kinoko"
            },
            thumbnail: message.guild.icon,
            fields: [
              {
                name: "サーバー名",
                value: message.guild.name 
              },
              {
                name: "サーバーID",
                value: message.guild.id
              },
              {
                name: "サーバー人数",
                value: message.guild.memberCount + '人'
              },
              {
                name: "サーバーアイコンURL",
                value: '```' + message.guild.icon_url + '```'
              },
              {
                name: "serverboostについて",
                value: message.guild.premiumSubscriptionCount  + '\n' + message.guild.premiumTier 
              }
            ]
          }
});
}
});  


client.on("message", message => {
  if (message.content === "k!botinfo" && message.guild) {
  message.channel.send({
          embed: {
            title: "きのこBOTについて",
            color: 15105570,//embedの色
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "k!botinfo"
            },
            fields: [
            {
              name: "開発者",
              value: "[きのこ#3227](https://twitter.com/kinoko1216)",
              inline: true
            },
            {
              name: "副開発者",
              value: "[Piyo_chan#5566](),[Lloyd#6137](https://twitter.com/lloyd_6137)",
              inline: true
            },
            {
              name: "公式サポートサーバー(困ったときの助け鯖)",
              value: "",
              inline: true
            },
            {
              name: "サーバー数",
              value: client.guilds.cache.size + "サーバー",
              inline: true
            },
            {
              name: "全体ユーザー数",
              value: client.guilds.cache.map(guild => guild.memberCount).reduce((p, c) => p + c) + "人" ,
              inline: true
            },
            {
              name: "提携サーバー",
              value: ":one:---[きのこのサーバー](https://discord.gg/aMVP4kNm49)",
              inline: true
            },
            {
              name: "スペシャルサンクス",
              value: "[Lloyd#6137さん](https://twitter.com/lloyd_6137)ときのこBOTを入れてくださってる鯖主及び運営さん",
              inline: true
            },
            {
              name: "目標サーバーまで level8",
              value: "🟦🟦🟦🟦🟦🟦◽◽◽◽◽\n現在81サーバー",
              inline: true
            },
            ]
          }
  });
  }
}); 



client.on('message',message=>{
  if (message.content.match(/!sonnnakomanndonaide/)) { // 下ネタ言ったら反応する
    message.channel.send('そんなコマンドないで。'); // 反応される方
 }
 })
client.on('message',message=>{
 if (message.content.match(/そんなコマンドないで。/)) {
    }
});
//占い
client.on('message', message => {
  if(message.content === 'k!uranai'){
  var array = ["凶　えぇ、、、", "小吉　まあ、がんば", "中吉　普通で草", "吉　おめでと。", "大吉　おめでと。"];
  message.channel.send({
    embed: {
      description: array[Math.floor(Math.random() * array.length)],
      color: 16757683,
    }
  })
  console.log(array[Math.floor(Math.random() * array.length)]);
  }
})

//コインゲーム
client.on('message', message => {
  if(message.content === 'k!coin'){
  var array = ["📀表だよ！　君の勝ち！おめでとう🎉🎉🎉", "💿裏だよ...　君の負け...残念😭"];
  message.channel.send({
    embed: {
      description: array[Math.floor(Math.random() * array.length)],
      color: 16757683,
    }
  })
  console.log(array[Math.floor(Math.random() * array.length)]);
  }
})
//コインゲーム
client.on('message', message => {
  if(message.content === 'k!dice'){
    var array = ["**1**ですよ", "**2**ですよ", "**3**ですよ", "**4**ですよ", "**5**ですよ","**6**ですよ",];
  message.channel.send({
    embed: {
      description: array[Math.floor(Math.random() * array.length)],
      color: 16757683,
    }
  })
  console.log(array[Math.floor(Math.random() * array.length)]);
  }
})
client.on('message', message => {
  if(message.content === 'k!uranai'){
    var array = ["**1**ですよ", "**2**ですよ", "**3**ですよ", "**4**ですよ", "**5**ですよ","**6**ですよ",];
  message.channel.send({
    embed: {
      description: array[Math.floor(Math.random() * array.length)],
      color: 16757683,
    }
  })
  console.log(array[Math.floor(Math.random() * array.length)]);
  }
})
client.on("message", message => {
  if (message.content === "k!invite" && message.guild) {
  message.channel.send({
          embed: {
            title: "招待リンク",
            color: 7506394,
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "Created by kinoko"
            },
            thumbnail: {
              url:
                ""
            },
            fields: [
              {
                name: "BOTの招待はこちら",
                value: "[招待コード]()"
              },
              {
                name: "手動コピー",
                value:
                  "``"
              },
              {
                name: "きのこBOTのサポート鯖",
                value:
                 "[きのこBOTのサポート鯖はこちら]()"
              }
            ]
          }
  });
  }
  });  

client.on("message", message => {
  if (message.content === "k!andserver" && message.guild) {
  message.channel.send({
          embed: {
            title: "宣伝&提携サーバー",
            color: "Red",//embedの色
            timestamp: new Date(),
            footer: {
              icon_url: client.user.avatarURL,
              text: "Created by kinoko"
            },
            thumbnail: {
              url:
                ""
            },
            fields: [
              {
                name: "提携サーバー",
                value: ":one: [きのこのサーバー](https://discord.gg/aMVP4kNm49)"
              },
              {
                name: ":one:のサーバーのお知らせ",
                value: "```きのこのお手伝いを募集中```"
              },
              {
                name: "きのこからの宣伝",
                value:
                  "[ここの鯖入ってほしいな]()`"
              }
            ]
          }
  });
  }
}); 



client.on("message", async message => {
  if (message.author.id == "302050872383242240") { // disboard
    if (
      message.embeds[0].color == "2406327" &&
      message.embeds[0].url == "https://disboard.org/" &&
      (message.embeds[0].description.match(/表示順をアップしたよ/) ||
        message.embeds[0].description.match(/Bump done/) ||
        message.embeds[0].description.match(/Bump effectué/) ||
        message.embeds[0].description.match(/Bump fatto/) ||
        message.embeds[0].description.match(/Podbito serwer/) ||
        message.embeds[0].description.match(/Успешно поднято/) ||
        message.embeds[0].description.match(/갱신했어/) ||
        message.embeds[0].description.match(/Patlatma tamamlandı/))
    ) {
      const noti = await message.channel.send({
        embed: {
          title: "Bumpが実行されました！",
          description:
            "再度実行可能になったらお知らせします。",
          color: 7506394
        }
      });
      noti.delete({ timeout: 7200000 });
      setTimeout(() => {
        message.channel.send({
          embed: {
            title: "Bumpできます！",
            description: "コマンド`!d bump`を送信できます。",
            color: 7506394
          }
        });
      }, 7200000);
    } else if (
      message.embeds[0].color == "15420513" &&
      message.embeds[0].url == "https://disboard.org/" &&
      (message.embeds[0].description.match(
        /このサーバーを上げられるようになるまで/
      ) ||
        message.embeds[0].description.match(
          /あなたがサーバーを上げられるようになるまで/
        ))
    ) {
      var splcontent_a = message.embeds[0].description.split("と");
      console.log(splcontent_a[1]);
      var splcontent_b = splcontent_a[1].split("分");
      console.log(splcontent_b[0]);
      var waittime_bump = splcontent_b[0];

      message.channel.send({
        embed: {
          title: "Bumpに失敗したようです…",
          description: waittime_bump + "分後にもう一度お試しください。",
          color: 7506394
        }
      });
    }
  }
});


client.on('message', message => {
  if (message.content.startsWith('k!bot-sit')) {
      if (message.author.id != ID) return;
      process.exit();
  }
});
client.on('message', message => {
  if (message.content.startsWith('k!bot-down')) {
      if (message.author.id != ID) return;
      process.exit();
  }
});

client.on('guildCreate', guild => {
  console.log(`ボットが ${guild.name}(${guild.id}) に参加しました`)
})

client.on('guildDelete', guild => {
  console.log(`ボットが ${guild.name}(${guild.id}) から退出しました`)
})

client.on("message", async message => { 
  if (message.content.startsWith("k!clear")) { 
    //コマンド clear
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send('<:kiken:812497914168475678>権限がありません')
    const args = message.content.split(" ").slice(1).join(""); //コマンド空白数字の数字の部分取得
    if (!args) return message.channel.send("<:kiken:812497914168475678>エラー発生:空白がない または数字が書いていません\nk!clear [1~30]"); //空白がないまたは数字がない場合表示
    const messages = await message.channel.messages.fetch({ limit: args }); //していした数を削除
    message.channel.bulkDelete(messages);
    const sdsd = await message.channel.send( //指定席
      //削除が終わったら表示
      args + //削除数
      "件のメッセージを消しました" +
      message.author.tag + "(" + message.author.id + ")" + //コマンドを実行した人
        "がコマンド実行"
    );
    sdsd; //表示
  }
});

client.on('ready', message => {
  console.log('準備完了っす！');
  client.user.setActivity('k!help | ver-1.11.0 | ' + client.guilds.cache.size + 'server', { type: "PLAYING" });
       /*もうすぐ、きのこBOTが復活します。復活:2021-02-12-13:30
        typeの値:
            https://discord.js.org/#/docs/main/stable/class/ClientUser?scrollTo=setActivity
                'PLAYING': 〇〇 をプレイ中
                'STREAMING': 〇〇 を配信中
                'WATCHING': 〇〇 を視聴中
                'LISTENING': 〇〇 を再生中
        */
});

const ytdl = require("discord-ytdl-core");

//const ytdl = require('ytdl-core')
 
client.on('message', async message => {
  // メッセージが "!yt" からはじまっていてサーバー内だったら実行する
  if (message.content.startsWith('k!play1') && message.guild) {
    // メッセージから動画URLだけを取り出す
    const url = message.content.split(' ')[1]
    // まず動画が見つからなければ処理を止める
    if (!ytdl.validateURL(url)) return message.reply('動画が存在しません！')
    // コマンドを実行したメンバーがいるボイスチャンネルを取得
    const channel = message.member.voice.channel
    // コマンドを実行したメンバーがボイスチャンネルに入ってなければ処理を止める
    if (!channel) return message.reply('先にボイスチャンネルに参加してください！')
    // チャンネルに参加
    const connection = await channel.join()
    // 動画の音源を取得
    const stream = ytdl(ytdl.getURLVideoID(url), { filter: 'audioonly' })
    // 再生
    const dispatcher = connection.play(stream)
    
    // 再生が終了したら抜ける
    dispatcher.once('finish', () => {
      channel.leave()
    })
  }
})

client.on("message", async message => {
  if (message.author.bot) return;
  const [command, ...args] = message.content.slice(prefix.length).split(' ');
  if (command === "nanndayo") {
      if (args[0] === "mention") {
          //メンションつき
          reply(message, "はろー！", "True");
      } else if (args[0] === "embed") {
          //Embedのみ
          const embed = new Discord.MessageEmbed().setDescription("何だよ");
          reply(message, "", "False", embed);
      } else {
          //全部乗せの欲張り3点セット
          const embed = new Discord.MessageEmbed().setDescription("何だよ");
          reply(message, "何だよ", "True", embed);
      }
  }
});

client.on('ready', () => {
  console.log("Bot準備完了")
});

client.on('message', message => {
  if (!message.guild) return

  if (message.content.indexOf('k!roll') == 0) {
      let mes = message.content.split(' ')
      if (mes.length < 2) {
          message.channel.send(message.member.displayName + "の「1D100」ロール：" + Math.floor(roll("1D100")))
      } else {
          let sum = 0
          let num = mes[1]
          let sp = num.split('+')
          for (let i = 0; i < sp.length; i++) {
              roll(sp[i]).forEach(element => {
                  sum += element
              })
          }
          message.channel.send(message.member.displayName + "の「" + num + "」ロール。結果：" + Math.floor(sum))
      }
  }

  function roll(para_str) {
      let para = para_str.split('D')
      if (para.length < 2) {
          return rolls(para[0], 1)
      } else {
          return rolls(para[0], para[1])
      }
  }
  function rolls(count, roll_num) {
      let output = Array(roll_num)
      for (let i = 0; i < count; i++) {
          var rand = Math.random() * (roll_num - 1) + 1
          output[i] = rand
      }
      return output
  }
});

const {createWriteStream} = require('fs');
const {pipeline} = require('stream');
const {promisify} = require('util');
//const fetch = require("node-fetch");

client.on("message", async message => {
if (message.author.bot) return;
const args = message.content
    .slice(prefix.length)
    .trim()
    .split(/ +/g);
const command = args.shift().toLowerCase();
 if (command == "voicetext") {
  const t = args.join(" ");
  const m = Math.random().toString(36).slice(2, 12);
  const streamPipeline = promisify(pipeline);

  const response = await fetch(`https://www.google.com/speech-api/v1/synthesize?text=${encodeURI(t)}&nc=mpeg&lang=ja&speed=0.5&client=lr-language-tts`);

  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

  await streamPipeline(response.body, createWriteStream(`./voices/${m}.mp3`));
  message.channel.send("結果:", {files: [`./voices/${m}.mp3`]});
 }
});

client.login(token);
