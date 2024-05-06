const catchAsync = fn => {
    return async (...params) => {
        try {
            return await fn(params)
        } catch (e) {
            console.log(e)
        }
    };
}

//defualt

export default catchAsync
