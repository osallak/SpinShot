const os = require('os');

export const DEFAULT_AVATAR = 'https://cdn.intra.42.fr/users/3cfaf72bc5ad7fe2ee80b5f3c8b6664b/osallak.jpg'; //this should be a link/path to default avatar
export const HOST = `http://${os.hostname()}`;
export const VERIFICATION_PATH = '/auth/verify/?token=';
export const REJECTION_PATH = '/auth/reject/?token=';
export const JWT_SECRET = process.env.JWT_SECRET;

// export
