export const appSettings = {
  // milliseconds of transitioning effect between views
  ROUTER_TRANSITION_DURATION: 200,
  // max byte size of ad image
  MAX_AD_IMAGE_SIZE: 512000,
  // seconds of how long remebered user auth token will be stored
  REMEMBER_USER_EXPIRATION_SECONDS: 259200,
  // seconds of how long not remebered user auth token will be stored
  AUTH_TOKEN_EXPIRATION_SECONDS: 900,
  // update notification time in milliseconds
  UPDATE_NOTIFICATION_MILLISECONDS_INTERVAL: 120000,
  // dismiss push notification time in milliseconds
  DISMISS_PUSH_NOTIFICATION_INTERVAL: 10000,
  // withraw amounts values
  WITHDRAWAL_AMOUNTS: [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000],
  // privacy policy link
  PRIVACY_POLICY_LINK: 'https://adshares.net/privacy.txt',
  // faq link
  FAQ_LINK: 'https://adshares.net/faq.html',
  // support email
  SUPPORT_EMAIL: 'office@adshares.net',
  // application fee
  TX_FEE: 0.002,
  // blockchain address validation regexp
  ADDRESS_REGEXP: '[0-9a-fA-F]{4}-[0-9a-fA-F]{8}-([0-9a-fA-F]{4}|XXXX)',
  // url validation regexp
  TARGET_URL_REGEXP: `^(?:(http|https):\\/\\/)?(?:([a-zA-Z\\d._~\\!$&'\\(\\)*+,;=%\\-]*)(?::([a-zA-Z\\d._~\\!$&'\\(\\)*+,;=:%\\-]*))?@)?((?:[a-zA-Z\\d.%\\-]+)|(?:\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3})|(?:\\[(?:[a-fA-F\\d.:]+)\\]))(?::\\d+)?(\\/|\\?|\\#|$)`,
  // user types available for admin filtering
  USER_TYPES: ['Advertisers', 'Publishers', 'All']
};
