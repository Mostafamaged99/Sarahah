export const validate = (schema) => {
    return (req, res, next) => {
        let { error } = schema.validate(req.body,{abortEarly: false});
        if (!error) {
          next();
        }else{
          // return next(new AppError(error?.details, 400))
          let errMsgs = error.details.map((err) => err.message);
          next(new AppError(errMsgs, 401``)) 
        }
    }
}