// mymodule.js
function getHelloMessage(name) {
    return `Hello, ${name}! Welcome to our Node.js app.`;
}
function getCurrentTime() {
    const now = new Date();
    return now.toLocaleString();
}
module.exports = {
    getHelloMessage,
    getCurrentTime
};
