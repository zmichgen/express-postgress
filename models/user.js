function User(user) {
    Object.assign(this, user);
}

/**
 * id: string;
 * firstName: string;
 * lastName: string;
 * email: string;
 * password: string;
 * posts: array of post id;
 */

module.exports = User;