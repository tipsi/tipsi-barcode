isMacOS() {
  [ "$(uname)" == "Darwin" ]
}

if isMacOS; then
  # Add location access description key/value to info.plist
  /usr/libexec/PlistBuddy -c "Add :NSLocationWhenInUseUsageDescription string 'Access to your current location information (GPS) is needed to find the nearest points of interest around your current position.'" "${DESTINATION_DIRECTORY}"/../platforms/ios/"${PROJECT_NAME}"/"${PROJECT_NAME}"-Info.plist

  # Add camera access description key/value to info.plist
  /usr/libexec/PlistBuddy -c "Add :NSCameraUsageDescription string 'Access to the camera is needed to display augmented reality content on top of your camera image.'" "${DESTINATION_DIRECTORY}"/../platforms/ios/"${PROJECT_NAME}"/"${PROJECT_NAME}"-Info.plist

  # Add photo library access description key/value to info.plist
  /usr/libexec/PlistBuddy -c "Add :NSPhotoLibraryUsageDescription string 'Access to your photo library is required for the example 'Bonus: Capture Screen' because it adds a screenshot of the current Architect view.'" "${DESTINATION_DIRECTORY}"/../platforms/ios/"${PROJECT_NAME}"/"${PROJECT_NAME}"-Info.plist
fi
