\
![weechat](http://qweg3.info/wp-content/uploads/weechat.jpg)

You can find the [weechat](https://weechat.org/) irc client on a all major distributions. In arch linux example:

# sudo pacman -S weechat

To run a client:

# weechat

**Preparations**

To enable mouse support (requires support from virtual terminal):

`/mouse enable`

To save log files in /logs/Year/Month/*, instead of using huge single files in logs/*:

`/set logger.file.mask "%Y/%m/$plugin.$name.weechatlog"`

To to merge all server buffers and have single server buffer for each irc server:

/set irc.look.server_buffer merge_without_core

** now you can switch to buffer no. 2 and use ctrl-x to switch between active networks

**Adding irc servers**

Adding new irc server:

/server add SERVERNAME address/port [-autoconnect]

Print information about your new server:

/server listfull

Fine tuning:

```bash
/set irc.server_default.nicks nick,nick2,nick3
/set irc.server_default.username ""
/set irc.server.default.realname ""
/set irc.server_default.autoreconnect_delay 60
```

Useful server settings:

```bash
/set irc.server.SERVERNAME.password password
/set irc.server.SERVERNAME.autojoin "#channel1,#channel2,#channel3"
```

Do not print pointless Weechat version notifications (eg. "Quit: (Weechat 4.2.1)") when leaving channel or disconnecting from network:

```bash
/set irc.server_default.default_msg_quit ""
/set irc.server_default.default_msg_part ""
```

Leaving channel/chat closes buffer:

```bash
/set irc.look.part_closes_buffer on
```

To enable "smart filter" on all buffers (=if a nick did not speak during last 5 minutes, it's join and/or part/quit messages will be hidden on a channel):

```bash
/filter add irc_smart * irc_smart_filter *
```

Connecting to your server:

```bash
/connect SERVERNAME
```

..and start joining channels:

```bash
/join #channelname
```

**Scripts**

Installing Buffers bar -script:

/script

"Buffers.pl" is a script that shows buffer list on a left side of window, select it. Use [i] on your keyboard to install selected script. Exit the view using:

/close

**Customizing Look & Feel**

To limit size of buffers bar (the one on left):

/set weechat.bar.buffers.size_max 15

.. or to move buffer bar at the bottom:

/set weechat.bar.buffers.position bottom

To add more available colors for different nicknames (requires 256 color support from terminal):

```bash
/set weechat.color.chat_nick_colors 006,010,012,013,014,027,028,029,030,031,032,033,035,036,037,038,039,041,042,043,044,045,047,048,049,050,041,063,067,068,069,070,071,072,073,074,075,077,078,079,080,081,083,084,085,086,087,098,099,113,114,115,116,117,119,120,121,122,123,134,135,140,141,149,150,151,152,153,155,156,167,168,169,170,171,203,204,205,206,207,209,210,211,212,213
```

To add some dark colors for delimiters, host.. etc (defaults too bright!):

/set weechat.color.chat_delimiters 29
/set weechat.color.chat_host 24
/set weechat.color.chat_prefix_suffix 24
/set weechat.color.nicklist_away 244
/set weechat.color.separator 60

To reduce max length of nicks in chat area:

/set weechat.look.prefix_align_max 15

.. or disable nick aligning:

/set weechat.look.prefix_align none

To add prefix and suffix around nicknames:

/set weechat.look.nick_prefix <
/set weechat.look.nick_suffix >

A full line (instead of dashes) for separator between prefix (usually nick) and messages and for read marker:

/set weechat.look.prefix_suffix "│"
/set weechat.look.read_marker_string "─"

"More" indicators in bars (default: >>):

/set weechat.look.bar_more_down "▼"
/set weechat.look.bar_more_left "![◀]"
/set weechat.look.bar_more_right "![▶]"
/set weechat.look.bar_more_up "▲"

Strip seconds from message timestamps:

/set weechat.look.buffer_time_format [%H:%M]

By default the title and input bars will only fill a single line because their size is set to 1, however, you can quite easily extend this to 2 or more lines in case it needs more space than a single line offers:

/set weechat.bar.title.size 0
/set weechat.bar.title.size_max 2
/set weechat.bar.input.size 0
/set weechat.bar.input.size_max 3

Hide "channel creation date", "topic", "topic date" and "names" notifications from displaying when joining channel:

/set irc.look.display_join_message ""

For more options, you can query them using /set command and asterisk. Example

/set irc.*
/set weechat.look.*suffix*

**Binding keys**

Way to register you key combination:

/key bind *<alt+k>, followed by the key/keycombination* [command]

Some suggestions (irssi style keybindings):

/key bind meta-h /buffer -1
/key bind meta-l /buffer +1
/key bind meta-q /buffer 11

Clicking long urls (opens window in a bare-mode, which dont break urls, for 5 seconds):

/key bind meta-o /window bare 5

**Controlling from command line**

you can control weechat client from a command line through special fifo-file in ~/.weechat. Example:


```bash
# Disconnect from irc servers (if possible)
 if pgrep -u $USER -x weechat &gt;/dev/null 2&gt;&amp;1; then
   for fifo in /home/$USER/.weechat/weechat_fifo_*
     do
       echo -e "*/disconnect -all" &gt;$fifo
     done
 fi
```

Happy ircing !
