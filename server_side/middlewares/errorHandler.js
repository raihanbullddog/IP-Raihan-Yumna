module.exports = (error, req, res, next) => {
  

    let status = error.status || 500;
    let message = error.message || "Internal server error";
  
    switch (error.name) {
      case "InvalidInput":
        (status = 400), (message = "username / email / password is required");
        break;
      case "BadInput":
        (status = 401), (message = "wrong email/ username/ password");
        break;
      case "SequelizeValidationError":
      case "SequelizeUniqueConstraintError":
        let errorMsg = [];
        errorMsg = error.errors.map((el) => {
          return el.message;
        });
        if (errorMsg.length === 1) {
          message = errorMsg[0];
        } else {
          message = errorMsg;
        }
        status = 400;
        break;
      case "badRequest":
        (status = 400), (message = "bad request, wrong data is inputted");
        break;
      case "SequelizeForeignKeyConstraintError":
        (status = 400),
          (message =
            "can't add the data, because another data as a foreign key is directly connected");
        break;
      case "notFound":
        (status = 404), (message = "Data not found");
        break;
      case "Already Exists":
        (status = 400), (message = "Anime already favorited");
        break;
      case "TokenNotFound":
        (status = 401), (message = "Unauthorized Access, must log in first");
        break;
      case "JsonWebTokenError":
      case "InvalidToken":
        (status = 400), (message = "Invalid Token");
        break;
      case "Invalid Password":
        (status = 400), (message = "password is required");
        break;
      case "Forbidden":
        (status = 403), (message = "Forbidden, you are not authorized");
        break;
    }
  
    res.status(status).json({ message });
  };
  