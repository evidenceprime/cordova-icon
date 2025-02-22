var fs = require("fs-extra");
var Q = require("q");
var display = require("./display");
var _ = require("underscore");

var images = [
  { size: "20x20", idiom: "iphone", filename: "icon-20@2x.png", scale: "2x" },
  { size: "20x20", idiom: "iphone", filename: "icon-20@3x.png", scale: "3x" },
  { size: "29x29", idiom: "iphone", filename: "icon-29.png", scale: "1x" },
  { size: "29x29", idiom: "iphone", filename: "icon-29@2x.png", scale: "2x" },
  { size: "29x29", idiom: "iphone", filename: "icon-29@3x.png", scale: "3x" },
  { size: "40x40", idiom: "iphone", filename: "icon-40@2x.png", scale: "2x" },
  { size: "40x40", idiom: "iphone", filename: "icon-60@2x.png", scale: "3x" },
  { size: "57x57", idiom: "iphone", filename: "icon.png", scale: "1x" },
  { size: "57x57", idiom: "iphone", filename: "icon@2x.png", scale: "2x" },
  { size: "60x60", idiom: "iphone", filename: "icon-60@2x.png", scale: "2x" },
  { size: "60x60", idiom: "iphone", filename: "icon-60@3x.png", scale: "3x" },
  { size: "20x20", idiom: "ipad", filename: "icon-20.png", scale: "1x" },
  { size: "20x20", idiom: "ipad", filename: "icon-20@2x.png", scale: "2x" },
  { size: "29x29", idiom: "ipad", filename: "icon-29.png", scale: "1x" },
  { size: "29x29", idiom: "ipad", filename: "icon-29@2x.png", scale: "2x" },
  { size: "40x40", idiom: "ipad", filename: "icon-40.png", scale: "1x" },
  { size: "40x40", idiom: "ipad", filename: "icon-40@2x.png", scale: "2x" },
  { size: "50x50", idiom: "ipad", filename: "icon-50.png", scale: "1x" },
  { size: "50x50", idiom: "ipad", filename: "icon-50@2x.png", scale: "2x" },
  { size: "72x72", idiom: "ipad", filename: "icon-72.png", scale: "1x" },
  { size: "72x72", idiom: "ipad", filename: "icon-72@2x.png", scale: "2x" },
  { size: "76x76", idiom: "ipad", filename: "icon-76.png", scale: "1x" },
  { size: "76x76", idiom: "ipad", filename: "icon-76@2x.png", scale: "2x" },
  {
    size: "83.5x83.5",
    idiom: "ipad",
    filename: "icon-83.5@2x.png",
    scale: "2x",
  },
  {
    size: "1024x1024",
    idiom: "ios-marketing",
    filename: "icon-1024.png",
    scale: "1x",
  },
  {
    size: "24x24",
    idiom: "watch",
    filename: "icon-24@2x.png",
    scale: "2x",
    role: "notificationCenter",
    subtype: "38mm",
  },
  {
    size: "27.5x27.5",
    idiom: "watch",
    filename: "icon-27.5@2x.png",
    scale: "2x",
    role: "notificationCenter",
    subtype: "42mm",
  },
  {
    size: "29x29",
    idiom: "watch",
    filename: "icon-29@2x.png",
    role: "companionSettings",
    scale: "2x",
  },
  {
    size: "29x29",
    idiom: "watch",
    filename: "icon-29@3x.png",
    role: "companionSettings",
    scale: "3x",
  },
  {
    size: "40x40",
    idiom: "watch",
    filename: "icon-40@2x.png",
    scale: "2x",
    role: "appLauncher",
    subtype: "38mm",
  },
  {
    size: "44x44",
    idiom: "watch",
    filename: "icon-44@2x.png",
    scale: "2x",
    role: "appLauncher",
    subtype: "40mm",
  },
  {
    size: "50x50",
    idiom: "watch",
    filename: "icon-50@2x.png",
    scale: "2x",
    role: "appLauncher",
    subtype: "44mm",
  },
  {
    size: "86x86",
    idiom: "watch",
    filename: "icon-86@2x.png",
    scale: "2x",
    role: "quickLook",
    subtype: "38mm",
  },
  {
    size: "98x98",
    idiom: "watch",
    filename: "icon-98@2x.png",
    scale: "2x",
    role: "quickLook",
    subtype: "42mm",
  },
  {
    size: "108x108",
    idiom: "watch",
    scale: "2x",
    role: "quickLook",
    subtype: "44mm",
  },
  {
    size: "1024x1024",
    idiom: "watch-marketing",
    filename: "icon-1024.png",
    scale: "1x",
  },
];

function getPath(projectName) {
  return (
    "platforms/ios/" +
    projectName +
    "/Images.xcassets/AppIcon.appiconset/Contents.json"
  );
}

function updateContentsJson(projectName) {
  var deferred = Q.defer();
  var path = getPath(projectName);

  fs.readJson(path, function (err, contents) {
    if (err) {
      display.error("error during Contents.json for iOS update");
      deferred.reject(err);
      return;
    }

    contents.images = images;

    fs.writeJson(path, contents, { spaces: 2 }, function (err) {
      if (err) {
        display.error("error during Contents.json for iOS update");
        deferred.reject(err);
        return;
      }
      display.success("updated Contents.json for iOS");
      deferred.resolve();
    });
  });

  return deferred.promise;
}

module.exports = updateContentsJson;
