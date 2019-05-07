Opensnitch - block programs accessing internet, tutorial for newbies by a newbie

Opensnitch is a program to allow/deny internet access for applications.

I'm running Mint 19 which is on Ubuntu 18.04, so this tutorial is for this version.

First we need to setup the GO dependency path.

Type everything like you see:

echo "export GOPATH=\$HOME/.go" >> ~/.bashrc

echo "export PATH=\$PATH:\$GOROOT/bin:\$GOPATH/bin:\$HOME/.local/bin:\$HOME.bin >> ~/.bashrc"

source ~/.bashrc

Other versions of Linux might look for .bash_profile instead of .bashrc

Now download GO and other dependencies needed for OpenSnitch:



sudo apt install golang-go python3-pip python3-setuptools python3-slugify protobuf-compiler

libpcap-dev libnetfilter-queue-dev python-pyqt5 pyqt5-dev pyqt5-dev-tools git



(if you are a new user like me you might want to know that everything is downloaded from the

official repository archive.ubuntu.com if you did not change the sources of the software download)

Now lets start building GO and Snitch and run it. (the GO files and Snitch are downloaded from GitHub links)



go get github.com/golang/protobuf/protoc-gen-go

go get -u github.com/golang/dep/cmd/dep

python3 -m pip install --user grpcio-tools

go get github.com/evilsocket/opensnitch

cd $GOPATH/src/github.com/evilsocket/opensnitch

make

sudo make install

sudo systemctl enable opensnitchd

sudo service opensnitchd start

opensnitch-ui



Snitch is now running. You can view the log at /var/log/opensnitchd.log or from the UI that launched in lower right

of the screen.

The rules are in /etc/opensnitchd/rules.

The configuration is at ~/.opensnitch/ui-config.json (I highly suggest to change them because by default the Snitch will close the pop up windows with

rules after 15 seconds - "default_timeout": 15, change to whatever number you like.) "default_action" can be set to 'deny', 'allow' and "default_duration"

can be 'once' 'until restart' 'always'.

If you are on Mint like me you can setup the program to boot on start by opening it at 'startup applications' in the 'preferences' in the Mint menu.

If after booting there is no UI but the program is working, set the delay of application start to 1 second and it will fix this.

There is a bug and if you open UI and 'general' tab it will use 100% CPU, so just avoid this tab and check the log from the log file if you want to.
