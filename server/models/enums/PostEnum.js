class PostEnum {
    static Wiki = new PostEnum('wiki')
    static Social = new PostEnum('social')

    constructor (type) {
        this.type = type
    }
}

export default PostEnum