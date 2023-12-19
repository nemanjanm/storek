class ResponseResult
{
    constructor(object, message, status)
    {
        this.object = object;
        this.message = message;
        this.status = status;
    }
}

module.exports = ResponseResult;