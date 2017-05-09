var User = (function () {
    function User(username, email, password, firstName, lastName) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
    }
    return User;
}());
export { User };
