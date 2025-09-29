# ABOUT THIS FORK

You're looking at gazugafan's fork of Karaoke Forever, which includes the following new features...

* YouTube search with automatic vocal removal and accurate word-level lyrics alignment
* Options to NOT require username and/or password when creating new accounts
* Case INsensitive usernames

[Check out this demo to see it in action](https://www.youtube.com/watch?v=zWa8k6degVs)

## Getting started with the fork

At a minimum, you'll need...
* [Node.js](https://nodejs.org/en/) 18 or later
* [FFMPEG](https://www.ffmpeg.org) installed somewhere
* [Python](https://www.python.org) 3.9 or later installed and available in your PATH as `python3`. Python 3.10 or later is recommended and will likely be required soon by `yt-dlp`.

That's enough to download pre-made karaoke mixes from YouTube. Automatic karaoke mix generation requires a bit more technical setup.

This fork doesn't have any "release" on github. There's no single executable to download. Instead, you'll need to get the entire codebase. You can do that by clicking the "Code" button in the upper-right of github (probably on this page).

From there, ideally you would copy the git URL and use `git` to clone the repo. That would let you easily pull in changes I might make later on and makes updating a snap! Alternatively, you could just download the whole thing as a ZIP file and extract it.

Once you have the code, open a command prompt and change to the folder the code is in. Install all the JS dependencies by running `npm install`, then build the whole thing by running `npm run build`. Finally, actually run the thing with `node server/main.js` and optionally specify the port you want to it to run on with `-p 3000` tacked onto the end (where 3000 is the port you want).

Congrats! My fork of Karaoke Forever should now be running. You should be able to navigate to the IP/host and port in a web browser and use Karaoke Forever like normal.

## Enabling YouTube Search

With my fork running, login with your admin account, switch to the Account tab, and check the box under the YouTube preferences. You'll need FFMPEG installed. See https://github.com/gazugafan/karaoke-forever/blob/main/docs/content/docs/index.md#youtube-setup for more details.

Videos will be downloaded using yt-dlp, which requires `python3` (version 3.9+) to be in your system PATH. If you need to specify additional options to yt-dlp, you can add those under "Youtube-dl-exec options". If you're running the server from a data center or cloud provider, YouTube may block your IP address from downloading videos by default. In that case, you can try adding the `cookiesFromBrowser` option and setting it to `chrome` to use your Chrome browser's cookies to authenticate. This will require you to login to YouTube in Chrome on the same system as the server, which can be achieved by using a remote desktop app if necessary. Look into X11 forwarding on Linux.

## Updating YouTube Packages

YouTube will frequently change things that will break searching and/or downloading. To fix this, run `npm run youtube-update` in the main folder of the code. This will update the related packages, and will download the latest version of `yt-dlp` to use for downloading videos.

## Automatic vocals removal and lyric alignment

This requires more technical ability than the rest of the setup. If you don't have server admin experience, you might consider skipping this or seeking help.

Note that you'll need a decently powerful computer, with at least 16GB of storage space and 15GB of free RAM to work with. A Linux OS will work best, but you might be able to use WSL2 in Windows.

See https://github.com/gazugafan/karaoke-forever/blob/main/docs/content/docs/index.md#automatic-vocals-removal-and-lyric-alignment

## Optional username and password

Login with your admin account, switch to the Account tab, and look for the options under the New Accounts preferences. If you uncheck both options, new users will be able to create an account using just a name, and can log back in later using the same name and no password. Administrator accounts always require a password, however.

# Karaoke Forever (Original README)

Host awesome karaoke parties where everyone can easily find and queue songs from their phone's web browser. Use your own database of karaoke songs, or enable YouTube search with automatic vocal removal and lyrics alignment. The player is also browser-based with support for MP3+G, MP4 video and WebGL visualizations. The server is self-hosted with no internet connection required (unless YouTube search is enabled).

[![Karaoke Forever](/docs/assets/images/README.jpg?raw=true)](/docs/assets/images/README.jpg?raw=true)

<p align="center">
  <i>App in mobile browser (top) controlling player in Firefox/Chrome (bottom)</i>
</p>

## Features

- [MP3+G](https://en.wikipedia.org/wiki/MP3%2BG) and MP4 video support
- YouTube search with automatic vocal removal and accurate word-level lyrics alignment
- [MilkDrop](https://en.wikipedia.org/wiki/MilkDrop)-style visualizations via [Butterchurn](https://github.com/jberg/butterchurn) (requires WebGL 2)
- [ReplayGain](https://en.wikipedia.org/wiki/ReplayGain) volume normalization support
- Singers prioritized by time since each last sang
- Multiple simultaneous [rooms](https://www.karaoke-forever.com/docs/#rooms-admin-only)/queues (optionally password-protected)
- No ads or telemetry; all data stored locally

Karaoke Forever assumes its player will be mixed with any microphones (either in software or an outboard mixer). See the [F.A.Q.](https://www.karaoke-forever.com/faq#whats-the-recommended-audio-setup) for more information.

## Download & Install

See <a href="https://github.com/bhj/karaoke-forever/releases">Releases</a> available for your OS, as well as the [installation documentation](https://www.karaoke-forever.com/docs/#karaoke-forever-server).

Please note that the main branch is actively developed and is not guaranteed to be stable.

## Getting Started

 Karaoke Forever basically has 3 parts. You can jump to the documentation for each below, or [Quick Start](https://www.karaoke-forever.com/docs/#quick-start) to get up and running step-by-step.

- **[Server:](https://www.karaoke-forever.com/docs/#karaoke-forever-server)** Runs on almost any OS to serve the app and your media files
- **[App:](https://www.karaoke-forever.com/docs/#karaoke-forever-the-web-app)** Fast, modern mobile browser app designed for "karaoke conditions"
- **[Player:](https://www.karaoke-forever.com/docs/#player)** Just another part of the app, designed to run fullscreen on the system handling audio/video for a [room](https://www.karaoke-forever.com/docs/#rooms-admin-only)

## Discord / Support

Join the [Karaoke Forever Discord Server](https://discord.gg/PgqVtFq) for general support and development chat, or just to say hi!

## Contributing & Development

Contributions are most welcome! Make sure you have [Node.js](https://nodejs.org/en/) 12 or later, then:

1. Fork and clone the repo
2. `npm i`
3. `npm run dev` and look for "Web server running at" for the **server URL**
