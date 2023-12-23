WORKPLACE="$HOME/workplace/SakuinSeizouki"
WORKSPACE="$WORKPLACE/SakuinSeizoukiElectronApp"

(
  cd "$WORKSPACE"
  ICON_SRC="$WORKPLACE/SakuinSeizoukiElectronApp/src/assets/WindowsIcon.png"
  ICON_SRC=$(cygpath.exe -w "$ICON_SRC")

  rm -rf temp
  rm -rf src/assets/Icon.ico

  mkdir temp

  # Generate icon files with different sizes
  magick convert "$ICON_SRC" -resize 16x16 temp/icon_16.png
  magick convert "$ICON_SRC" -resize 32x32 temp/icon_32.png
  magick convert "$ICON_SRC" -resize 48x48 temp/icon_48.png
  magick convert "$ICON_SRC" -resize 64x64 temp/icon_64.png
  magick convert "$ICON_SRC" -resize 128x128 temp/icon_128.png
  magick convert "$ICON_SRC" -resize 256x256 temp/icon_256.png

  # Convert PNGs to ICO
  magick convert temp/icon_16.png temp/icon_16.ico
  magick convert temp/icon_32.png temp/icon_32.ico
  magick convert temp/icon_48.png temp/icon_48.ico
  magick convert temp/icon_64.png temp/icon_64.ico
  magick convert temp/icon_128.png temp/icon_128.ico
  magick convert temp/icon_256.png temp/icon_256.ico

  # Merge ICO files into a single ICO file
  magick mogrify -format ico temp/*.ico
  magick convert temp/*.ico src/assets/Icon.ico

  rm -rf temp
)
