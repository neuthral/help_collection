Tizonia on Docker container
===========================

Containerized [Tizonia](http://www.tizonia.org/) cloud music player that uses the host's sound system.

Audio Output
------------

Tizonia connects as a client directly to the hosts PulseAudio server and uses\
its configuration/devices to output the sound. This is achieved by mapping the\
UNIX socket used by PulseAudio in the host into the container and configuring\
its use.

> Credits: Method borrowed from [docker-pulseaudio-example](https://github.com/thebiggerguy/docker-pulseaudio-example).

Launch Command
--------------

Use the convenience script [docker-tizonia](https://hub.docker.com/r/tizonia/docker-tizonia/docker-tizonia):

```
#!/bin/bash

USER_ID=$(id -u);
GROUP_ID=$(id -g);

docker run -it --rm\
    -e PULSE_SERVER=unix:${XDG_RUNTIME_DIR}/pulse/native\
    --volume=${XDG_RUNTIME_DIR}/pulse:${XDG_RUNTIME_DIR}/pulse\
    --volume="${HOME}/.config/tizonia":/home/tizonia/.config/tizonia\
    --volume "${HOME}/.config/pulse/cookie":/home/tizonia/.config/pulse/cookie\
    --name tizonia\
    tizonia/docker-tizonia "$@";

```

The script bind mounts the host's '$HOME/.config/tizonia' to make\
'tizonia.conf' available inside the container.

> NOTE: The Tizonia process running inside the container needs 'rwx'\
> permissions on this directory.

Once the script is in your path, and the permissions of '$HOME/.config/tizonia'\
have been changed, just use the usual Tizonia commands:

```

# Change Tizonia's config dir permissions
$ chmod a+wrx $HOME/.config/tizonia

# Install the wrapper script in a location in your PATH
$ sudo install docker-tizonia /usr/local/bin

# Pass the usual Tizonia commands to the wrapper
$ docker-tizonia --youtube-audio-mix-search "Queen Official"

```

License
=======

The [Unlicense](https://hub.docker.com/r/tizonia/docker-tizonia/LICENSE.md).

Tizonia's main repo
===================

See [tizonia-openmax-il](https://github.com/tizonia/tizonia-openmax-il).
