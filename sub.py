from discord.ext import commands
import config
import asyncio
import discord # 追加
import guild # あったっけ？


client = discord.Client() 
bot = commands.Bot(command_prefix="k!") 


@bot.command()
async def kon(ctx):
    await ctx.send(f"こんにちは、{ctx.author.name}さん。")

@bot.command ()
async def tend(ctx):
    # 待機するメッセージのチェック関数
    def check_message_author(msg):
        return msg.author is ctx.author 
    # 挨拶する既存の処理
    await ctx.send(f"{ctx.author.name}が!tendを打ちました。")
    await ctx.send("何個？")
    # チェック関数に合格するようなメッセージを待つ
    msg = await bot.wait_for('message',check=check_message_author)
    #
    embed = discord.Embed()
    #
    embed.color = discord.Color.blue()
    #
    embed.description = "a"
    # source .venv/Scripts/activate
    embed.add_field(name="a",value=msg.content)
    await ctx.send(embed=embed)


#@bot.command()
#async def DM(ctx,member: discord.Member, content):
#    await ctx.send(f"{member.name}にDMを送信します")
#    await member.send(content=content)

@bot.command()
async def guild_create_ch(ctx,name):
    guild = ctx.guild
    await guild.create_text_channel(name=name)
    await ctx.send(f"テキストチャンネル{name}を作成しました。作成者:{message.author.mention}")

@bot.command()
async def guild_kick(ctx,member: discord.Member, content):
    guild = ctx.guild
    await ctx.send(f"{member.name}をkickします。")
    try:
        await guild.kick(user=member,reason=reason)
    except discord.errors.Fobibben:
        await ctx.send("権限がありません。")

@bot.command()
async def member_bot(ctx,member: discord.Member):
    if member.bot:
        await ctx.send(f"{member.name}はBOTです。")
    else:
        await ctx.send(f"{member.name}はBOTではありません。")

@bot.command()
async def my_info(ctx):
    from datetime import timedelta
    member = ctx.author
    await ctx.send(
        f"ユーザー名:{member.name}\n"
        f"ユーザーID:{member.id}\n"
        f"discordへの参加:{member.created_at + timedelta(hours=9)}\n"
        f"Guildへの参加日:{member.joined_at + timedelta(hours=9)}\n"
        f"ステータス:{str(member.status)}\n"
        f"モバイルからのログイン:{member.is_on_mobile()}\n"
    )
@bot.command()
async def guild_info(ctx):
    from datetime import timedelta 
    guild = ctx.guild 
    await ctx.send(
        f"サーバー名:{guild.name}\n"
        f"サーバーID:{guild.id}\n"
        f"サーバーオーナー:{guild.owner.name}\n"
        f"メンバー数:{guild.member_count}\n"
        f"サーバー作成日:{guild.created_at + timedelta(hours=9)}\n"
    )

#@bot.command()
#async def stop_bot_down(ctx):
#    if message.author.guild_permissions.administrator:
#    client = bot
#    await ctx.send("BOTがストップしました。")
#    await client.close()

@bot.command()
async def send(message, title, *, text): # コマンド「message」を追加
    if message.author.guild_permissions.administrator:
        embed = discord.Embed(title=f'{title}', description=f"{text}")  # 送信する内容
        await message.channel.delete(1)
        await message.channel.send(embed=embed)  # 内容を送信
    else:
        embed = discord.Embed(title='権限無し', description='管理者権限がないため埋め込みメッセージの送信を実行することができません。')
        await message.channel.send(embed=embed)

#@bot.command()
#async def report(report, *, main):
#    dm = await bot.fetch_user(695500134179536907)
#    embed = discord.Embed(title=f'Report | レポート元={report.author}', description=f'レポート内容={main}')
#    await dm.send(embed=embed)
#    await report.send('レポートが完了しました。')
    
#@bot.command()
#async def iken(report, *, main):
#    dm = await bot.fetch_user(695500134179536907)
#    embed = discord.Embed(title=f'意見 | 意見くれた人={report.author}', description=f'意見内容={main}')
#    await dm.send(embed=embed)
#    await report.send('意見送信完了')

#@bot.command()
#async def dm(mdm, member: discord.Member, message):
#    if mdm.author.guild_permissions.administrator:
#        #await mdm.send('DM送信中')
#        await member.send(message)
#        await mdm.send('DMを送信しました')
#    else:
#        embed = discord.Embed(title=':x:権限無し', description='SPAM防止で権限がない人は送れません。')
#        await mdm.send(embed=embed)




# bot.run("") 
bot.run(config.TOKEN)
