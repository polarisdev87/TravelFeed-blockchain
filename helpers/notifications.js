import { WEB_PUSH_PUB } from '../config';
import { ADD_PUSH_SUBSCRIPTION } from './graphql/notifications';
import graphQLClient from './graphQLClient';
import { getUser } from './token';

const urlBase64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

export const registerServiceWorker = () => {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registration => {
        console.log('SW registered: ', registration);
        if (Notification.permission === 'granted' && getUser()) {
          console.log('Notifications are enabled');
          registration.pushManager
            .getSubscription()
            .then(res => {
              if (res) console.log('Already registered for push notifications');
              // Return if already registered
              if (res) return;
              const subscribeOptions = {
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(WEB_PUSH_PUB),
              };
              registration.pushManager
                .subscribe(subscribeOptions)
                .then(pushSubscription => {
                  console.log(pushSubscription);
                  const variables = {
                    pushSubscription: JSON.stringify(pushSubscription),
                  };
                  graphQLClient(ADD_PUSH_SUBSCRIPTION, variables).then(res =>
                    console.log(
                      'Submitted push notification subscription to API',
                    ),
                  );
                })
                .catch(err => console.error(err));
            })
            .catch(err => console.error(err));
        } else console.log('Notifications are disabled');
      })
      .catch(function(registrationError) {
        console.log('SW registration failed: ', registrationError);
      });
  }
};
