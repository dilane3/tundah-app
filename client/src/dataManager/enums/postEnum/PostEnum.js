class PostEnum {
    static wiki = new PostEnum('wiki')
    static social = new PostEnum('social')

    constructor(type) {
        this.type = type
    }
}

export default PostEnum;