const commentValidate = (comment) => {
  const commentRegax = /^.{1,200}$/;
  if (!commentRegax.test(comment)) {
    const error = new Error("TOO_LONG_COMMENT");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  commentValidate,
};
