const os = require('os');

export const DEFAULT_AVATAR = 'https://cdn.intra.42.fr/users/060b0294e206cdf590243044aa096671/larbi.jpeg'; //this should be a link/path to default avatar
export const HOST = `http://${os.hostname()}`;
export const VERIFICATION_PATH = '/auth/verify/?token=';
export const REJECTION_PATH = '/auth/reject/?token=';
export const JWT_SECRET = process.env.JWT_SECRET;

// export
