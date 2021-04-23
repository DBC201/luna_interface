# luna_interface
A very simple website interface for [Luna](https://github.com/DBC201/Luna).

This website shows the price changes in the first minute when a coin is listed on Binance.
It is fully automatic working together with [Luna's listing log](https://github.com/DBC201/Luna/tree/master/luna_scripts/listing_log).
It also has an [email sender](https://github.com/DBC201/Luna/tree/master/luna_scripts/listing_mail) which
[scrapes the Binance announcement page](https://github.com/DBC201/Luna/blob/master/luna_modules/binance/BinanceAnnouncementScrape.py) 
and emails to the added addresses automatically. Abilitiy to add and remove from email list is also possible.
Required env variables can be seen in ".env". The user must create their own ".env.local" file.
