FiXato's guide to WeeChat
=========================

After seeing various people in [#WeeChat](irc://irc.freenode.org/#WeeChat) still struggle with setting up (or rather configuring) their [WeeChat](http://www.weechat.org/)client to their liking (even though there's a nice [QuickStart document](http://weechat.org/files/doc/stable/weechat_quickstart.en.html)), I decided to write my own post to get you started with this awesome chat client which has become my favourite IRC client.

However, since people's preferences differ *(luckily! otherwise the world would be a boring place!)*, I would also suggest you have a look at these other tutorials and blogs about WeeChat:

-   [Pascal *r3m* Poitras Dubois's WeeChat posts](http://pascalpoitras.com/tag/weechat/). He has for instance listed [his favourite scripts](http://pascalpoitras.com/2013/06/29/weechat-my-favorites-scripts/), and [his WeeChat config](http://pascalpoitras.com/2013/05/25/my-weechat-configuration/).
-   [Arch Linux's wikipage on WeeChat](https://wiki.archlinux.org/index.php/WeeChat)
-   [Josh Reichardt's introduction to WeeChat (and Bitlbee)](http://thepracticalsysadmin.com/introduction-to-weechat/)
-   [Tim Bielawa's list of favourite scripts, tricks and aliases for WeeChat](http://blog.lnx.cx/2012/08/14/weechat/)

Table of Contents
-----------------

1.  [FiXato's guide to WeeChat](https://guides.fixato.org/weechat/#body)
    1.  [Table of Contents](https://guides.fixato.org/weechat/#nav)
    2.  [Compiling WeeChat from scratch](https://guides.fixato.org/weechat/#compiling-weechat-from-scratch)
        1.  [Required (and optional) packages](https://guides.fixato.org/weechat/#compiling-weechat-from-scratch-installing-all-packages)
        2.  [Cloning the official git repository and compiling and installing WeeChat using CMake](https://guides.fixato.org/weechat/#compiling-weechat-from-scratch-cloning-repo-and-compiling)
        3.  [Running WeeChat](https://guides.fixato.org/weechat/#compiling-weechat-from-scratch-running-weechat)
        4.  [Updating WeeChat](https://guides.fixato.org/weechat/#compiling-weechat-from-scratch-updating-weechat)
    3.  [Configuring your terminal](https://guides.fixato.org/weechat/#configure-terminal)
        1.  [$TERM](https://guides.fixato.org/weechat/#TERM-environment-variable)
        2.  [UTF-8](https://guides.fixato.org/weechat/#utf-8)
            1.  [Locale](https://guides.fixato.org/weechat/#locale)
            2.  [libcursesw](https://guides.fixato.org/weechat/#libcursesw)
        3.  [Using the right font](https://guides.fixato.org/weechat/#font-choices)
        4.  [Setting up tmux](https://guides.fixato.org/weechat/#tmux)
    4.  [Ads: getting me that beer (eventually) that I deserve for writing this;-)](https://guides.fixato.org/weechat/#ads-section-1)
    5.  [Running WeeChat](https://guides.fixato.org/weechat/#weechat-curses)
        1.  [Checking for 256 colours in WeeChat](https://guides.fixato.org/weechat/#256-colours)
        2.  [Starting weechat](https://guides.fixato.org/weechat/#starting-weechat)
            1.  [A closer look](https://guides.fixato.org/weechat/#closer-look-at-weechat)
            2.  [Default bars](https://guides.fixato.org/weechat/#default-bars)
                1.  [Input bar](https://guides.fixato.org/weechat/#default_input_bar)
                2.  [Title bar](https://guides.fixato.org/weechat/#default_title_bar)
                3.  [Status bar](https://guides.fixato.org/weechat/#default_status_bar)
                4.  [Nicklist bar](https://guides.fixato.org/weechat/#default_nicklist_bar)
                5.  [Resetting default bar(s)](https://guides.fixato.org/weechat/#resetting_default_bars)
    6.  [Ads part 2: How about some cheap Asian electronics then? ;-)](https://guides.fixato.org/weechat/#dealextreme-ads)
    7.  [Settings](https://guides.fixato.org/weechat/#settings)
        1.  [Looking up settings](https://guides.fixato.org/weechat/#how_to_find_the_right_settings)
        2.  [Closer look at bar settings](https://guides.fixato.org/weechat/#closer_look_at_bar_settings)
        3.  [Changing settings](https://guides.fixato.org/weechat/#changing_settings)
    8.  [The /help command](https://guides.fixato.org/weechat/#help-command)
        1.  [Getting an overview of all commands and their descriptions](https://guides.fixato.org/weechat/#overview_of_all_commands_and_descriptions)
            1.  [/help -list](https://guides.fixato.org/weechat/#help-command-list)
            2.  [/help -listfull](https://guides.fixato.org/weechat/#help-command-listfull)
        2.  [Looking up help info for a setting](https://guides.fixato.org/weechat/#looking_up_help_for_a_setting)
    9.  [Tab Completion](https://guides.fixato.org/weechat/#completion)
        1.  [complete_next and complete_previous](https://guides.fixato.org/weechat/#complete_next_and_previous)
        2.  [Example of difference between full and partial completion](https://guides.fixato.org/weechat/#difference_between_full_and_partial_completion)
        3.  [Completion settings](https://guides.fixato.org/weechat/#completion_settings)
    10. [Mouse support](https://guides.fixato.org/weechat/#mousesupport)
        1.  [How to enable mouse support](https://guides.fixato.org/weechat/#enable-mousesupport)
    11. [Scripts](https://guides.fixato.org/weechat/#Scripts-section)
        1.  [Script Plugins](https://guides.fixato.org/weechat/#script-plugins)
            1.  [Writing your own Plugins](https://guides.fixato.org/weechat/#write_your_own_plugins)
        2.  [Managing Scripts](https://guides.fixato.org/weechat/#managing_scripts)
            1.  [Manually](https://guides.fixato.org/weechat/#managing_scripts_manually)
            2.  [Through /script (Plugin)](https://guides.fixato.org/weechat/#managing_scripts_via_script-plugin)
                1.  [Titlebar](https://guides.fixato.org/weechat/#script_buffer_titlebar)
                2.  [Scripts list](https://guides.fixato.org/weechat/#script_buffer_list)
            3.  [Through /weeget script (Pre-0.3.9)](https://guides.fixato.org/weechat/#managing_scripts_via_weeget)
    12. [Managing Servers](https://guides.fixato.org/weechat/#managing_servers)
        1.  [How to add an IRC network?](https://guides.fixato.org/weechat/#adding_an_irc_network)
            1.  [Oh no! A certificate error for the network! What now?](https://guides.fixato.org/weechat/#network_certificate_error)
            2.  [Checking for, and updating the trusted certificate authorities files.](https://guides.fixato.org/weechat/#trusted_certificate_authorities_file)
                1.  [Retrieving and merging the Chat4All CA certificate.](https://guides.fixato.org/weechat/#retrieving_and_merging_chat4all_ca_file)
                2.  [Reconnecting to Chat4All](https://guides.fixato.org/weechat/#reconnecting_to_chat4all)
        2.  [Let's change freenode's settings](https://guides.fixato.org/weechat/#adjusting_freenode_settings)
            1.  [Auto-join channels on freenode](https://guides.fixato.org/weechat/#autojoin_channels_on_freenode)
            2.  [Auto-identify for your registered nickname on freenode](https://guides.fixato.org/weechat/#autoidentify_on_freenode)
        3.  [Deleting a network/server:](https://guides.fixato.org/weechat/#deleting_a_network)
        4.  [Renaming a network/server:](https://guides.fixato.org/weechat/#renaming_a_network)
    13. [Suggested settings](https://guides.fixato.org/weechat/#suggested_settings)
        1.  [Expand title and input bars over multiple lines](https://guides.fixato.org/weechat/#expand_title_and_input_bars_over_multiple_lines)
    14. [Suggested / My keybinds](https://guides.fixato.org/weechat/#suggested_keybinds)
        1.  [Alt+Backspace deletes previous word](https://guides.fixato.org/weechat/#delete_previous_word)
        2.  [Grab key with meta shift+k](https://guides.fixato.org/weechat/#meta_shift_k_grab_key)
        3.  [Switch between windows with CTRL + cursor keys](https://guides.fixato.org/weechat/#ctrl_cursor_keys_switch_windows)
        4.  [Go to next and previous word with alt + left/right cursor keys](https://guides.fixato.org/weechat/#alt_left_right_jumps_between_words)
        5.  [Complete word with mouse gesture to the right in input bar](https://guides.fixato.org/weechat/#input_bar_mouse_gesture_right_completion)
    15. [Suggested / My aliases](https://guides.fixato.org/weechat/#suggested_aliases)
        1.  [Prefixed opnotice/wallchops](https://guides.fixato.org/weechat/#onotice_alias)
        2.  [/alot](https://guides.fixato.org/weechat/#alot_alias)
        3.  [Buffer Move](https://guides.fixato.org/weechat/#buffer_move_alias)
        4.  [/recursion](https://guides.fixato.org/weechat/#recursion_alias)
        5.  [Punglasses](https://guides.fixato.org/weechat/#punglasses_aliases)
        6.  [/lookaround](https://guides.fixato.org/weechat/#lookaround_alias)
        7.  [/mynames alias if you filter the /names response](https://guides.fixato.org/weechat/#filtered_names_alias)
        8.  [/konamicode](https://guides.fixato.org/weechat/#konamicode_alias)
        9.  [/irc-analogy](https://guides.fixato.org/weechat/#irc_analogy_alias)
        10. [/irc-clients](https://guides.fixato.org/weechat/#irc_clients_alias)
        11. [An alias linking to a youTube video that explains what a hacker really is](https://guides.fixato.org/weechat/#what_is_a_hacker_alias)
        12. [/gangnam](https://guides.fixato.org/weechat/#gangnam_alias)
        13. [/dances](https://guides.fixato.org/weechat/#dances_alias)
        14. [Come at me bro!](https://guides.fixato.org/weechat/#come_at_me_bro_alias)
    16. [Ads: clickety dick, money from doubleclick](https://guides.fixato.org/weechat/#ads-section-4)
    17. [How to install themes.](https://guides.fixato.org/weechat/#howto-install-themes)
    18. [Script Snippets](https://guides.fixato.org/weechat/#script-snippets)
        1.  [Retrieve target msgbuffer:](https://guides.fixato.org/weechat/#snippet-find_buffer)
        2.  [Set default settings:](https://guides.fixato.org/weechat/#snippet-default_settings)
    19. [YourBNC Configuration](https://guides.fixato.org/weechat/#bnc-yourbnc)
        1.  [Legend to the examples format](https://guides.fixato.org/weechat/#bnc-yourbnc-examples-format)
        2.  [Adding a server config for YourBNC](https://guides.fixato.org/weechat/#bnc-yourbnc-add_server_config)
            1.  [Add YourBNC as a regular (non-SSL) server:](https://guides.fixato.org/weechat/#bnc-yourbnc-add_server_config-non-SSL)
            2.  [Add YourBNC as an SSL-enabled server:](https://guides.fixato.org/weechat/#bnc-yourbnc-add_server_config-SSL)
                1.  [SSL Fingerprint verification](https://guides.fixato.org/weechat/#bnc-yourbnc-add_server_config-SSL-fingerprint)
        3.  [Ads part 3: maybe a juicy burger instead perhaps? ;-)](https://guides.fixato.org/weechat/#ads-section-3)
        4.  [Adding auto-join channels:](https://guides.fixato.org/weechat/#bnc-yourbnc-add_autojoin_channels)
        5.  [Remember to /save](https://guides.fixato.org/weechat/#bnc-yourbnc-remember-to-save)
        6.  [Further Reading](https://guides.fixato.org/weechat/#bnc-yourbnc-further_reading)
    20. [Recent Changes:](https://guides.fixato.org/weechat/#changelog)
    21. [To be continued](https://guides.fixato.org/weechat/#to_be_continued)
        1.  [Topics I might cover:](https://guides.fixato.org/weechat/#topics_to_be_covered)
2.  [Contact FiXato](https://guides.fixato.org/weechat/#contact_FiXato)

Compiling WeeChat from scratch
------------------------------

The installation of packages part assumes you are running Debian or a Debian-based Linux distribution such as Ubuntu. Package names and installation commands may vary depending on the distribution you are using.

### Required (and optional) packages

To ensure you have *all* packages required for installing WeeChat along with all its plugins, run:

sudo apt-get install cmake libncursesw5-dev libcurl4-gnutls-dev zlib1g-dev libgcrypt11-dev libgnutls-dev gettext ca-certificates libaspell-dev libenchant-dev python-dev libperl-dev ruby1.9.1-dev liblua5.1-0-dev tcl-dev guile-2.0-dev asciidoc source-highlight xsltproc docbook-xml docbook-xsl

### Cloning the official git repository and compiling and installing WeeChat using CMake

Once all those packages are installed, you can compile WeeChat with the following oneliner, which should clone the WeeChat source from the official git repository into /usr/local/src/weechat (you should ensure you have write access to its parent directory) and will install the compiled WeeChat files into /usr/local:

WEECHAT_SOURCE_DIR=/usr/local/src/weechat && WEECHAT_TARGET_DIR=/usr/local && mkdir -p $WEECHAT_SOURCE_DIR/.. && git clone https://github.com/weechat/weechat.git $WEECHAT_SOURCE_DIR && cd $WEECHAT_SOURCE_DIR && mkdir -p build && cd build && cmake .. -DPREFIX=$WEECHAT_TARGET_DIR -DCMAKE_BUILD_TYPE=Debug -DENABLE_DOC=OFF && make && sudo make install

Personally I use /usr/local/weechat as my WEECHAT_TARGET_DIR, but that would also entail adding the /usr/local/weechat/bin directory to your $PATH, while /usr/local/bin tends to already be included. If you need to make PATH adjustments since your terminal can't find the weechat executable binary, then have a look at [this document describing what the PATH environment variable is and how to (permanently) set it.](http://www.cyberciti.biz/faq/unix-linux-adding-path/).

### Running WeeChat

Once everything is installed, you should be able to run WeeChat by running this command:\
weechat

### Updating WeeChat

You can also fairly easily update weechat again. I personally use the following bash script I have saved in ~/bin/update_weechat:

#!/bin/bash WEECHAT_SOURCE_DIR=/usr/local/src/weechat && WEECHAT_TARGET_DIR=/usr/local && cd $WEECHAT_SOURCE_DIR && git reset --hard HEAD && cd build && cmake .. -DPREFIX=$WEECHAT_TARGET_DIR -DCMAKE_BUILD_TYPE=Debug -DENABLE_DOC=OFF && make && sudo make instal

It will always ensure any changes you might've made to your WeeChat source dir are undone by resetting to the HEAD of the git repository, so make sure that any chances you've made to the source are `git stash`'ed ;-)

Once that has compiled properly, you can upgrade your running WeeChat session from within WeeChat with: /upgrade

Configuring your terminal
-------------------------

So, before we get started to configuring WeeChat, let's make sure our terminal is properly set up so we don't run into any strange display issues.\
![Overview Terminal variables for my Ubuntu session](https://guides.fixato.org/weechat/images/weechat-tutorial-001-check_term.png)\
Let's have a closer look at each of these commands:

### $TERM

Let's first check the TERM environment variable, to make sure it is the right one for displaying the [256 colours that WeeChat supports](http://www.weechat.org/files/doc/stable/weechat_user.en.html#colors):\
echo $TERM\
Ideally this should say something like xterm-256color *(as mine returns)*, rxvt-unicode-256color, ~~rxvt-256color~~, putty-256color. Or, if you are already inside a terminal multiplexer such as GNU/Screen or tmux, screen-256color.\
If it doesn't, I suggest you read the [WeeChat F.A.Q.: How can I use 256 colors in WeeChat?](http://weechat.org/files/doc/weechat_faq.en.html#use_256_colors) to help you fix this issue if you want to be able to use more than 16 colours.

### UTF-8

I'm a great fan of using Unicode (and utf-8 in particular) everywhere I can. Why? Because it makes it much easier to see what everyone's writing when we all use the same encoding, and Unicode has enough space for most (if not all?) character sets available.\
That aside, let's just say that it's best to run WeeChat with utf-8 support enabled. So, make sure you pick a terminal emulator which has UTF-8 support by itself, and make sure you have enabled it. I can't really go into the details of every terminal emulator application out there, so instead I'll just link to a few online docs that I know of:

-   [MinTTY for Cygwin Options->Text Locale and Character Set options](http://mintty.googlecode.com/svn/trunk/docs/mintty.1.html#23)
-   [PuTTY's (lacking) documentation for setting 'character set translation'](http://the.earth.li/~sgtatham/putty/0.62/htmldoc/Chapter4.html#config-charset) *(Also have a look at the 'Controlling display of line-drawing characters' section)*
-   [The Grey Blog: Configuring PuTTY to use UTF-8 character encoding](http://thegreyblog.blogspot.com/2009/08/configuring-putty-to-use-utf-8.html) *(A more useful tutorial to setting UTF-8 on PuTTY)*
-   [iTerm's F.A.Q.](http://iterm.sourceforge.net/faq.shtml)
-   [Blogpost about setting iTerm's Encoding](http://blog.ndrix.com/2007/12/iterm-utf-8.html) *(View > Show Session Info > Session tab -> Encoding -> Unicode (UTF-8))*
-   [iTerm2's F.A.Q.](http://www.iterm2.com/#/section/faq)
-   [iTerm2's Documentation](http://www.iterm2.com/#/section/documentation/highlights)\
    *(set the right default $TERM (xterm-256color) via Preferences > Profiles > Terminal > Report Terminal Type)*\
    *(set the right encoding ("Unicode (UTF-8)") via Preferences > Profiles > Terminal > Character encoding)*
-   [](http://docs.kde.org/development/en/applications/konsole/commandreference.html#view-menu)*([View menu] > Set Encoding > Unicode (utf8))*

#### Locale

One of the requirements is that your terminal needs to be using a UTF-8 locale. So, let's look at which locale are set in your current terminal:\
locale\
As you can see in the [terminal example output (for Ubuntu) displayed above](https://guides.fixato.org/weechat/#example-terminal) it displays a bunch of LC_ and LANG variables that are set to en_GB.UTF-8:

LANG=en_GB.UTF-8 LANGUAGE=en_GB.UTF-8 LC_CTYPE="en_GB.UTF-8" LC_NUMERIC="en_GB.UTF-8" LC_TIME="en_GB.UTF-8" LC_COLLATE="en_GB.UTF-8" LC_MONETARY="en_GB.UTF-8" LC_MESSAGES="en_GB.UTF-8" LC_PAPER="en_GB.UTF-8" LC_NAME="en_GB.UTF-8" LC_ADDRESS="en_GB.UTF-8" LC_TELEPHONE="en_GB.UTF-8" LC_MEASUREMENT="en_GB.UTF-8" LC_IDENTIFICATION="en_GB.UTF-8" LC_ALL=en_GB.UTF-8

The most important part here is whether the variables are defined at all *(at least LANG/LANGUAGE and LC_ALL as far as I know)*, and if they have a .UTF-8 value.\
If they don't or use something like .iso88591, .roman8, C, or POSIX, you probably want to look into changing your locale to one of the .UTF-8 ones.\
If something's wrong with your setup, I can't really help you set up your locale for you, so you'll have to do some research for yourself. However, the following links might be helpful:

-   [Google for Linux set your terminal locale](https://encrypted.google.com/search?q=linux+set+your+terminal+locale&ie=UTF-8&hl=en)
-   [Ubuntu's Locale info](https://help.ubuntu.com/community/Locale)
-   [ArchWiki's Locale info](https://wiki.archlinux.org/index.php/Locale)
-   [Using UTF-8 with Gentoo](https://wiki.gentoo.org/wiki/UTF-8)
-   [How to set up a clean UTF-8 environment in Linux](http://perlgeek.de/en/article/set-up-a-clean-utf8-environment)
-   [Internationalisation on Cygwin - how to set up your locale in Cygwin](http://cygwin.com/cygwin-ug-net/setup-locale.html)
-   [UTF-8 Setup Mini HOWTO](http://www.maruko.ca/i18n/)
-   [UTF-8 and Unicode FAQ for Unix/Linux](http://www.cl.cam.ac.uk/~mgk25/unicode.html)

#### libcursesw

The last thing to check is to see whether WeeChat is linked to the libncursesw library, which adds support to WeeChat for wide characters. While it might not be necessary to have WeeChat linked against it, it can be handy to check if it is:\
ldd `which weechat` | grep libncursesw

If it returns something like:\
libncursesw.so.5 => /lib/libncursesw.so.5 (0x00002b7809152000)\
then that is a good sign!

If it returns nothing, you might want to install its development library and recompile WeeChat, just to be sure.\
On Ubuntu-based Linux distributions you could do this with:\
sudo apt-get install libncursesw5-dev.

Even if it is missing, it doesn't need to be a bad thing. If you don't see any strange characters while using WeeChat, then it's probably not needed. If you do, then you have something you could look into. ;-)

With all of this set up properly, you shouldn't have any problems with seeing wrong characters, or not being able to use or see accented characters. If you do, I suggest you have a read at the [WeeChat F.A.Q.: I don't see some chars with accents, what can I do?](http://weechat.org/files/doc/weechat_faq.en.html#charset)

### Using the right font

On IRC you are bound to see ascii art which uses obscure characters in the unicode character set, and which rely on the font being of a fixed width / monospaced. Therefor it is wise to make sure you are using a font in your terminal that was a wide support for glyphs. My favourite font is [DejaVu Sans Mono](http://dejavu-fonts.org/). You can [download DejaVu Sans Mono here](http://dejavu-fonts.org/wiki/Download). Another favourite is Lucida Console. A longer list of recommended fonts is as follows:

-   [DejaVu Sans Mono](http://dejavu-fonts.org/)
-   [Lucida Console](http://en.wikipedia.org/wiki/Lucida_Console#Lucida_Console)
-   [GNU Unifont](http://unifoundry.com/unifont.html)
-   [Consolas](http://en.wikipedia.org/wiki/Consolas)
-   [Anonymous Pro](http://www.marksimonson.com/fonts/view/anonymous-pro)
-   [Fixedsys Excelsior](http://www.fixedsysexcelsior.com/)
-   [Andalé Mono](http://en.wikipedia.org/wiki/Andale_Mono)

### Setting up tmux

UTF-8 support can be enabled by putting set-window-option -g utf8 on # utf8 support into your .tmux.conf tmux config file.

If you intend to keep WeeChat running in your background, for instance when you run it on a remote SSH connection, I recommend running WeeChat in a terminal multiplexer, such as [GNU Screen ](http://www.gnu.org/software/screen/)or [tmux](http://tmux.sourceforge.net/). For this guide I'll assume you are running it in tmux.

To easily start and/or reattach to a tmux session you have running specifically for WeeChat, I recommend using this code snippet:

SESSIONNAME='weechat-tutorial' && (tmux attach-session -t $SESSIONNAME || tmux new-session -s $SESSIONNAME)

If you want, you can put this in an alias in your *.bashrc*, or in an executable bash file placed (preferably in a dir that's mentioned in your *$PATH*).\
It will try to attach to a tmux session named 'weechat-tutorial' (*feel free to change this name*) and if it can't find one, it will start it for you.

As a final test, let's ensure the $TERM is still correct: echo $TERM\
![Screenshot of `echo $TERM` output within tmux](https://guides.fixato.org/weechat/images/weechat-tutorial-002-check_tmux_term.png)\
If this shows screen-256color then you are all set!

Which brings us to the next section, starting and setting up WeeChat!

Running WeeChat
---------------

Yes, I spent quite some time on making you check your terminal first, but. We are ready to start running WeeChat now!

### Checking for 256 colours in WeeChat

Okay, I lied. :P Before we start WeeChat, let's just check first if it displays the 256 colours correctly:\
weechat -c\
![Screenshot of the `weechat -c` command to check for 256 colours support](https://guides.fixato.org/weechat/images/weechat-tutorial-003-weechat_colours.png)\
As you can see, for me it shows a nice table of 256 coloured numbers, ranging from 000 (black) to 255 (white). The first 16 are the ones WeeChat uses for its default named colour aliases. Beside the 256 colours, it also shows that my $TERM is screen-256color, that it supports 256 colours, has support for 32767 colour pairs, but can't change colours (not quite sure myself what this last feature does though and how to change it to yes though; probably some ncurses feature).

If it doesn't show all the 256 colours, but just 8 or 16 instead, I suggest you go back to the previous sections to check if you missed something, or check the [WeeChat F.A.Q.: How can I use 256 colors in WeeChat?](http://weechat.org/files/doc/weechat_faq.en.html#use_256_colors).

### Starting weechat

Right, let's start WeeChat. The application was originally called weechat-curses, probably because it allowed for non-curses frontends to the weechat core to be created as well. At some point the executable got renamed to just 'weechat' for clarity. An alias might also be created automatically for backwards 'compatibility'.![Screenshot of the $TERM, the --help text of weechat and my command to start weechat from a different directory.](https://guides.fixato.org/weechat/images/weechat-tutorial-004-starting_weechat-curses.png)\
As you can see in the example above I've also specified the argument -d ~/.weechat-tutorial which specifies where WeeChat will store its config files. I did this so it wouldn't disturb the config files for my working WeeChat which stores its config files in the default location, *~/.weechat*.

So, let's fire it up:\
weechat\
![Screenshot of WeeChat as it was just started for the first time.](https://guides.fixato.org/weechat/images/weechat-tutorial-005-weechat-curses_initial_start.png)\
There it is, WeeChat, in its glorious appearance! Glorious? Well... perhaps not yet, but it will be once we are done with it!

#### A closer look

Let's have a closer look at what is shown on it, shall we?

It shows which version we are running, which is WeeChat 0.4.0-rc2 apparently, and when it was last compiled. I guess I should've updated from the git repository before starting this tutorial. I'll fix that soon enough. ;-)

#### Default bars

It also tells us that several [bars](http://www.weechat.org/files/doc/stable/weechat_user.en.html#bars) have been created.

##### Input bar

The *input* bar is the bar in which you will be typing in all your commands. By default it has *window* as its type, which makes it show up in every WeeChat window. While I prefer this behaviour, some might prefer a single *root* input bar, so I'll show you later on how to achieve that too.

##### Title bar

The *title* bar shows the title of the buffer which is displayed in the window. Because bars can have a background, it's also nice way to visually separate channels from one another when you've split windows.

##### Status bar

The *status* bar is shown below the contents of the current buffer, but above the input bar (by default at least). If for instance you'd like to have the status bar shown above the chat area, you could move it with:\
/set weechat.bar.status.position top

##### Nicklist bar

The last bar that was created is the *nicklist*. This bar displays the nicks of everyone in the channel you are in. Which mouse support enabled, you should be able to scroll through it. I'll go deeper into this later on.

##### Resetting default bar(s)

If you made a mistake with one or more default bars, you can easily restore them with the /bar default command. This command will only restore missing bars; it won't override existing bars. So, if you want to restore a default bar because you screwed up some settings, then you first have to delete the bar.

Let's say you want to restore the default nicklist, then you can type:\
/bar del nicklist\
/bar default nicklist

If you want to restore all bars to their default state, then use:\
/bar del -all\
/bar default

### Recommended products from DealExtreme

Settings
--------

Some console clients might require you to change all your settings in the config files, but WeeChat strongly discourages this as it would require manual reloading of the config files. Instead, WeeChat comes with the /set command which not only allows you to change your settings directly from within WeeChat, it also allows you to search your currently configured settings.

### Looking up settings

Remember that nicklist I mentioned? Let's have a closer look at the options this bar has.\
/set *nicklist*\
This command will show all the settings that have 'nicklist' in them. The *** wildcard before and after the text indicates that it doesn't matter what text is before or after the keyword. For my unconfigured WeeChat the following results were shown:\
![WeeChat nicklist settings](https://guides.fixato.org/weechat/images/weechat-tutorial-006-weechat_nicklist_settings.png)\
It specifies some colours for the various states of a nickname (weechat.color.nicklist_*), whether colours should be used in the nicklist at all (irc.look.color_nicks_in_nicklist) and the various properties of the nicklist bar (weechat.bar.nicklist.*). If we would've just wanted WeeChat to show the nicklist bar settings, the following command could've been used instead:\
/set weechat.bar.nicklist.*

### Closer look at bar settings

Looking at the settings we see you can specify the background colour, the colour for the bar delimiter, the foreground (text) colour, 'conditions', how it should be filled with items, if it should be hidden, what bar items are shown in it, where it should be positioned (on the right of the chat area), what its drawing priority is, whether the bar separator is enabled, what its size should be, as well as what its maximum size may be (in case of it being auto-sized by setting the size to 0), and finally, what kind of bar type it is.

### Changing settings

Let's change the background colour of the status bar; make it dark gray instead of the dark blue. For this we'll also have to use the /set command, but now we also have to specify a second argument, namely the value:\
/set weechat.bar.status.color_bg darkgray\
The effect should be instant. Feel free to try out a couple of other colours (you should have 256 of them at your disposition!) till you found the one you like.

The /help command
-----------------

For any command or option/setting in WeeChat there is (or at least should be) help information. These texts, usually very helpful, can be retrieved via the /help command.

### Getting an overview of all commands and their descriptions

Going through a list of commands can be quite useful every now and then, for instance to see if there's some new command you hadn't heard of before.

#### /help -list

/help or /help -list\
This command by itself will show you an overview of all the commands WeeChat has help info for. Useful if you are looking for a specific command but can't quite remember the name of.

#### /help -listfull

I suggest to also have a look at the output of:\
/help -listfull\
which gives you the same list, but now with short descriptions for each of the commands.

### Looking up help info for a setting

Are you curious about one of the options? Need some more *help* for it? Well, you are in luck! WeeChat has a built-in help for all its settings! Let's say we want to know more about the weechat.bar.nicklist.color_delim setting:\
/help weechat.bar.nicklist.color_delim\
![WeeChat's '/help weechat.bar.nicklist.color_delim' help output](https://guides.fixato.org/weechat/images/weechat-tutorial-007-weechat_nicklist_setting_help.png)\
It shows the option name, the description (*default delimiter color for bar*), what kind of value type it expects (*color*), and the values that are allowed (*any of the [WeeChat basic colour names](http://www.weechat.org/files/doc/stable/weechat_user.en.html#colors_basic), or an (extended) [terminal colour number](http://www.weechat.org/files/doc/stable/weechat_user.en.html#colors_extended), or a [colour alias](http://www.weechat.org/files/doc/stable/weechat_user.en.html#colors_aliases).*), it also shows the default and current value.\
For completeness sake I've also included the help text for the help command itself, so you can see that the help command is useful for any setting and any command WeeChat has!

Tab Completion
--------------

Don't feel like typing so much? Then get used to using the `Tab` key to complete the commands you type! WeeChat offers 2 types of completion: *partial* and *full* completion. By default WeeChat performs full completions; meaning it will find the first setting/command/name your text matches, and complete it fully.\
By changing the weechat.completion.partial_completion-* options you can change this behaviour to a partial completion; meaning it will try to complete your keyword as much as it can till it matches multiple options.

### complete_next and complete_previous

With default keybindings, `Tab` will complete to the next option available as it's bound to /input complete_next, while the `Shift`+`Tab` combination will try to complete to the previous available option because it's set to use /input complete_previous.\
**The /input complete_previous command also tries to achieve this by doing a *partial*completion if you haven't already triggered a regular completion; you might want to use this to your advantage.**

> Without completion: do a partial completion, with pending completion: complete with previous completion.
>
> --- [WeeChat Default Keybindings:](http://weechat.org/files/doc/devel/weechat_user.en.html#key_bindings)

### Example of difference between full and partial completion

Let's say a channel has *FiXato* and *FiXatNo* in it.\
Using *full* completion pressing `F` followed by the `Tab` will complete to *FiXato*. However, with *partial*completion it will complete to *FiXat* and then beep, and show you the possible completion options in your status bar (or where you have placed the *completion* bar item.).

### Completion settings

Of course the completion behaviour is also configurable in WeeChat. For instance:

weechat.completion.base_word_until_cursor

if completion in the middle of a word should be completion at the cursor, or the next space

weechat.completion.default_template

the order in which completion results are presented

weechat.completion.nick_add_space

whether spaces need to be inserted after completing a nick

weechat.completion.nick_completer

whether characters need to be inserted after completing a nick

weechat.completion.nick_ignore_chars

which characters in a nick should be ignored

weechat.completion.partial_completion_*

when partial completion should be done by default

weechat.completion.partial_completion_alert

if an alert (beep) should be given on a partial completion

See weechat.completion.* settings for an overview of all the WeeChat completion options available.

Mouse support
-------------

While WeeChat(-curses) is a console-based chat client, that doesn't mean it has no mouse support at all. If your terminal emulator supports (xterm-) mouse reporting, then you can make use of your mouse to control more and more parts of WeeChat. It can for instance be used to switch between windows, or to control the buffers.pl list. It can also be used to insert nicks from your nicklist, or even open query windows from the nicklist.

### How to enable mouse support

Sound great huh? So how to enable this feature? It's easy:\
/mouse enable\
This will change the weechat.look.mouse setting to 'on'.

If you want to see what each mouse command does as you trigger it, you can toggle debugging of mouse commands with:\
/debug mouse\
Debug enabled for mouse (normal)

Clicking somewhere in the screen will now for instance show:

Mouse: button1-event-down, (89,40) -> (89,40)
Mouse: button1-gesture-up, (89,40) -> (89,29)

Or when clicking on a buffer name in buffers.pl:

Mouse: button1-event-down, (6,1) -> (6,1)
Mouse: button1, (6,1) -> (6,1)
Command for key: "hsignal:buffers_mouse"
Sending hsignal: "buffers_mouse"

Scripts
-------

Want to extend WeeChat with your own scripts written in your favourite scripting language? Or use one of the hundreds of user-contributed scripts? Read on and learn how!

### Script Plugins

WeeChat is very extensible. It has support for various plugins, which are C programmes which can call WeeChat functions defined in an interface. Basically this allows you to extend WeeChat with extra low-level functionality, such as support for various scripting languages.

Various WeeChat plugins allow you to write your own scripts for WeeChat in languages such as Perl, Python, Ruby, Lua, TCL and Scheme/Guile, through which you can add functionality to WeeChat.

#### Writing your own Plugins

You can create your own C plugins for WeeChat, but that goes beyond the scope of this guide. Instead, I would refer you to the [Plugins in WeeChat section in the official documentation](http://www.weechat.org/files/doc/stable/weechat_plugin_api.en.html#plugins_in_weechat) and the [WeeChat Plugin API documentation](http://www.weechat.org/files/doc/stable/weechat_plugin_api.en.html#plugin_api).

### Managing Scripts

There are several ways of managing the plethora of scripts that are available. This section will describe them briefly.

#### Manually

As with just about everything in WeeChat, you can install and remove scripts manually.\
You need to download the scripts into *<$WeeChatHomedir>/<$PluginType>/*, where *$WeeChatHomedir* is the directory where all your WeeChat configs are stored (*~/.weechat* by default) and *$PluginType* is the name of the plugin through which the script needs to be loaded.\
So, if you use the default WeeChat config directory, and you are installing the buffers.pl (Perl) script, then you need to download the file to *~/.weechat/perl/* to be able to load the script.\
If you want the script to be auto-loaded, you should create a symlink in the *<$WeeChatHomedir>/<$PluginType>/autoload/* directory:ln -s ../buffers.pl ~/.weechat/perl/autoload/\
Once the file(s) are in place, you can load them through the appropriate plugin's command, for instance to load the buffers script, use:\
/perl load perl/buffers.pl

Unloading scripts can be done through the plugin's unload command, for instance to unload the buffers script:\
/perl unload buffers\
As you can see, you only need the script name for this command.

To list all the Perl scripts, you can use:\
/perl list or /perl listfull

You can also load all the scripts in the autoload directory with the 'autoload' command for each plugin, for instance:\
/python autoload\
As well as reload a specific script:\
/perl reload buffers\
or all scripts in the plugin's autoload directory: /ruby reload

The above commands work for every script plugin, so just replace *perl* with *python*, *ruby*, *lua* or whichever script plugin you have installed and loaded.

#### Through /script (Plugin)

Downloading and loading scripts manually is timeconsuming and a bit cumbersome though, that's why FlashCode created the Script plugin. This plugin adds support for the new /scriptcommand which allows you to load scripts regardless of their scripting language through a single /script command. Apart from that, it also adds a new buffer which will be opened if you issue the /script command with no arguments/parameters:\
![WeeChat's '/script' Script manager buffer](https://guides.fixato.org/weechat/images/weechat-tutorial-008-weechat-script_buffer.png)

##### Titlebar

The /script buffer's title bar shows quite a lot of information help texts such as shortcuts. Let's have a closer look:

-   **234/234:** this shows the number of scripts listed, as well as the total of number of scripts in the repository
-   **(filter: *):** the current active filter. By typing (part of) a word in the input bar followed by enter, you can filter the list of scripts to only those that match your keyword. By default no filtering is used, which is indicated by an asterisk.
-   **Sort: p,n:** this indicates the order of sorting on the list. By default this means the list is sorted first by popularity and next by name. This sort order can be changed via the script.look.sort setting. See /help script.look.sort for all possible keys to sort by.
-   **A list of possible key-combinations.**\
    For instance `Alt`+`i` (or `i` followed by `Enter`) will install the currently selected script.\
    `Alt`+`r` will remove the selected script.\
    'Holding' scripts is also possible, which will prevent those scripts from being upgraded when using the /script upgrade command as well as prevents them from being removed.
-   `q` followed by `Enter` will close the scripts buffer.
-   `$` followed by `Enter` will refresh the list.
-   `s``:` followed by a comma separated list of sort-keys and `Enter` will change the sort order and adjust script.look.sort.
-   `*` followed by `Enter` will reset the filter.
-   With mouse enabled (/mouse enable) you can select scripts with the left mouse button and install them with the right mouse button.

##### Scripts list

The list itself shows a couple of columns. All these columns are configurable through the script.look.columns setting, but I'll describe the default order of columns:

-   The first column can contain an asterisk, indicating the script is a popular script, as well as various flags which indicate if the script is **i**nstalled, **a**utoloaded, **H**eld, **r**unning or has a **N**ew version available.
-   The second column contains the name of the script, as well as the script's language extension.
-   Next is the version number of the script that is currently installed.
-   The purple column contains the version numbers of the scripts that are offered through the script repository.
-   The date displayed is the date at which the script was last updated in the script repository.
-   The short description of the script follows this date.
-   Finally, the tags assigned to the scripts are shown in the last column.

As you can see my version of beep.pl is outdated (indicated by a different version number, as well as the N flag), but that I have also held the version I have (because it has personal changes that I need to merge with the current version and submitted to the WeeChat script repository).\
I have also installed buffers.pl, but it isn't running yet.

#### Through /weeget script (Pre-0.3.9)

The /script plugin was introduced in WeeChat 0.3.9. Before that we had to use the weeget.pyscript if we wanted to manage our scripts. The script still exists, but /script is quite a bit more versatile, so I suggest you upgrade to the latest version of WeeChat. If for some reason you can't, then here's a list of (self-explanatory) useful weeget commands:

-   /weeget list list all the scripts that you currently have installed
-   /weeget list list all the scripts in the official repository
-   /weeget list notify list all the scripts in the official repository that match the text 'notify' or have 'notify' as tag.
-   /weeget install buffers.pl install the buffers.pl script from the official repository
-   /weeget remove buffers.pl remove the buffers.pl script
-   /weeget check check if there are local scripts that need upgrading
-   /weeget upgrade upgrade all your local scripts that have a newer version in the repository.

Managing Servers
----------------

By default WeeChat only comes configured to connect to freenode, but you'll probably want to connect to various other IRC networks. In this section you can learn how to add, delete and edit IRC networks.

### How to add an IRC network?

Let's first have a look at how we can add another IRC network/server connection to WeeChat. The [official WeeChat quickstart manual](http://weechat.org/files/doc/stable/weechat_quickstart.en.html#create_irc_server) mentions the /server command, so let's have a look at the /help server command:

[irc] /server list|listfull [<server>] add <server> <hostname>[/<port>] [-temp] [-<option>[=<value>]] [-no<option>] copy|rename <server> <new_name> del|keep <server> deloutq|jump|raw list, add or remove IRC servers list: list servers (without argument, this list is displayed) listfull: list servers with detailed info for each server add: create a new server server: server name, for internal and display use hostname: name or IP address of server, with optional port (default: 6667), many addresses can be separated by a comm temp: create temporary server (not saved) option: set option for server (for boolean option, value can be omitted) nooption: set boolean option to 'off' (for example: -nossl) copy: duplicate a server rename: rename a server keep: keep server in config file (for temporary servers only) del: delete a server deloutq: delete messages out queue for all servers (all messages WeeChat is currently sending) jump: jump to server buffer raw: open buffer with raw IRC data Examples: /server listfull /server add oftc irc.oftc.net/6697 -ssl -autoconnect /server add oftc6 irc6.oftc.net/6697 -ipv6 -ssl /server add freenode2 chat.eu.freenode.net/6667,chat.us.freenode.net/6667 /server add freenode3 irc.freenode.net -password=mypass /server copy oftc oftcbis /server rename oftc newoftc /server del freenode /server deloutq

So, to add the Chat4All IRC Network (servers: eu.chat4all.org, us.chat4all.org, irc.chat4all.org) with SSL port 6697, and setting it to autoconnect as well to verify the SSL, we have to use:\
/server add Chat4All us.chat4all.org/6697,eu.chat4all.org/6697,irc.chat4all.org/6697 -autoconnect -ssl -ssl_verify\
irc: server Chat4All created

Now that we have a configuration for this network, we can connect to it with /connect Chat4All but as you'll probably see, it will fail because of an SSL error:

Chat4All -- | irc: connecting to server us.chat4all.org/6697 (SSL)... Chat4All -- | gnutls: connected using 2048-bit Diffie-Hellman shared secret exchange Chat4All =!= | gnutls: peer's certificate is NOT trusted Chat4All =!= | gnutls: peer's certificate issuer is unknown Chat4All -- | gnutls: receiving 1 certificate Chat4All -- | - certificate[1] info: Chat4All -- | - subject `C=NL,ST=Noord-Brabant,L=Den Bosch,O=Chat4All,OU=Chat4All IRC,CN=*.chat4all.org,EMAIL=jeroen@wierda.com', issuer `C=NL,ST=Noord-Brabant,L=Den Bosch,O=Chat4All,OU=Chat4All IRC,CN=chat4all.org,EMAIL=jeroen@wierda.com', RSA key 4096 bits, signed using RSA-SHA1, activated `2012-09-20 20:00:41 UTC', expires `2013-09-20 20:00:41 UTC', SHA-1 fingerprint `3dc41c41d0ae2ef99363e31969dd38410b52c74c' Chat4All =!= | irc: TLS handshake failed Chat4All =!= | irc: error: Error in the certificate.

Feel free to stop the reconnection attempts with /disconnect or /disconnect Chat4All

#### Oh no! A certificate error for the network! What now?

So, what does the above error message tell us?\
gnutls: peer's certificate is NOT trusted\
gnutls: peer's certificate issuer is unknown\
The former means that the certificate that's offered by Chat4All isn't trusted, and the latter means that the issuer of the certificate is unknown (and thus not trusted either). [Chat4All's SSL certificates page](https://www.chat4all.org/ircd-certificates/index.html)mentions they are using self-signed certificates, which explains why WeeChat doesn't trust them by default. Luckily, [Chat4All's wiki](http://wiki.chat4all.org/) has a page that describes [how to import Chat4All's CA into WeeChat](http://wiki.chat4all.org/index.php/SSL_CA_import_instructions#weechat).

#### Checking for, and updating the trusted certificate authorities files.

Let's first find out where WeeChat is currently looking for the CA (certificate authorities) file, which defines which CAs are trusted:\
/set weechat.network.gnutls_ca_file\
For me this returned:\
weechat.network.gnutls_ca_file = "/etc/ssl/certs/ca-certificates.crt"

As we'll want to add our own trusted CA certificates to this file (and probably don't have write access to this file), we'll change this setting so it points to a file in our WeeChat home directory:\
/set weechat.network.gnutls_ca_file %h/ssl/trusted_CAs.crt\
Since this file probably doesn't exist yet, we'll have to copy the server's CA file here as well, so let's open another command shell and do so:\
mkdir -p ~/.weechat/ssl/\
cp /etc/ssl/certs/ca-certificates.crt ~/.weechat/ssl/trusted_CAs.crt\
(Assuming your WeeChat configuration/homedir is located in the default location of ~/.weechat)

##### Retrieving and merging the Chat4All CA certificate.

With the existing trusted CAs file in place, we can download Chat4All's certificate authority file:\
curl https://www.chat4all.org/ircd-certificates/chat4all-ca.pem -o ~/.weechat/ssl/chat4all-ca.pem

Afterwards we want to verify that it hasn't been altered by checking that the SHA512 sum matches the one mentioned on the website:\
sha512sum ~/.weechat/ssl/chat4all-ca.pem\
4ad04a5ac6eb9e599403e1af99f38792a23ec9e90149ae744eb4088da14aded7cc0cbe0ffa63a9c33b9f63321ef3749f2193f0faa56233d0ded43890ea2c177b ~/.weechat/ssl/chat4all-ca.pem

Now we can merge it with the existing trusted_CAs.crt file by concatenating it:\
cat ~/.weechat/ssl/chat4all-ca.pem >> ~/.weechat/ssl/trusted_CAs.crt

##### Reconnecting to Chat4All

If you try to connect to the network now, it should connect normally without errors:\
/reconnect Chat4All

Chat4All -- | irc: connecting to server us.chat4all.org/6697 (SSL)... Chat4All -- | gnutls: connected using 2048-bit Diffie-Hellman shared secret exchange Chat4All -- | gnutls: peer's certificate is trusted Chat4All -- | gnutls: receiving 1 certificate Chat4All -- | - certificate[1] info: Chat4All -- | - subject `C=NL,ST=Noord-Brabant,L=Den Bosch,O=Chat4All,OU=Chat4All IRC,CN=*.chat4all.org,EMAIL=jeroen@wierda.com', issuer `C=NL,ST=Noord-Brabant,L=Den Bosch,O=Chat4All,OU=Chat4All IRC,CN=chat4all.org,EMAIL=jeroen@wierda.com', RSA key 4096 bits, signed using RSA-SHA1, activated `2012-09-20 20:00:41 UTC', expires `2013-09-20 20:00:41 UTC', SHA-1 fingerprint `3dc41c41d0ae2ef99363e31969dd38410b52c74c' Chat4All -- | irc: connected to us.chat4all.org/6697 (69.64.52.243)

By adding the CA certificate of Chat4All we now trust any certificate signed with this CA cert. If you don't want to trust the CA, but only the server's certificate, you can also use the Chat4All server certificate instead.

### Let's change freenode's settings

The default settings of freenode might allow you to connect without problems, but perhaps you want to change some of the settings, for instance to use an SSL connection instead. So, let's see what settings WeeChat has for the freenode server:\
/set *freenode*

[server] (irc.conf) irc.server.freenode.addresses = "chat.freenode.net/6667" (default: (undefined)) irc.server.freenode.anti_flood_prio_high irc.server.freenode.anti_flood_prio_low irc.server.freenode.autoconnect irc.server.freenode.autojoin irc.server.freenode.autoreconnect irc.server.freenode.autoreconnect_delay irc.server.freenode.autorejoin irc.server.freenode.autorejoin_delay irc.server.freenode.away_check irc.server.freenode.away_check_max_nicks irc.server.freenode.capabilities irc.server.freenode.command irc.server.freenode.command_delay irc.server.freenode.connection_timeout irc.server.freenode.default_msg_part irc.server.freenode.default_msg_quit irc.server.freenode.ipv6 irc.server.freenode.local_hostname irc.server.freenode.nicks irc.server.freenode.notify irc.server.freenode.password irc.server.freenode.proxy irc.server.freenode.realname irc.server.freenode.sasl_mechanism irc.server.freenode.sasl_password irc.server.freenode.sasl_timeout irc.server.freenode.sasl_username irc.server.freenode.ssl irc.server.freenode.ssl_cert irc.server.freenode.ssl_dhkey_size irc.server.freenode.ssl_priorities irc.server.freenode.ssl_verify irc.server.freenode.username 34 options (matching with "*freenode*")

Remember that you can use /help on each of the settings for more information about the setting, for instance: /help irc.server.freenode.addresses

Let's switch this connection over to SSL! First we have to change the port we will connect to:\
/set irc.server.freenode.addresses chat.freenode.net/6697\
Of course SSL needs to be enabled too, and we want the certificate to be verified:\
/set irc.server.freenode.ssl on\
/set irc.server.freenode.ssl_verify on\
The [WeeChat F.A.Q. item "How can I connect to freenode server using SSL?"](http://www.weechat.org/files/doc/weechat_faq.en.html#irc_ssl_freenode) also mentions that the dhkey_size needs to be set to 1024:\
/set irc.server.freenode.ssl_dhkey_size 1024

#### Auto-join channels on freenode

We also want to autojoin the channels [#weechat](irc://chat.freenode.net:6697/#weechat) and [#weechat-offtopic](irc://chat.freenode.net:6697/#weechat-offtopic), so let's also add those:\
/set irc.server.freenode.autojoin #weechat,#weechat-offtopic

#### Auto-identify for your registered nickname on freenode

Since freenode supports SASL authentication, you can use this to identify for your registered nickname.\
dh-blowfish is a SASL mechanism, so let's set it as default SASL mechanism:\
/set irc.server_default.sasl_mechanism dh-blowfish\
Now you can also set your registered nickname and password for freenode:\
/set irc.server.freenode.sasl_username "ReplaceThisWithYourRegisteredNickname"/set irc.server.freenode.sasl_password "ReplaceThisWithYourNickname'sPassword"

Now you should be all set to /connect freenode or /reconnect freenode.

### Deleting a network/server:

If you no longer want an IRC network/server listed, then you can delete it with the /server delcommand, for instance to delete the just-configured Chat4All network:\
/server del Chat4All

### Renaming a network/server:

Let's say that instead of deleting the Chat4All network from our configuration, we want to rename it to c4a, then you can use:\
/server rename Chat4All c4a

Suggested settings
------------------

This section will describe a couple of settings I personally quite like:

### Expand title and input bars over multiple lines

By default the title and input bars will only fill a single line because their size is set to 1, however, you can quite easily extend this to 2 or more lines in case it needs more space than a single line offers.

Set the maximum number of lines to 2 for the title bar and 3 for the input bar:\
/set weechat.bar.title.size_max 2\
/set weechat.bar.input.size_max 3

Set the size (number of lines) to auto (0) for the title and input bars:\
/set weechat.bar.title.size 0\
/set weechat.bar.input.size 0

Suggested / My keybinds
-----------------------

This section will describe a couple of keybinds I personally quite like. It overrides some of the [Default WeeChat Key bindings](http://weechat.org/files/doc/devel/weechat_user.en.html#key_bindings), so be careful.\
Note that I use /input grab_key_command *(`meta`+`k`)* and /input grab_key *(which I assigned myself to `meta`+`Shift`+`k`)* a lot to get the correct WeeChat key descriptions for the keyboard shortcuts / key combinations, as these might differ between the various terminal emulators.

### Alt+Backspace deletes previous word

/key bind `Esc``k` `Alt`+`Backspace` /input delete_previous_word

Most likely this will show: /key bind meta-ctrl-? /input delete_previous_word and will allow you to delete the previous word with `Alt`+`Backspace`

### Grab key with meta shift+k

/key bind meta-K /input grab_key

The default keybind meta-k (lowercase) will insert the key description, as well as the command the key is bound to. This new keybind meta-K (uppercase) will only insert the key description, useful if you don't care if the keyboard combination is already bound to some other command.

### Switch between windows with CTRL + cursor keys

-   /key bind `Esc``shift`+`k` `CTRL`+`↑` /window up
-   /key bind `Esc``shift`+`k` `CTRL`+`↓` /window down
-   /key bind `Esc``shift`+`k` `CTRL`+`←` /window left
-   /key bind `Esc``shift`+`k` `CTRL`+`→` /window right

Please note that `CTRL`+`→` and `CTRL`+`←` are bound by default to move between the next and previous words.\
Also note that `CTRL`+`↑` and `CTRL`+`↓` are bound by default to go through the previous and next *global* history items.\
However, personally I prefer to have these simple keyboard shortcuts bound to window switching as I have a bunch of vertical and horizontal window splits.

### Go to next and previous word with alt + left/right cursor keys

-   /key bind `Esc``shift`+`k` `Alt`+`←` /input move_previous_word
-   /key bind `Esc``shift`+`k` `Alt`+`→` /input move_next_word

Please note that `Alt`+`→` and `Alt`+`←` are bound by default to move to the next (/buffer +1) and previous (/buffer -1) buffers.\
However, personally I prefer to have these simple keyboard shortcuts bound to jumping between words, (even though most editors use ctrl+cursor keys for this). I might someday switch my alt and ctrl behaviour around, but I kinda have got used to this behaviour...

### Complete word with mouse gesture to the right in input bar

/key bindctxt mouse @bar(input):button1-gesture-right /input complete_next will trigger completion (similar to pressing tab) if you click-drag with your mouse to the right in the input bar. This might not sound very useful at first, but I find it rather useful while using WeeChat from my mobile phone which lacks a tab key on the on-screen keyboard.

Suggested / My aliases
----------------------

WeeChat comes with an excellent Alias module, which allows for you to add your own client-side commands. You can use this for shortening existing commands (/close instead of /buffer closefor instance), to combine various commands into a single command, or to alias often used replies.

### Prefixed opnotice/wallchops

Since not everyone recognises ops-only channel notices (/opnotice or /wallchops $*) for what they are (possibly because some clients show them as regular (channel) notices), I've added this little alias myself:

/alias onotice /input insert /opnotice [ops-only notice] $1-

This will insert /opnotice [ops-only notice] whatever was typed after the /onotice command on the input bar. You could leave out the /input insert part as well so it sends directly, but I like to review the command before hitting enter again.

Alternatively, if you also want to include the channel name, you could also use the following alias:/alias onotice /opnotice [@$channel] $1-\
This will make the wallchops show up as [@#weechat] Hello world! instead.

### /alot

Because I love Alots a lot, I've added this little alias that inserts the url of the pages describing what an alot is, onto the input bar:

/alias alot /input insert http://hyperboleandahalf.blogspot.com/2010/04/alot-is-better-than-you-at-everything.html

These kinds of aliases are useful if you frequently need a certain page of which you can't remember the URL.

### Buffer Move

Before buffers.pl got mouse support which allows you to click and drag buffers around to where you want them, I used the following alias to move buffer $1 to position $2:

/alias bmove /buffer $1; /buffer move $2

But I would suggest you just use buffers.pl and enable mouse support instead, so you can click-and-drag the buffers in the right order.

### /recursion

Inspired by the [xkcd comic "No Recursion!"](https://xkcd.com/244/) and the [Google Search for "recursion"](https://encrypted.google.com/search?q=recursion&ie=utf-8&oe=utf-8&hl=en), I wrote this silly alias:

/alias recursion /input insert /recursion

![xkcd.com comic 'No Recursion!'](https://imgs.xkcd.com/comics/tabletop_roleplaying.png)

### Punglasses

Inspired by the various pun/sunglasses moments from [CSI: Miami](https://www.youtube.com/watch?v=mznsEcZlM2I), I wrote this silly set of 3 aliases:

/alias pun1 /input insert ( ಠ_ಠ)\
/alias pun2 /input insert ( ಠ_ಠ)>--■-■\
/alias pun3 /input insert (-■_■) YEAAAAAAAAAAAAAAAAAAAAAHHHHHHHHHHHH

Now isn't that.... punderful? =)

### /lookaround

another silly alias making it look like I am looking around the channel:

/alias lookaround /input insert /me looks around ('-' ) (._. ) (o_o) ( ._.) ( '-')

... see what I did there? ;-)

### /mynames alias if you filter the /names response

Useful if you filter the list of nicks (from /names for instance) by default, but do want to show them when you manually do a names lookup. It will disable the filter for 3 seconds and then automatically re-enable them:

/filter add nicks * irc_366 *\
/filter enable nicks\
/alias mynames /names;/filter toggle nicks; /wait 3s /filter toggle nicks

As you can see, this alias links several commands together by splitting them with the ; (semi-colon) character.

### /konamicode

/alias konamicode /input insert ↑ ↑ ↓ ↓ ← → ← → B A ((select) start)

cheatmode enabled!

### /irc-analogy

/alias irc-analogy /input insert an IRC server is like a shopping mall. It provides space for various shops. While the mall owner (read: the server's staff) might control some of the shops (read: channels), most of them are 'owned' (registered) by individual parties (channel founders). Each of the shops (channels) usually have their own subject/topic of conversation and their own rules and guidelines. All of the shops (channels) can be reached via the main entrance (any IRC client connected to the server's address), but some of them might have their own entrance (an IRC applet/client on their own website). So, the fact that you have connected through website X about subject Y, doesn't mean all other channels belong to the same website / share the same topic of conversation.

... because I got tired of manually explaining that most channels on Esper.net aren't about minecraft...

### /irc-clients

/alias irc-clients /input insert http://wiki.chat4all.org/index.php/IRC-Client

A list of IRC clients with screenshots that I have assembled along with some other Chat4All operators.

### An alias linking to a youTube video that explains what a hacker really is

/alias Hacker_what_is_a /input insert /pt http://www.youtube.com/watch?v=hoDOrKZK3Kg

The /pt command is provided by the pagetitle.py script and will insert the URL's page title after the URL.

### /gangnam

/alias gangnam /say ヽ(゜∇゜)ノ Eeeeyyyy sexy laaaaaadyyyy;/say ヘ(￣ー￣ヘ) Op (ノ￣ー￣)ノ Op (〜￣▽￣)〜 Op 〜(￣△￣〜) Op;/say (☞ﾟ∀ﾟ)☞ Oppan Gangnam Style;/say ヾ(⌐■_■)ノ♪

Gangnam IRC Style!

### /dances

/alias dances /input insert ┌(・。・)┘ ♪ └(・。・)┐ ♪ ┌(・。・)┘ $1-

Get your feet off the ground!

### Come at me bro!

/alias bro /input insert ლ(°◡°ლ)

*shakes fist

How to install themes.
----------------------

WeeChat currently still doesn't have an official way to install or export themes, but FlashCode did write an alpha script, [theme.py](http://weechat.org/files/temp/theme/theme.py) for it a while ago, as well as a [WeeChat Themes page](http://weechat.org/themes/).\
Judging by [this reddit question](http://www.reddit.com/r/linuxquestions/comments/16nhbz/how_does_one_install_a_weechat_theme/), the script is still confusing to people though, so I'll write some details about it.

If you put this (alpha) script in ~/.weechat/python/ (or wherever your weechat userdir resides), and load it with /script load theme.py then you can get the help text with: /help theme:

[python/theme]  /theme  list []
                        info|show []
                        install
                        installfile
                        undo
                        save
                        backup
                        restore
                        export [-white] WeeChat theme manager

       list: list themes (search text if given)
       info: show info about theme (without argument: for current theme)
       show: show all options in theme (without argument: for current theme)
    install: install a theme from repository
installfile: load theme from a file
       undo: undo last theme install
       save: save current theme in a file
     backup: backup current theme (by default in ~/.weechat/themes/_backup.theme); this is done the first time script is loaded
    restore: restore theme backuped by script
     export: save current theme as HTML in a file (with "-white": use white background in HTML)

Examples:
  /theme save /tmp/flashcode.theme => save current theme

It is worth noting that /theme save, /theme installfile and /theme export require an expanded path, so you can't use ~ to indicate your homedir.

To save your theme, you can use: /theme save /home/fixato/.weechat/themes/fixato-20130428.theme\
This should return: Theme saved to "/home/fixato/.weechat/themes/fixato-20130428.theme"

To load your theme, you can use: /theme load /home/fixato/.weechat/themes/fixato-20130428.theme\
This should return: Theme saved to "/home/fixato/.weechat/themes/_undo.theme"\
Theme "/home/fixato/.weechat/themes/fixato-20130428.theme" installed (103 options set)

You can also export how the theme would look, to an HTML file with: /theme export /home/fixato/fixato.org/guides/weechat/fixato-20130428.html\
Which should return: Theme exported as HTML to "/home/fixato/fixato.org/guides/weechat/fixato-20130428.html"\
The resulting HTML file is available at: <http://fixato.org/guides/weechat/fixato-20130428.html>.

You can find a bunch of themes that users have created with it on <http://weechat.org/themes/>

Script Snippets
---------------

What follows are some script snippets from my scripts that you could use while coding your own scripts

### Retrieve target msgbuffer:

Want to follow the user-defined target msgbuffer settings, then use the following Python function to retrieve the appropriate buffer pointer based on the server and nickname:

def find_buffer(server, nick, message_type='whois'):
    # See if there is a target msgbuffer set for this server
    msgbuffer = weechat.config_string(weechat.config_get('irc.msgbuffer.%s.%s' % (server, message_type)))
    # No whois msgbuffer for this server; use the global setting
    if msgbuffer == '':
        msgbuffer = weechat.config_string(weechat.config_get('irc.msgbuffer.%s' % message_type))

    # Use the fallback msgbuffer setting if private buffer doesn't exist
    if msgbuffer == 'private':
        buffer = weechat.buffer_search('irc', '%s.%s' %(server, nick))
        if buffer != '':
            return buffer
        else:
            msgbuffer = weechat.config_string(weechat.config_get('irc.look.msgbuffer_fallback'))

    # Find the appropriate buffer
    if msgbuffer == "current":
        return weechat.current_buffer()
    elif msgbuffer == "weechat":
        return weechat.buffer_search_main()
    else:
        return weechat.buffer_search('irc', 'server.%s' % server)

### Set default settings:

The following snippet can be used to set some default settings for your Python script:

my_settings = (
  ("your_settingname", "default value for your_settingname", "Description for your_settingname."),
  ("sort_order", "users", "Last used sort order for the channel list."),
)
version = weechat.info_get("version_number", "") or 0
for option, default_value, description in my_settings:
   if not weechat.config_is_set_plugin(option):
       weechat.config_set_plugin(option, default_value)

       if int(version) >= 0x00030500:
           weechat.config_set_desc_plugin(option, description)

YourBNC Configuration
---------------------

[YourBNC](https://yourbnc.co.uk/) is one of several free IRC Bouncer providers out there. After receiving some questions on Esper.net about how to set up WeeChat for it, I decided to add this small section to my guide, in the hopes some will find it useful.\
Should there be any errors, feel free to find me on the Esper network, or in #WeeChat on freenode.

### Legend to the examples format

In the following command examples, you will see certain $variables. You will need to replace these with some variable such as a username or password given by YourBNC, or for instance in the case of $WeeChatServerName, with a value you've picked yourself. If you hover over these variables, you should get a title-tooltip with an example value.

### Adding a server config for YourBNC

There are two ways to add a new server to WeeChat. A temporary one (/connect), and a permanent one (/server add). A *temporary* server will be deleted once you exit WeeChat, while the *permanent*one will still be there after you restart your WeeChat client.\
It is possible to turn a temporary server into a permanent one with the /server keep $WeeChatServerName command though.

#### Add YourBNC as a regular (non-SSL) server:

/connect $server_address/2222 -nossl -password=$username/$network:$password

/server add $WeeChatServerName $server_address/2222 -nossl -password=$username/$network:$password

#### Add YourBNC as an SSL-enabled server:

/connect $server_address/2223 -ssl -nossl_verify -password=$username/$network:$password

/server add $WeeChatServerName $server_address/2223 -ssl -nossl_verify -password=$username/$network:$password

The $WeeChatServerName variable determines by what name the server is known within WeeChat. All settings for this server will be stored within the irc.server.$WeeChatServerName.* namespace. This does not have to equal the server address, and can also be just a single word, such as 'YourBNC'.\
For instance, if you fill in YourBNC in place of $WeeChatServerName, all the server's WeeChat settings will be stored within the irc.server.YourBNC.* namespace.

The -nossl_verify argument is used to accept the StartCom SSL certificates of YourBNC, as it would otherwise be rejected due to hostname of the certificate (www.yourbnc.co.uk), not matching the hostname of the server, as well as the certificate and certificate issuer (StartCom) generally not being trusted/known by the IRC client.

##### SSL Fingerprint verification

If you want some extra assurance that the SSL certificate matches the one issued to YourBNC, you could ask YourBNC for the current certificate's *fingerprint*. At the time of writing, this would be *f2496dfd2562c749e70d871849f72eabe56ea90f*. You can then tell WeeChat to always verify the SSL's fingerprint against this one.\
If you've already added the server, you can use:

/set irc.server.$WeeChatServerName.ssl_fingerprint f2496dfd2562c749e70d871849f72eabe56ea90f

If the SSL certificate's fingerprint has changed, then WeeChat should now refuse to connect to the server. Remember that while it could indicate that someone is attempting a MitM-attack, it could also just be that YourBNC has renewed their certificate.

If you haven't added the server yet, just add the -ssl_fingerprint=f2496dfd2562c749e70d871849f72eabe56ea90f argument to the aforementioned /connect or /server add commands:

/connect $server_address/2223 -ssl -nossl_verify -ssl_fingerprint=f2496dfd2562c749e70d871849f72eabe56ea90f -password=$username/$network:$password

/server add $WeeChatServerName $server_address/2223 -ssl -nossl_verify -ssl_fingerprint=f2496dfd2562c749e70d871849f72eabe56ea90f -password=$username/$network:$password

### Adding auto-join channels:

You can also add various channels to your auto-join by adding the -autojoin=#chan1,#chan2,#chanN argument to the aforementioned /connect or /server addcommands:

/server add $WeeChatServerName $server_address/2223 -ssl -nossl_verify -autojoin=#chan1,#chan2,#chan3 -autoconnect -password=$username/$network:$password

Alternatively, you can also manually set/adjust the relevant setting for WeeChat with:

/set irc.server.$WeeChatServerName.autojoin #chan1,#chan2,#chanN

Though I would suggest to just join the channels you want to auto-join and then use the autojoin.pyscript to add all your joined channels to autojoin setting for each server: /autojoin --run.\
If you have a recent enough version of WeeChat, you can install this script with: /script install autojoin.py

Or just let the bnc keep you connected to the channels you join; though personally I like to keep a local backup of my auto-join channels too.

### Remember to /save

As with any settings you change, do remember to call the /save command to write the setting changes to the config file on disk, so they will persist after you exit WeeChat.

### Further Reading

If you want to learn more about the /server command, please check out the [Managing Servers in WeeChat](https://guides.fixato.org/weechat/#managing_servers) section, where I go into some more details about managing your IRC server connections within WeeChat.

If you want to know more about scripts, do check out the [Scripts-section](https://guides.fixato.org/weechat/#Scripts-section).

Want to know more about elaborate split window layouts? Have a look at the [Unicode representation of my current WeeChat (IRC) screen layout](http://fixato.org/weechat_layout.html).

Recent Changes:
---------------

-   2013-03-18:
    -   Added a section about [managing servers](https://guides.fixato.org/weechat/#managing_servers) which includes instructions on [how to trust additional certificate authorities](https://guides.fixato.org/weechat/#trusted_certificate_authorities_file)
    -   Added a sub-section about [changing freenode's server settings](https://guides.fixato.org/weechat/#adjusting_freenode_settings) such as [auto-identifying on freenode](https://guides.fixato.org/weechat/#autoidentify_on_freenode)
-   2013-04-28:
    -   Added a section with [Script Snippets](https://guides.fixato.org/weechat/#script-snippets). The first 2 snippets are [find target msgbuffer](https://guides.fixato.org/weechat/#snippet-find_buffer) and [set your script's default settings](https://guides.fixato.org/weechat/#snippet-default_settings).
    -   Added a section describing [how to install themes](https://guides.fixato.org/weechat/#howto-install-themes).
-   2014-03-29:
    -   Added the [YourBNC configuration section](https://guides.fixato.org/weechat/#bnc-yourbnc).
-   2015-02-25
    -   Added a link to the [Unicode representation of my current WeeChat (IRC) screen layout](http://fixato.org/weechat_layout.html)

To be continued
---------------

As you can see, this guide is still far from finished. I'll try to update it in the coming weeks.

### Topics I might cover:

-   Client SSL user certificate support (NickServ CertFP et al.
-   Splitting windows
-   Using buffers.pl
-   Setting up growl support
-   Backing up your configs
-   Logger plugin configuration
-   highmon.pl + chanmon.pl
-   Closer look at iset.pl
-   Using shell.py
-   Setting up aspell and various spelling correction scripts
-   How to enable mouse support in your terminal emulator
-   Auto-away with screen_away.py
-   Changing the colours of various WeeChat items / theming
-   URLs and the dozens of link shorteners
-   Toggle nicklist/timestamps scripts
-   filters and ignore

Contact FiXato
==============

You can contact FiXato through one of the many social networks he is part of:
