# cordova-icon

<img src="cordova-icon-resize.png"/>

Automatic icon resizing for Cordova. Create an icon in the root folder of your Cordova project and use cordova-icon to automatically resize and copy it for all the platforms your project supports (currenty works with iOS, Android, Windows 10 and OSX).

### Installation

```bash
$ sudo apt-get install imagemagick
$ # on Mac: brew install imagemagick
$ # on Windows: http://www.imagemagick.org/script/binary-releases.php#windows (check "Legacy tools")

$ sudo npm install -g git+https://github.com/evidenceprime/cordova-icon.git#1.0.2
```

### Requirements

- **ImageMagick installed**
- At least one platform was added to your project ([cordova platforms docs](http://cordova.apache.org/docs/en/edge/guide_platforms_index.md.html#Platform%20Guides))
- Cordova's config.xml file must exist in the root folder ([cordova config.xml docs](http://cordova.apache.org/docs/en/edge/config_ref_index.md.html#The%20config.xml%20File))
- Cordova `>= 7`

### Usage

Create an `icon.png` file in the root folder of your cordova project.
Then run:

     $ cordova-icon

You also can specify manually a location for your `config.xml` or `icon.png`:

     $ cordova-icon --config=config.xml --icon=icon.png

If you run a old version of Cordova for iOS / Mac and you need your files in `/Resources/icons/`, use this option:

     $ cordova-icon --xcode-old

If you run a old version of Cordova for Android (platform version `<= 8.1.0`) and you need your files named in `mipmap` resources as `icon.png` instead of `ic_launcher.png`, use this option:

     $ cordova-icon --old-android-platform

For good results, your file should be:

- square
- for Android and iOS, at least 1024\*1024px
- for Windows, at least 1240\*1240px

#### Notes:

- Your `config.xml` file will not be updated by the tool (because images are automatically created in the good folders)
- Therefore, in your `config.xml`, be sure to remove all lines looking like `<icon src="res/android/ldpi.png" density="ldpi" />`

### Creating a cordova-cli hook

Since the execution of cordova-icon is pretty fast, you can add it as a cordova-cli hook to execute before every build.
To create a new hook, go to your cordova project and run:

    $ mkdir hooks/after_prepare
    $ vi hooks/after_prepare/cordova-icon.sh

Paste the following into the hook script:

    #!/bin/bash
    cordova-icon

Then give the script +x permission:

    $ chmod +x hooks/after_prepare/cordova-icon.sh

That's it. Now every time you `cordova build`, the icons will be auto generated.

### Splash screens

Check out [cordova-splash](https://github.com/evidenceprime/cordova-splash).

### License

MIT
