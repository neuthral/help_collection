### HOWTO: ffmpeg & x264 presets

As discussed [earlier](http://juliensimon.blogspot.com/2008/12/howto-quick-reference-on-audio-video.html), the ffmpeg command line can be quite daunting, especially when used to encode x264 video...

Wouldn't it be nice to store your favorite options in a configuration file once and for all? Yes it would and yes you can!

Finding the ffmpeg / x264 preset files

Just head for the ffmpeg source and look at the ffpresets directory:\
`\
ubuntu% cd ffmpeg/ffpresets\
ubuntu% ls\
libx264-default.ffpreset libx264-hq.ffpreset libx264-normal.ffpreset\
libx264-fastfirstpass.ffpreset libx264-max.ffpreset\
`\
Nice. Let's copy these to your ffmpeg configuration directory:\
`\
ubuntu% mkdir ~/.ffmpeg\
ubuntu% cp *.ffpreset ~/.ffmpeg`

A (terrifying) look at a preset file

What do you find in a preset file? Well, a long list of ffmpeg flags related to H.264 encoding:\
`\
ubuntu% cat libx264-normal.ffpreset\
coder=1\
flags=+loop\
cmp=+chroma\
partitions=+parti8x8+parti4x4+partp8x8+partb8x8\
me_method=hex\
subq=6\
me_range=16\
g=250\
keyint_min=25\
sc_threshold=40\
i_qfactor=0.71\
b_strategy=1\
qcomp=0.6\
qmin=10\
qmax=51\
qdiff=4\
bf=16\
refs=2\
directpred=3\
trellis=0\
flags2=+bpyramid+wpred+dct8x8+fastpskip\
`\
Ouch! Welcome to the wonderful world of H.264 encoding ;)

Keep in mind that these are ffmpeg flags (not x264 flags), so although they really are meant to configure the x264 encoding process, they differ from the actual flags that you would pass directly to the x264 encoder. To ease the pain of translating and understanding these flags, you will certainly need:

