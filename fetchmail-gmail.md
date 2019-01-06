\
[Axllent.org](https://www.axllent.org/)

Gmail POP3 with fetchmail
=========================

20 Jan 2014 in [Networking](https://www.axllent.org/docs/tag/networking/)

[Gmail](http://mail.google.com/) provides users with a free 15GB+ mailbox for storing all their mail. There are 3 main interfaces to access their mail, the main one being HTTPS (secure web) access, the others being IMAP & POP3. The thing to note is that Gmail only allows [SSL](http://en.wikipedia.org/wiki/Secure_Sockets_Layer) connections for POP3 & SMTP.

This short tutorial will show you how to download your mail automatically from your Gmail account every 5 minutes using fetchmail.

Requirements
------------

-   Gmail configured to allow pop3 mail downloading for your account: Settings => Forwarding and POP in your Gmail web account.
-   openssl
-   fetchmail with SSL support If you are not sure if your fetchmail has SSL support, check with:

```
ldd /usr/bin/fetchmail
       linux-gate.so.1 =>  (0xffffe000)
       libcrypt.so.1 => /lib/libcrypt.so.1 (0xb7fb7000)
       libresolv.so.2 => /lib/libresolv.so.2 (0xb7fa2000)
       libssl.so.0.9.7 => /usr/lib/libssl.so.0.9.7 (0xb7f71000)
       libcrypto.so.0.9.7 => /usr/lib/libcrypto.so.0.9.7 (0xb7e6e000)
       libc.so.6 => /lib/libc.so.6 (0xb7d56000)
       libdl.so.2 => /lib/libdl.so.2 (0xb7d52000)
       /lib/ld-linux.so.2 (0xb7feb000)
```

If you see something like `libssl.so.0` then yours has it.

Getting the certificates
------------------------

Your Linux distribution should come with the package `ca-certificates` either installed or installable, and this is by far the recommended method to verify that you are in fact connected to the Google servers.

If you are getting errors because fetchmail cannot authenticate the certificates then make sure you install these ca-certificates.

Testing certificates
--------------------

To confirm we have the correct and working certificates, let us make an SSL connection to the Gmail server testing our 2 new certificates:

```
openssl s_client -connect pop.gmail.com:995
... ...
---
+OK Gpop ready for requests from ....
```

There should be much more data in between, however the important thing to note is the final (or similar) `+OK Gpop ready for requests from` .... If not, please retrace the above steps to confirm you have it correct.

Setting up fetchmail
--------------------

We need to configure our `~/.fetchmailrc` file to check every 5 minutes automatically if we have mail, and if so to download it. Please **do not** check more often than every 5 minutes, else google may block or ban you, as that just overloads their systems. For this fetchmail example I am going to use the username (locally on the system) as user5, the Gmail address of spammesilly@gmail.com, and the password of secretpassword:

```
# set username
set postmaster "user5"
# set polling time (5 minutes)
set daemon 600

poll pop.gmail.com with proto POP3
   user 'spammesilly@gmail.com' there with password 'secretpassword' is user5 here options ssl
```

Right, save the file, and now we can do a test verbosely to see if it works. Note: mail will be downloaded into your system-default mailbox, depending on your system. Hopefully you already know where that is located. Do the verbose test with:

```
fetchmail -d0 -vk pop.gmail.com
fetchmail: 6.2.5.2 querying pop.gmail.com (protocol POP3) at Sun Dec 18 00:24:05 2005: poll started
fetchmail: Issuer Organization: Equifax
fetchmail: Unknown Issuer CommonName
fetchmail: Server CommonName: pop.gmail.com
fetchmail: pop.gmail.com key fingerprint: 59:51:61:89:CD:DD:B2:35:94:BB:44:97:A0:39:D5:B4
fetchmail: POP3< +OK Gpop i34pf3725375wxd ready.
fetchmail: POP3> CAPA
fetchmail: POP3< +OK Capability list follows
fetchmail: POP3< USER
fetchmail: POP3< RESP-CODES
fetchmail: POP3< EXPIRE 0
fetchmail: POP3< LOGIN-DELAY 300
fetchmail: POP3< X-GOOGLE-VERHOEVEN
fetchmail: POP3< .
fetchmail: POP3> USER spammesilly@gmail.com
fetchmail: POP3< +OK send PASS
fetchmail: POP3> PASS *
fetchmail: POP3< +OK Welcome.
fetchmail: POP3> STAT
fetchmail: POP3< +OK 0 0
fetchmail: No mail for spammesilly@gmail.com at pop.gmail.com
fetchmail: POP3> QUIT
fetchmail: POP3< +OK Farewell.
fetchmail: 6.2.5.2 querying pop.gmail.com (protocol POP3) at Sun Dec 18 00:24:10 2005: poll completed
fetchmail: normal termination, status 1
```

Your output might be longer if you had mail waiting already for you to download from Gmail. This above example had an empty mailbox, but as you see it logged in successfully, and logged out successfully too.

If this is all working fine, then you can start your fetchmail daemon with the command:

```
fetchmail
```

* * * * *

If this has helped you and you wish to show your appreciation, then please feel free to [donate a little](https://www.axllent.org/donate/) to keep this site running.

* * * * *

User Comments
-------------
