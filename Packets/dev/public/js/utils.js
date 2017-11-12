// Utils for WEBRTC

// Check if user userMedia
let hasUserMedia = () => {
  navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
  return !!navigator.getUserMedia;
}

let STUNServers = [
  { "url": "stun:stun.l.google.com:19302" },
  { "url": "stun:stun.l.google.com:19302" },
  { "url": "stun:stun1.l.google.com:19302" },
  { "url": "stun:stun2.l.google.com:19302" },
  { "url": "stun:stun3.l.google.com:19302" },
  { "url": "stun:stun4.l.google.com:19302" },
  { "url": "stun:stun01.sipphone.com" },
  { "url": "stun:stun.ekiga.net" },
  { "url": "stun:stun.fwdnet.net" },
  { "url": "stun:stun.ideasip.com" },
  { "url": "stun:stun.iptel.org" },
  { "url": "stun:stun.rixtelecom.se" },
  { "url": "stun:stun.schlund.de" },
  { "url": "stun:stunserver.org" },
  { "url": "stun:stun.softjoys.com" },
  { "url": "stun:stun.voiparound.com" },
  { "url": "stun:stun.voipbuster.com" },
  { "url": "stun:stun.voipstunt.com" },
  { "url": "stun:stun.voxgratia.org" },
  { "url": "stun:stun.xten.com" }
]

export { hasUserMedia, STUNServers };