-   this [mapping guide](http://ffmpeg.x264.googlepages.com/mapping) written by one of the ffmpeg developers,
-   this [detailed list](http://mediacoder.sourceforge.net/wiki/index.php/X264_Options_Explained) of x264 flags, and I guess [this guide](http://en.wikibooks.org/wiki/MeGUI/x264_Settings) too,

-   the doom9 [forum](http://forum.doom9.org/forumdisplay.php?f=77) on H.264.

Don't worry, though. You really don't need to understand all these flags: the main reason for these preset files is obviously to define a number of typical x264 configurations which can be used out of the box.

Using a preset file

So how do you use a preset file? Just set the '-vpre' flag after the '-vcodec' flag (the flag order does matter):\
`\
ubuntu% ffmpeg -i video.mpg -vcodec libx264 -vpre normal video.mp4\
`\
Alternatively, you can set it to the full path to the preset file (useful if you don't want to keep them in ~/.ffmpeg)\
`\
ubuntu% ffmpeg -i video.mpg -vcodec libx264 -vpre ~/myPresets/libx264-normal.ffpreset video.mp4\
`\
Easy, isn't it?

Now let's look at the different preset files and run some tests. Here, I will encode a 3-minute MPEG video to H.264 using each of the available presets.

Audio encoding is disabled ('-an') and we let ffmpeg decide how many threads to run ('-threads 0').

'Default quality' preset file

`ubuntu% ffmpeg -i video.mpg -f mp4 ``-vcodec libx264 ``-vpre default -an -threads 0 video.mp4\
`\
--> 39 seconds, 4.68 Mb

As the name implies, settings are default values and generate a video compliant with the 'Main' H.264 profile. If you need to encode to the 'Baseline' profile, you just need to change 'coder=1' to 'coder=0' in the preset file: this will disable [CABAC entropy coding](http://en.wikipedia.org/wiki/CABAC), which is only supported in the 'Main' profile and upwards.

'Normal quality' preset file\
`\
ubuntu% ffmpeg -i video.mpg -f mp4 ``-vcodec libx264 ``-vpre normal -an -threads 0 video.mp4\
`\
--> 43 seconds, 4.67 Mb

These settings bring a little bit more quality and generate a video compliant with the 'High' H.264 profile. The key flags is 'dct8x8', which is only supported in the 'High' profile and upwards: removing it will drop back to the 'Main' profile.

I would recommend this preset for everyday use.

'High quality' preset file\
`\
ubuntu% ffmpeg -i video.mpg -f mp4 ``-vcodec libx264 ``-vpre hq -an -threads 0 video.mp4\
`\
--> 1 minute 26 seconds, 4.71 Mb

These settings bring a even more quality, notably a more accurate motion estimation method (umh) and [trellis quantization](http://en.wikipedia.org/wiki/Trellis_quantization). The output video is compliant with the 'High' H.264 profile.

Encoding time is 2x longer compared to the 'Normal quality' preset. Let your eyes decide if there's a notable improvement :)

'Maximum quality' preset file\
`\
ubuntu% ffmpeg -i video.mpg -f mp4 ``-vcodec libx264`` -vpre max -an -threads 0 video.mp4\
`\
--> 15 minutes 4 seconds, 4.72 Mb

These settings bring a lot more quality, thanks to generous B-frames settings, a very efficient (but very slow) motion estimation method (tesa) and more [trellis quantization](http://en.wikipedia.org/wiki/Trellis_quantization). The output video is compliant with the 'High' H.264 profile.

Still, encoding time is 10x longer compared to the 'High quality' preset. Not sure it's really worth it...

That's it for today. We barely scratched the surface and there's much more to be said on H.264, but hopefully this will get you started :)

=================

Updated on 2009/01/19: a while new bunch of lossless & iPod presets have surfaced!

libx264-baseline.ffpreset\
libx264-default.ffpreset\
libx264-fastfirstpass.ffpreset\
libx264-hq.ffpreset\
libx264-ipod320.ffpreset\
libx264-ipod640.ffpreset\
libx264-lossless_fast.ffpreset\
libx264-lossless_max.ffpreset\
libx264-lossless_medium.ffpreset\
libx264-lossless_slower.ffpreset\
libx264-lossless_slow.ffpreset\
libx264-lossless_ultrafast.ffpreset\
libx264-main.ffpreset\
libx264-max.ffpreset\
libx264-normal.ffpreset\
libx264-slowfirstpass.ffpreset

[![](https://resources.blogblog.com/img/icon18_email.gif)](https://www.blogger.com/email-post.g?blogID=55564945108682262&postID=5747268351185647881 "Email Post")

Tags: [ffmpeg](http://blog.julien.org/search/label/ffmpeg), [howto](http://blog.julien.org/search/label/howto), [open source](http://blog.julien.org/search/label/open%20source), [transcoding](http://blog.julien.org/search/label/transcoding), [x264](http://blog.julien.org/search/label/x264)

#### 5 comments:

1.  ![](http://img1.blogblog.com/img/blank.gif)

    *[Robert Swain](http://rob.opendot.cl/)*[Jan 18, 2009, 4:36:00 PM](http://blog.julien.org/2009/01/howto-ffmpeg-x264-presets.html?showComment=1232292960000#c4732572876746704060)

    Hello there,

    I stumbled across your blog and then found this page. I am the author of the x264 presets in FFmpeg. Your usage isn't quite right.

    I will add an installation target to the FFmpeg Makefile at some point.

    If you have copied the preset files into ~/.ffmpeg/ or they have been installed to ${prefix}/share/ffmpeg/ then you only need to use the specific preset name.

    The first bit of the preset file name is the vcodec, acodec or so. The second bit is the specific preset name. For example - libx264-hq.ffpreset can be used as follows:

    ffmpeg -i infile -vcodec libx264 -vpre hq outfile.mp4

    We will probably add a lot more speed/quality tradeoff presets soon to cater to more people's tastes and patience. :)

    Please note that I document this stuff on my website, so you can check there for significant updates: http://rob.opendot.cl/

    Reply

2.  ![](http://lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s35)

    *[JS](https://www.blogger.com/profile/07878729502793140294)*[Jan 19, 2009, 10:51:00 AM](http://blog.julien.org/2009/01/howto-ffmpeg-x264-presets.html?showComment=1232358660000#c2437749863692375086)

    Hi Robert,

    thanks for the info, I'll update the post.

    I also found out that -vcodec must be specified before -vpre, or else the preset file isn't found...

    Cheers!

    Reply

3.  ![](http://lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s35)

    *[khashya](https://www.blogger.com/profile/03941037608805451851)*[Dec 20, 2009, 10:04:00 PM](http://blog.julien.org/2009/01/howto-ffmpeg-x264-presets.html?showComment=1261343080251#c6067168207139425483)

    HI Robert,\
    how can we set the preset by using ffmpeg api and not by cli?

    Reply

4.  ![](http://img1.blogblog.com/img/blank.gif)

    *Anonymous*[Dec 30, 2009, 6:43:00 AM](http://blog.julien.org/2009/01/howto-ffmpeg-x264-presets.html?showComment=1262151812101#c7881122619578536315)

    This comment has been removed by a blog administrator.

    Reply

5.  ![](http://lh3.googleusercontent.com/zFdxGE77vvD2w5xHy6jkVuElKv-U9_9qLkRYK8OnbDeJPtjSZ82UPq5w6hJ-SA=s35)

    *[OsmoHyttinen](https://www.blogger.com/profile/15045034653322998297)*[Jul 25, 2012, 11:59:00 AM](http://blog.julien.org/2009/01/howto-ffmpeg-x264-presets.html?showComment=1343210378739#c2703500283062465387)

    @JS or you type the preset like -vpre libx264-slow and it will be found always if the vcodec is libx264 (like .mkv if no vcodec is defined)

    Reply
