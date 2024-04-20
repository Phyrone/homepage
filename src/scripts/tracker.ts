import * as localforage from 'localforage';

export type UserTrackingConsent = 'granted';

export async function init_tracker() {
  if (navigator.doNotTrack) {
    console.log("browser has doNotTrack enabled - not tracking...");
    return;
  }
  await localforage.ready();

}
