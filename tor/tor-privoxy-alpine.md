
docker run -d -p 8118:8118 -p 9050:9050 rdsubhas/tor-privoxy-alpine
curl --proxy localhost:8118 https://www.google.com

# madirc http://qj3m7wxqk4pfqwob.onion/
# anonirc.addresses = "w5admrry7y4i6qoz.onion/6667"
# hunajairc.addresses = "mmkgpkt3p2iotbw2.onion/6667"
# anarplex  cfyfz6afpgfeirst.onion/6667
