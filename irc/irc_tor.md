docker run -d -p 8118:8118 -p 9050:9050 rdsubhas/tor-privoxy-alpine
curl --proxy localhost:8118 https://www.google.com

# madirc http://qj3m7wxqk4pfqwob.onion/
# anonirc.addresses = "w5admrry7y4i6qoz.onion/6667"
# hunajairc.addresses = "mmkgpkt3p2iotbw2.onion/6667"
# anarplex  cfyfz6afpgfeirst.onion/6667


Weechat+Kali Linux+Tor
======================

$ sudo apt-get update\
$ sudo apt-get install tor\
$ sudo service tor start\
$ weechat\
/server add anarplex cfyfz6afpgfeirst.onion/6667\
/proxy add tor socks5 127.0.0.1 9050\
or /proxy add torbrowser socks5 127.0.0.1 9150\
/set irc.server.anarplex.proxy tor(or torbrowser)\
/set irc.server.anarplex.ipv6 off\
/set irc.server.anarplex.ssl_verify off\
/set irc.server.anarplex.nicks 'a user's_Account_Name'\
/set irc.server.anarplex.username 'a user's_Account_Name'\
/set irc.server.anarplex.sasl_username 'a user's_Account_Name'\
/set irc.server.anarplex.sasl_password '5up3rs3kr1+p@$$w0rD'\
/set irc.ctcp.version ""\
/set irc.ctcp.ping ""\
/set irc.ctcp.finger ""\
/set irc.ctcp.time ""\
/set irc.ctcp.source ""\
/set irc.ctcp.userinfo ""\
/set irc.ctcp.clientinfo ""\
/set irc.ctcp.download ""\
/set irc.ctcp.action ""\
/set irc.ctcp.dcc ""\
/set irc.look.display_ctcp_blocked on\
/set irc.look.display_ctcp_reply off\
/set irc.look.display_ctcp_unknown on\
/save\
/connect anarplex
