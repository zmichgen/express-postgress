function UserDTO(user) {
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.id = user.id;
    this.posts = user.posts;
}

module.exports = UserDTO;