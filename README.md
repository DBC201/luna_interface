# luna_interface
A very simple website interface for [Luna](https://github.com/DBC201/Luna).

[This website](https://bogdanoff.pw/) shows the price changes in the first minute when a coin is listed on Binance.
It is fully automatic, working together with [Luna's listing log](https://github.com/DBC201/Luna/tree/master/luna_scripts/listing_log).
It also has an [email sender](https://github.com/DBC201/Luna/tree/master/luna_scripts/listing_mail) which
[scrapes the Binance announcement page](https://github.com/DBC201/Luna/blob/master/luna_modules/binance/BinanceAnnouncementScrape.py) 
and emails to the added addresses automatically. It also [notifies of sudden price movements in market](https://github.com/DBC201/Luna/tree/master/luna_scripts/meme)).
Abilitiy to add and remove from email list is also possible.
Required env variables can be seen in ".env". The user must create their own ".env.local" file.

# Why?
Quite often new listings make up the top gainers section. We just wanted to investigate the truth behind this.
There is also a bot [that auto buys and sells coins upon listing](https://github.com/DBC201/Luna/tree/master/luna_scripts/listing_buy).
