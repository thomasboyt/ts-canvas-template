interface StringMap {
  [key: string]: string;
}

const images: StringMap = {
};

const audio: StringMap = {
  wah: require<any>('../assets/wah.mp3'),
}

export default {
  images, audio
};