contract HelloWorld {
    public string message;

    constructor(string initialMessage) {
        message = initialMessage
    }

    function setString(string newMessage){
        message = newMessage
    }

}