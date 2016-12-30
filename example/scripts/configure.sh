isMacOS() {
  [ "$(uname)" == "Darwin" ]
}

if isMacOS; then
  # Add microphone access description key/value to info.plist
  /usr/libexec/PlistBuddy -c "Add :NSMicrophoneUsageDescription string '\$(PRODUCT_NAME) microphone use'" ./ios/example/Info.plist

  # Add camera access description key/value to info.plist
  /usr/libexec/PlistBuddy -c "Add :NSCameraUsageDescription string '\$(PRODUCT_NAME) camera use'" ./ios/example/Info.plist

  # Add photo library access description key/value to info.plist
  /usr/libexec/PlistBuddy -c "Add :NSPhotoLibraryUsageDescription string '\$(PRODUCT_NAME) photo use'" ./ios/example/Info.plist

  # Add media access description key/value to info.plist
  /usr/libexec/PlistBuddy -c "Add :NSAppleMusicUsageDescription string '\$(PRODUCT_NAME) media use'" ./ios/example/Info.plist
fi
