1\. General
-----------

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#weechat_name)1.1. Where does the name "WeeChat" come from?

"Wee" is a recursive acronym and stands for "Wee Enhanced Environment". So complete name is "Wee Enhanced Environment for Chat".

"Wee" also means "very small" (and yes, there is other meaning, but it does not apply to WeeChat!).

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#why_choose_weechat)1.2. Why choose WeeChat? X-Chat and Irssi are so good...​

Because WeeChat is very light and brings innovating features.

More info on this page: <https://weechat.org/about/features>

[](https://weechat.org/files/doc/devel/weechat_faq.en.html#compilation_install)2\. Compilation / install
--------------------------------------------------------------------------------------------------------

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#gui)2.1. I heard about many GUIs for WeeChat. How can I compile/use them?

Some remote GUIs are available, see the remote interfaces page: <https://weechat.org/about/interfaces>

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#compile_git)2.2. I can't compile WeeChat after cloning git repository, why?

The recommended way to compile WeeChat is with cmake.

If you're compiling with autotools (and not cmake), check that you have latest version of autoconf and automake.

The other way is to install the "devel package", which needs less dependencies. This package is built almost every day using git repository. Note that this package may not correspond exactly to git base and that it's less convenient than git cloning for installing updates.

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#compile_osx)2.3. How can I install WeeChat on OS X?

It is recommended to use [Homebrew](http://brew.sh/), you can get help with:

brew info weechat

You can install WeeChat with this command:

brew install weechat --with-aspell --with-curl --with-python --with-perl --with-ruby --with-lua --with-guile

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#lost)2.4. I've launched WeeChat, but I'm lost, what can I do?

For help you can type `/help`. For help about a command, type `/help command`. Keys and commands are listed in documentation.

It's recommended for new users to read the [Quickstart guide](https://weechat.org/files/doc/devel/weechat_quickstart.en.html).

[](https://weechat.org/files/doc/devel/weechat_faq.en.html#display)3\. Display
------------------------------------------------------------------------------

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#charset)3.1. I don't see some chars with accents, what can I do?

It's common issue, please read carefully and check **ALL** solutions below:

-   Check that weechat is linked to libncursesw (warning: needed on most distributions but not all): `ldd /path/to/weechat`.

-   Check that the "charset" plugin is loaded with `/plugin` command (if it is not, then you probably need the "weechat-plugins" package).

-   Check the output of command `/charset` (on core buffer). You should see *ISO-XXXXXX* or *UTF-8* for terminal charset. If you see *ANSI_X3.4-1968* or other values, your locale is probably wrong.\
    To fix your locale, check the installed locales with `locale -a` and set an appropriate value in $LANG, for example: `export LANG=en_US.UTF-8`.

-   Setup global decode value, for example: `/set charset.default.decode "ISO-8859-15"`.

-   If you are using UTF-8 locale:

    -   Check that your terminal is UTF-8 ready (terminal recommended for UTF-8 is rxvt-unicode).

    -   If you are using screen, check that it is run with UTF-8 mode ("defutf8 on" in ~/.screenrc or `screen -U` to run screen).

-   Check that option *weechat.look.eat_newline_glitch* is off (this option may cause display bugs).

|  | UTF-8 locale is recommended for WeeChat. If you're using ISO or other locale, please check that **all** your settings (terminal, screen, ..) are ISO and **not** UTF-8. |

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#unicode_chars)3.2. Some unicode chars are displayed in terminal but not in WeeChat, why?

This may be caused by a libc bug in function *wcwidth*, which should be fixed in glibc 2.22 (maybe not yet available in your distribution).

There is a workaround to use the fixed *wcwidth* function: <https://blog.nytsoi.net/2015/05/04/emoji-support-for-weechat>

See this bug report for more information: <https://github.com/weechat/weechat/issues/79>

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#bars_background)3.3. Bars like title and status are not filled, background color stops after text, why?

This may be caused by a bad value of the TERM variable in your shell (look at output of `echo $TERM` in your terminal).

Depending on where you launch WeeChat, you should have:

-   If WeeChat runs locally or on a remote machine without screen nor tmux, it depends on the terminal used: *xterm*, *xterm-256color*, *rxvt-unicode*, *rxvt-256color*, ...​

-   If WeeChat runs under screen, you should have *screen* or *screen-256color*.

-   If WeeChat runs under tmux, you should have *tmux*, *tmux-256color*, *screen* or *screen-256color*.

If needed, fix your TERM variable: `export TERM="xxx"`.

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#screen_weird_chars)3.4. When I'm using weechat under screen/tmux, I have weird random chars, how do I fix that?

This may be caused by bad value of the TERM variable in your shell (look at output of `echo $TERM` in your terminal, **outside screen/tmux**).\
For example, *xterm-color* may display such weird chars, you can use *xterm* which is OK (like many other values).\
If needed, fix your TERM variable: `export TERM="xxx"`.

If you are using gnome-terminal, check that the option "Ambiguous-width characters" in menu Preferences/Profile/Compatibility is set to `narrow`.

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#osx_display_broken)3.5. I compiled WeeChat under OS X, and I see "(null)" everywhere on screen, what's wrong?

If you compiled ncursesw yourself, try to use standard ncurses (that comes with system).

Moreover, under OS X, it is recommended to install WeeChat with Homebrew package manager.

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#buffer_vs_window)3.6. I heard about "buffers" and "windows", what's the difference?

A *buffer* is composed by a number, a name, lines displayed (and some other data).

A *window* is a screen area which displays a buffer. It is possible to split your screen into many windows.

Each window displays one buffer. A buffer can be hidden (not displayed by a window) or displayed by one or more windows.

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#buffers_list)3.7. How to display the buffers list on the left side?

With WeeChat ≥ 1.8, the plugin "buflist" is loaded and enabled by default.

With an older version, you can install script *buffers.pl*:

/script install buffers.pl

To limit size of bar (replace "buflist" by "buffers" if you're using the script *buffers.pl*):

/set weechat.bar.buflist.size_max 15

To move bar to bottom:

/set weechat.bar.buflist.position bottom

To scroll the bar: if mouse is enabled (key: `Alt`+`m`), you can scroll the bar with your mouse wheel.

Default keys to scroll *buflist* bar are `F1`, `F2`, `Alt`+`F1` and `Alt`+`F2`.

For script *buffers.pl*, you can define keys, similar to the existing keys to scroll nicklist.\
For example to use `F1`, `F2`, `Alt`+`F1` and `Alt`+`F2`:

/key bind meta-OP /bar scroll buffers * -100%
/key bind meta-OQ /bar scroll buffers * +100%
/key bind meta-meta-OP /bar scroll buffers * b
/key bind meta-meta-OQ /bar scroll buffers * e

|  | Keys "meta-OP" and "meta-OQ" may be different in your terminal. To find key code press `Alt`+`k` then key. |

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#customize_prefix)3.8. How can I reduce length of nicks or remove nick alignment in chat area?

To reduce max length of nicks in chat area:

/set weechat.look.prefix_align_max 15

To remove nick alignment:

/set weechat.look.prefix_align none

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#status_hotlist)3.9. What does the [H: 3(1,8), 2(4)] in status bar mean?

This is called the "hotlist", a list of buffers with the number of unread messages, by order: highlights, private messages, messages, other messages (like join/part).\
The number of "unread message" is the number of new messages displayed/received since you visited the buffer.

In the example `[H: 3(1,8), 2(4)]`, there are:

-   one highlight and 8 unread messages on buffer #3,

-   4 unread messages on buffer #2.

The color of the buffer/counter depends on the type of message, default colors are:

-   highlight: `lightmagenta` / `magenta`

-   private message: `lightgreen` / `green`

-   message: `yellow` / `brown`

-   other message: `default` / `default` (color of text in terminal)

These colors can be changed with the options *weechat.color.status_data_** (buffers) and *weechat.color.status_count_** (counters).\
Other hotlist options can be changed with the options *weechat.look.hotlist_**.

See [User's guide / Screen layout](https://weechat.org/files/doc/devel/weechat_user.en.html#screen_layout) for more info about the hotlist.

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#input_bar_size)3.10. How to use command line with more than one line?

The option *size* in input bar can be set to a value higher than 1 (for fixed size, default size is 1) or 0 for dynamic size, and then option *size_max* will set the max size (0 = no limit).

Example with dynamic size:

/set weechat.bar.input.size 0

Max size of 2:

/set weechat.bar.input.size_max 2

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#one_input_root_bar)3.11. Is it possible to display only one input bar for all windows (after split)?

Yes, you will have to create a bar with type "root" (with an item to know in which window you are), then delete current input bar.

For example:

/bar add rootinput root bottom 1 0 [buffer_name]+[input_prompt]+(away),[input_search],[input_paste],input_text
/bar del input

If ever you are not satisfied with that, just delete new bar, WeeChat will automatically create default bar "input" if item "input_text" is not used in any bar:

/bar del rootinput

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#terminal_copy_paste)3.12. How can I copy/paste text without pasting nicklist?

With WeeChat ≥ 1.0, you can use the bare display (default key: `Alt`+`l`).

You can use a terminal with rectangular selection (like rxvt-unicode, konsole, gnome-terminal, ...​). Key is usually `Ctrl` + `Alt` + mouse selection.

Another solution is to move nicklist to top or bottom, for example:

/set weechat.bar.nicklist.position top

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#urls)3.13. How can I click on long URLs (more than one line)?

With WeeChat ≥ 1.0, you can use the bare display (default key: `Alt`+`l`).

To make opening URLs easier, you can:

-   move nicklist to top:

/set weechat.bar.nicklist.position top

-   disable alignment for multiline words (WeeChat ≥ 1.7):

/set weechat.look.align_multiline_words off

-   or for all wrapped lines:

/set weechat.look.align_end_of_lines time

With WeeChat ≥ 0.3.6, you can enable option "eat_newline_glitch", so that new line char is not added at the end of each line displayed (it will not break URL selection):

/set weechat.look.eat_newline_glitch on

|  | This option may cause display bugs. If you experience such problem, you must turn off this option. |

Other solution is to use a script:

/script search url

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#change_locale_without_quit)3.14. I want to change the language used by WeeChat for messages, but without exiting WeeChat, is it possible?

Yes, with WeeChat ≥ 1.0:

/set env LANG en_US.UTF-8
/upgrade

With older WeeChat:

/script install shell.py
/shell setenv LANG=en_US.UTF-8
/upgrade

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#use_256_colors)3.15. How can I use 256 colors in WeeChat?

256 colors are supported with WeeChat ≥ 0.3.4.

First check that your *TERM* environment variable is correct, recommended values are:

-   under screen: *screen-256color*

-   under tmux: *screen-256color* or *tmux-256color*

-   outside screen/tmux: *xterm-256color*, *rxvt-256color*, *putty-256color*, ...​

|  | You may have to install package "ncurses-term" to use these values in *TERM* variable. |

If you are using screen, you can add this line to your *~/.screenrc*:

term screen-256color

If your *TERM* variable has wrong value and that WeeChat is already running, you can change it with these two commands (with WeeChat ≥ 1.0):

/set env TERM screen-256color
/upgrade

For version 0.3.4, you must use command `/color` to add new colors.

For versions ≥ 0.3.5, you can use any color number in options (optional: you can add color aliases with command `/color`).

Please read the [User's guide / Colors](https://weechat.org/files/doc/devel/weechat_user.en.html#colors) for more information about colors management.

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#search_text)3.16. How can I search text in buffer (like /lastlog in irssi)?

The default key is `Ctrl`+`r` (command is: `/input search_text_here`). And jump to highlights: `Alt`+`p` / `Alt`+`n`.

See [User's guide / Key bindings](https://weechat.org/files/doc/devel/weechat_user.en.html#key_bindings) for more info about this feature.

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#terminal_focus)3.17. How can I execute commands when terminal gets/loses focus?

You must enable the focus events with a special code sent to terminal.

**Important**:

-   You must use a modern xterm-compatible terminal.

-   Additionally, it seems to be important that your value of the TERM variable equals to *xterm* or *xterm-256color*.

-   If you use tmux, you must additionally enable focus events by adding `set -g focus-events on` to your *.tmux.conf* file.

-   This does **not** work under screen.

To send the code when WeeChat is starting:

/set weechat.startup.command_after_plugins "/print -stdout \033[?1004h\n"

And then you bind two keys for the focus (replace the `/print` commands by the commands of your choice):

/key bind meta2-I /print -core focus
/key bind meta2-O /print -core unfocus

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#screen_paste)3.18. When WeeChat is running in screen, pasting text in another screen window adds ~0 and ~1 around text, why?

This is caused by the bracketed paste option which is enabled by default, and not properly handled by screen in other windows.

You can just disable bracketed paste mode:

/set weechat.look.paste_bracketed off

[](https://weechat.org/files/doc/devel/weechat_faq.en.html#key_bindings)4\. Key bindings
----------------------------------------------------------------------------------------

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#meta_keys)4.1. Some meta keys (alt + key) are not working, why?

If you're using some terminals like xterm or uxterm, some meta keys does not work by default. You can add a line in file *~/.Xresources*:

-   For xterm:

XTerm*metaSendsEscape: true

-   For uxterm:

UXTerm*metaSendsEscape: true

And then reload resources (`xrdb -override ~/.Xresources`) or restart X.

If you are using the Mac OS X Terminal app, enable the option "Use option as meta key" in menu Settings/Keyboard. And then you can use the `Option` key as meta key.

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#customize_key_bindings)4.2. How can I customize key bindings?

Key bindings are customizable with `/key` command.

Default key `Alt`+`k` lets you grab key code and insert it in command line.

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#jump_to_buffer_11_or_higher)4.3. What is the key to jump to buffer 11 (or higher number)?

The key is `Alt`+`j` and then 2 digits, for example `Alt`+`j`, `1`, `1` to jump to buffer 11.

You can bind a key, for example:

/key bind meta-q /buffer *11

List of default keys is in [User's guide / Key bindings](https://weechat.org/files/doc/devel/weechat_user.en.html#key_bindings).

To jump to buffers with number ≥ 100, you could define a trigger and then use commands like `/123` to jump to buffer #123:

/trigger add numberjump modifier "2000|input_text_for_buffer" "${tg_string} =~ ^/[0-9]+$" "=\/([0-9]+)=/buffer *${re:1}=" "" "" "none"

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#global_history)4.4. How to use global history (instead of buffer history) with up and down keys?

You can bind the up and down keys on global history (default keys for global history are `Ctrl`+`↑` and `Ctrl`+`↓`).

Example:

/key bind meta2-A /input history_global_previous
/key bind meta2-B /input history_global_next

|  | Keys "meta2-A" and "meta2-B" may be different in your terminal. To find key code press `Alt`+`k` then key. |

[](https://weechat.org/files/doc/devel/weechat_faq.en.html#mouse)5\. Mouse
--------------------------------------------------------------------------

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#mouse_not_working)5.1. Mouse is not working at all, what can I do?

Mouse is supported with WeeChat ≥ 0.3.6.

First try to enable mouse:

/mouse enable

If mouse is still not working, check the TERM variable in your shell (look at output of `echo $TERM` in your terminal). According to terminfo used, mouse may not be supported.

You can test mouse support in terminal:

$ printf '\033[?1002h'

And then click on first char of terminal (upper left). You should see " !!#!!".

To disable mouse in terminal:

$ printf '\033[?1002l'

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#mouse_coords)5.2. Mouse does nothing for X or Y greater than 94 (or 222), why?

Some terminals are sending only ISO chars for mouse coordinates, so it does not work for X/Y greater than 94 (or 222).

You should use a terminal that supports UTF-8 coordinates for mouse, like rxvt-unicode.

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#mouse_select_paste)5.3. How can I select or paste text in terminal when mouse is enabled in WeeChat?

When mouse is enabled in WeeChat, you can use `Shift` modifier to select or click in terminal, as if the mouse was disabled (on some terminals like iTerm, you have to use `Alt` instead of `Shift`).

[](https://weechat.org/files/doc/devel/weechat_faq.en.html#irc)6\. IRC
----------------------------------------------------------------------

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#irc_ssl_connection)6.1. I have some problems when connecting to a server using SSL, what can I do?

If you are using Mac OS X, you must install `openssl` from Homebrew. A CA file will be bootstrapped using certificates from the system keychain. You can then set the path to certificates in WeeChat:

/set weechat.network.gnutls_ca_file "/usr/local/etc/openssl/cert.pem"

If you see errors about gnutls handshake, you can try to use a smaller Diffie-Hellman key (default is 2048):

/set irc.server.example.ssl_dhkey_size 1024

If you see errors about certificate, you can disable "ssl_verify" (be careful, connection will be less secure by doing that):

/set irc.server.example.ssl_verify off

If the server has an invalid certificate and you know what the certificate should be, you can specify the fingerprint (SHA-512, SHA-256 or SHA-1):

/set irc.server.example.ssl_fingerprint 0c06e399d3c3597511dc8550848bfd2a502f0ce19883b728b73f6b7e8604243b

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#irc_ssl_handshake_error)6.2. When connecting to server with SSL, I see only error "TLS handshake failed", what can I do?

You can try a different priority string (WeeChat ≥ 0.3.5 only), replace "xxx" by your server name:

/set irc.server.xxx.ssl_priorities "NORMAL:-VERS-TLS-ALL:+VERS-TLS1.0:+VERS-SSL3.0:%COMPAT"

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#irc_ssl_freenode)6.3. How can I connect to freenode server using SSL?

Set option *weechat.network.gnutls_ca_file* to file with certificates:

/set weechat.network.gnutls_ca_file "/etc/ssl/certs/ca-certificates.crt"

Note: if you are running OS X with homebrew openssl installed, you can do:

/set weechat.network.gnutls_ca_file "/usr/local/etc/openssl/cert.pem"

|  | Check that you have this file on your system (commonly brought by package "ca-certificates"). |

Setup server port, SSL, then connect:

/set irc.server.freenode.addresses "chat.freenode.net/7000"
/set irc.server.freenode.ssl on
/connect freenode

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#irc_oauth)6.4. How to connect to a server that requires "oauth"?

Some servers like *twitch* require oauth to connect.

The oauth is simply a password with the value "oauth:XXXX".

You can add such server and connect with following commands (replace name and address by appropriate values):

/server add name irc.server.org -password=oauth:XXXX
/connect name

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#irc_sasl)6.5. How can I be identified before joining channels?

If server supports SASL, you should use that instead of sending command for nickserv authentication, for example:

/set irc.server.freenode.sasl_username "mynick"
/set irc.server.freenode.sasl_password "xxxxxxx"

If server does not support SASL, you can add a delay (between command and join of channels):

/set irc.server.freenode.command_delay 5

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#ignore_vs_filter)6.6. What is the difference between the /ignore and /filter commands?

The `/ignore` command is an IRC command, so it applies only for IRC buffers (servers and channels). It lets you ignore some nicks or hostnames of users for a server or channel (command will not apply on content of messages). Matching messages are deleted by IRC plugin before display (so you'll never see them).

The `/filter` command is a core command, so it applies to any buffer. It lets you filter some lines in buffers with tags or regular expression for prefix and content of line. Filtered lines are only hidden, not deleted, and you can see them if you disable filters (by default, the key `Alt`+`=` toggles filters).

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#filter_irc_join_part_quit)6.7. How can I filter join/part/quit messages on IRC channels?

With smart filter (keep join/part/quit from users who spoke recently):

/set irc.look.smart_filter on
/filter add irc_smart * irc_smart_filter *

With a global filter (hide **all** join/part/quit):

/filter add joinquit * irc_join,irc_part,irc_quit *

|  | For help: `/help filter` and `/help irc.look.smart_filter` |

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#filter_irc_join_channel_messages)6.8. How can I filter some messages displayed when I join an IRC channel?

With WeeChat ≥ 0.4.1, you can choose which messages are displayed when joining a channel with the option *irc.look.display_join_message* (see `/help irc.look.display_join_message` for more info).

To hide messages (but keep them in buffer), you can filter them using the tag (for example *irc_329* for channel creation date). See `/help filter` for help with filters.

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#filter_voice_messages)6.9. How can I filter voice messages (eg on Bitlbee server)?

It's not easy to filter voice messages, because voice mode can be set with other modes in same IRC message.

If you want to do that, it's probably because Bitlbee is using voice to show away users, and you are flooded with voice messages. Therefore, you can change that and let WeeChat use a special color for away nicks in nicklist.

For Bitlbee ≥ 3, do that on channel *&bitlbee*:

channel set show_users online,away

For older version of Bitlbee, do that on channel *&bitlbee*:

set away_devoice false

For checking away nicks in WeeChat, see question about [away nicks](https://weechat.org/files/doc/devel/weechat_faq.en.html#color_away_nicks).

If you really want to filter voice messages, you can use this command, but this is not perfect (will work only if first mode changed is voice):

/filter add hidevoices * irc_mode (\+|\-)v

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#color_away_nicks)6.10. How can I see away nicks in nicklist?

You have to set option *irc.server_default.away_check* to a positive value (minutes between each check of away nicks).

You can set option *irc.server_default.away_check_max_nicks* to limit away check on small channels only.

For example, check every 5 minutes for away nicks, for channels with max 25 nicks:

/set irc.server_default.away_check 5
/set irc.server_default.away_check_max_nicks 25

|  | For WeeChat ≤ 0.3.3, options are *irc.network.away_check* and *irc.network.away_check_max_nicks*. |

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#highlight_notification)6.11. How can I be warned when someone highlights me on a channel?

With WeeChat ≥ 1.0, there is a default trigger "beep" which sends a *BEL* to the terminal on a highlight or private message. Thus you can configure your terminal (or multiplexer like screen/tmux) to run a command or play a sound when a *BEL* occurs.

Or you can add a command in "beep" trigger:

/set trigger.trigger.beep.command "/print -beep;/exec -bg /path/to/command arguments"

With an older WeeChat, you can use a script like *beep.pl* or *launcher.pl*.

For *launcher.pl*, you have to setup command:

/set plugins.var.perl.launcher.signal.weechat_highlight "/path/to/command arguments"

Other scripts on this subject:

/script search notify

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#irc_target_buffer)6.12. How can I change target buffer for commands on merged buffers (like buffer with servers)?

The default key is `Ctrl`+`x` (command is: `/input switch_active_buffer`).

[](https://weechat.org/files/doc/devel/weechat_faq.en.html#plugins_scripts)7\. Plugins / scripts
------------------------------------------------------------------------------------------------

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#openbsd_plugins)7.1. I'm using OpenBSD and WeeChat does not load any plugins, what's wrong?

Under OpenBSD, plugin filenames end with ".so.0.0" (".so" for Linux).

You must set that up:

/set weechat.plugin.extension ".so.0.0"
/plugin autoload

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#install_scripts)7.2. How can I install scripts? Are scripts compatible with other IRC clients?

You can use the command `/script` to install and manage scripts (see `/help script` for help).

Scripts are not compatible with other IRC clients.

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#scripts_update)7.3. The command "/script update" can not read scripts, how to fix that?

First check questions about SSL connection in this FAQ (especially the option *weechat.network.gnutls_ca_file*).

If still not working, try to manually delete the scripts file (in your shell):

$ rm ~/.weechat/script/plugins.xml.gz

And update scripts again in WeeChat:

/script update

If you still have an error, then you must remove the automatic update of file in WeeChat and download the file manually outside WeeChat (that means you'll have to update manually the file yourself to get updates):

-   in WeeChat:

/set script.scripts.cache_expire -1

-   in your shell, with curl installed:

$ cd ~/.weechat/script
$ curl -O https://weechat.org/files/plugins.xml.gz

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#aspell_dictionaries)7.4. I installed aspell dictionaries on my system, how can I use them without restarting WeeChat?

You have to reload the aspell plugin:

/plugin reload aspell

[](https://weechat.org/files/doc/devel/weechat_faq.en.html#settings)8\. Settings
--------------------------------------------------------------------------------

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#editing_config_files)8.1. Can I edit configuration files (*.conf) by hand?

You can, but this is **NOT** recommended.

Command `/set` in WeeChat is recommended:

-   You can complete the name and value of option with `Tab` key (or `Shift`+`Tab` for partial completion, useful for the name).

-   The value is checked, a message is displayed in case of error.

-   The value is used immediately, you don't need to restart anything.

If you still want to edit files by hand, you should be careful:

-   If you put an invalid value for an option, WeeChat will display an error on load and discard the value (the default value for option will be used).

-   If WeeChat is running, you'll have to issue the command `/reload`, and if some settings were changed but not saved with `/save`, you will lose them.

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#memory_usage)8.2. How can I tweak WeeChat to consume less memory?

You can try following tips to consume less memory:

-   Use the latest stable version (it is supposed to have less memory leaks than older versions).

-   Do not load some plugins if you don't use them, for example: aspell, buflist, fifo, logger, perl, python, ruby, lua, tcl, guile, javascript, php, xfer (used for DCC).

-   Load only scripts that you really need.

-   Do not load certificates if SSL is **NOT** used: set empty string in option *weechat.network.gnutls_ca_file*.

-   Reduce value of option *weechat.history.max_buffer_lines_number* or set value of option *weechat.history.max_buffer_lines_minutes*.

-   Reduce value of option *weechat.history.max_commands*.

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#cpu_usage)8.3. How can I tweak WeeChat to use less CPU?

You can follow same tips as for [memory](https://weechat.org/files/doc/devel/weechat_faq.en.html#memory_usage), and these ones:

-   Hide "nicklist" bar: `/bar hide nicklist`.

-   Remove display of seconds in status bar time: `/set weechat.look.item_time_format "%H:%M"` (this is the default value).

-   Disable real time check of misspelled words in command line (if you enabled it): `/set aspell.check.real_time off`.

-   Set the *TZ* variable (for example: `export TZ="Europe/Paris"`), to prevent frequent access to file */etc/localtime*.

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#security)8.4. I am paranoid about security, which settings could I change to be even more secure?

Disable IRC part and quit messages:

/set irc.server_default.msg_part ""
/set irc.server_default.msg_quit ""

Disable answers to all CTCP queries:

/set irc.ctcp.clientinfo ""
/set irc.ctcp.finger ""
/set irc.ctcp.source ""
/set irc.ctcp.time ""
/set irc.ctcp.userinfo ""
/set irc.ctcp.version ""
/set irc.ctcp.ping ""

Unload and disable auto-loading of "xfer" plugin (used for IRC DCC):

/plugin unload xfer
/set weechat.plugin.autoload "*,!xfer"

Define a passphrase and use secured data wherever you can for sensitive data like passwords: see `/help secure` and `/help` on options (if you can use secured data, it is written in the help).

For example:

/secure passphrase xxxxxxxxxx
/secure set freenode_username username
/secure set freenode_password xxxxxxxx
/set irc.server.freenode.sasl_username "${sec.data.freenode_username}"
/set irc.server.freenode.sasl_password "${sec.data.freenode_password}"

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#sharing_config_files)8.5. I want to share my WeeChat configuration, what files should I share and what should I keep private?

You can share files *~/.weechat/*.conf* except the file *sec.conf* which contains your passwords ciphered with your passphrase.

Some other files like *irc.conf* may contain sensitive info like passwords for servers/channels (if they are not stored in *sec.conf* with the `/secure` command).

See the [User's guide / Files and directories](https://weechat.org/files/doc/devel/weechat_user.en.html#files_and_directories) for more information about configuration files.

[](https://weechat.org/files/doc/devel/weechat_faq.en.html#development)9\. Development
--------------------------------------------------------------------------------------

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#bug_task_patch)9.1. How should I report bugs, ask for new features or send patches?

See: <https://weechat.org/about/support>

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#gdb_error_threads)9.2. When I run WeeChat under gdb, there is error about threads, what can I do?

When you run WeeChat under gdb, you may have this error:

$ gdb /path/to/weechat
(gdb) run
[Thread debugging using libthread_db enabled]
Cannot find new threads: generic error

To fix that, you can run gdb with this command (replace path to libpthread and WeeChat with paths on your system):

$ LD_PRELOAD=/lib/libpthread.so.0 gdb /path/to/weechat
(gdb) run

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#supported_os)9.3. What is the list of supported platforms for WeeChat? Will it be ported to other operating systems?

The full list is on this page: <https://weechat.org/download>

We do our best to run on as many platforms as possible. Help is welcome for some OS' we don't have, to test WeeChat.

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#help_developers)9.4. I want to help WeeChat developers. What can I do?

There's many tasks to do (testing, code, documentation, ...​)

Please contact us via IRC or mail, look at support page: <https://weechat.org/about/support>

### [](https://weechat.org/files/doc/devel/weechat_faq.en.html#donate)9.5. Can I give money or other things to WeeChat developers?

You can give us money to help development. Details on <https://weechat.org/donate>
