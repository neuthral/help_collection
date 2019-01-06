How to set up Facebook with bitlbee-facebook
============================================

As an alternative to the [now (mostly-)defunct XMPP service](https://wiki.bitlbee.org/HowtoFacebookXMPP) provided by facebook, jgeboski (who also wrote [bitlbee-steam](https://github.com/bitlbee/bitlbee-steam)) made a [new plugin](https://github.com/bitlbee/bitlbee-facebook) based on the facebook messenger mobile client (which uses a protocol called MQTT)

It also happens to work much better than the XMPP service ever did, and supports groupchats.

Building and Installing
-----------------------

### APT repo

An APT repo for several recent debian/ubuntu versions is maintained here:

<https://jgeboski.github.io/#debian-and-ubuntu>

Note that this must be used together with the other APT repo, <http://code.bitlbee.org/debian/>

### Not installing anything

The public server at **im.codemonkey.be** has bitlbee-facebook installed.

(That server is administered by Tom Laermans aka sid3windr, who also admins testing.bitlbee.org, see the [public server list](https://www.bitlbee.org/main.php/servers.html))

### The manual way

Make sure bitlbee and its headers have been installed. If bitlbee came from the distribution's repository, it will most likely need the development package, usually `bitlbee-dev` or `bitlbee-devel`.

If bitlbee was built by hand (or alike via a script), ensure the make target `install-dev` is invoked. This target is not called by default, and will install the headers that are needed.

$ git clone https://github.com/bitlbee/bitlbee-facebook.git
$ cd bitlbee-facebook

With a "global" (or system) bitlbee installation:

$ ./autogen.sh
$ make
$ make install

Otherwise, before running those commands, set PKG_CONFIG_PATH to the path to the `bitlbee.pc` file. For example:

$ export PKG_CONFIG_PATH=/usr/local/lib/pkgconfig/

Usage
-----

Before continuing, please note, **it is recommended that you use an app password** for your Facebook account. Not only is this more secure than leaving your password within bitlbee, but it allows the usage of two factor authentication methods. An app password can be generated via [the security page](https://www.facebook.com/settings?tab=security&section=per_app_passwords&view) on the Facebook website.

### Getting started

Use the same email you use to log in to facebook, and either your main password or an app password.

> account add facebook <email> <password>
> account facebook on

### Joining existing groupchats

> fbchats facebook
> fbjoin facebook <index> <channel>
> /topic <message>
> /invite <user>

Note that fbjoin is only needed the first time you join a channel. After that, you can just do `/join <channel>`.

You can configure these channels to be autojoined by doing `channel <channel> set auto_join true`

#### Joining old groupchats

The `fbchats` lists only the most recent group conversations. If you need to join an existing conversation that does not appear in `fbchats`, retrieve its ID by [opening it on Facebook](https://www.facebook.com/messages/), copy the large numeric ID following `conversation-` in the URL and manually add it:

> chat add facebook 123456789 #some-channel
> /join #some-channel

### Creating new groupchats

To create a new groupchat, use the fbcreate command, followed by a space separated list of users (at least two), and then "fbjoin" the groupchat to give it a name.

> fbcreate [acc] <user user ...>
> fbjoin [acc] 1 <channel>
> /topic <message>
> /invite <user>

### Settings

#### mark_read

account facebook set mark_read (true/false/available)

If set to true, all messages will be marked as read as soon as they are received. If set to available this will only happen when you're not marked as away in bitlbee.

This can be useful to avoid getting message notifications in the website (if bitlbee is your main way to read facebook messages) but your contacts might complain that you've read their messages and didn't reply.

#### mark_read_reply

account facebook set mark_read_reply (true/false)

If set to true, messages will be marked as read as soon you reply to them.

#### show_unread

account facebook set show_unread (true/false)

If set to true, unread messages will be shown when connecting.

Enabling this without `mark_read` may result in getting the same messages repeatedly if the account reconnects frequently.

Otherwise, if `mark_read` is on, it can be a way to retrieve offline messages.

#### group_chat_open

account facebook set group_chat_open (true/false/all)

This setting controls when to join a channel if a message is sent to the corresponding groupchat. It has three possible values:

-   `false` (default), which means not automatically joining channels ever.

-   `true`, which will automatically join channels that are in the local channel list (you joined them before)

-   `all`, which will automatically join channels always, creating them if they don't exist.

Issues
------

Any issues with this plugin should be reported to <https://github.com/bitlbee/bitlbee-facebook/issues>

### Debugging

To enable debugging output:

$ export BITLBEE_DEBUG=1      # or use BITLBEE_DEBUG_FACEBOOK=1 to debug only this plugin
$ bitlbee -Dnv

Ensure that you're running bitlbee as the correct user (with the right permissions to the user configuration directory, usually /var/lib/bitlbee)

### Login Problems

Some address ranges (mostly belonging to affordable vps providers) seem to be blacklisted by facebook and every login attempt leads to authentication failing with:

@root | facebook - Login error: User must verify their account on www.facebook.com (405)

In the process all devices logged into the account are logged out and a password change is required. There seems to be no way of telling facebook to trust an ip adress from the website, even if you click 'That login attempt was me' the next time it will be blocked again. So far the only solution is to connect to facebook with your logged in and trusted browser via the ip where your bitlbee server is running, for example by using an ssh socks proxy:

ssh -D localhost:1234 <your.bitlbee.server.tld>

in the network settings of your OS (or in Firefox: Preferences->Advanced->Network->Connection) select Socks5 proxy with host localhost and port 1234. If your server has IPv6 and your local Internet does not, be sure to activate "Remote DNS". Then open up facebook in your browser. You can check if you are connecting from the right IP in [Facebook settings](https://www.facebook.com/settings?tab=security&section=sessions). After that you should be able to safely reactivate your account.

For further Information see the corresponding Github issues: [#105](https://github.com/bitlbee/bitlbee-facebook/issues/105), [#108](https://github.com/bitlbee/bitlbee-facebook/issues/108)
