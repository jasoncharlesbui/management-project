const getAuthorizationHeader = (username, password) => {
    const encoded = new Buffer(username + ":" + password).toString("base64");
    return `Basic ${encoded}`;
};

module.exports = {
    getAuthorizationHeader
}