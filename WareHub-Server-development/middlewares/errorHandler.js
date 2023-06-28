const errorHandler = (err, req, res, next) => {
    if(err.name === "ErrorNotFound") {
      res.status(404).json({
        message: "Error Not Found"
      })
    } else if(err.name === "InvalidCredential") {
      res.status(402).json({
        message: "Invalid Username or Password"
      })
    } else if(err.name === "BadRequest") {
      res.status(400).json({
        message: "Bad Request"
      })
    } else if(err.name === "SequelizeUniqueConstraintError") {
      res.status(400).json({
        message: "Unique Constraint Error"
      })
    } else if(err.name === "productPriceError") {
      res.status(400).json({
        message: "Product Price Error"
      })
    } else if(err.name === "emptyStock") {
    res.status(400).json({
      message: "Empty Stock"
    })
    } else if(err.name === "insufficient") {
    res.status(400).json({
      message: "Insufficient Stock at Warehouse"
    })
    } else {
      res.status(500).json({
        message: "Internal Server Error"
      })
    }
  };
  
  module.exports = errorHandler;
  