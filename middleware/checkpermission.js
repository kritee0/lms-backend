export const checkstafflevelpermission = async (req, res, next) => {
  try {
    const user = req.user;
    //console.log(user);
    if (user.role !== "staff" && user.role !== "Admin") {
      return res.json({
        success: false,
        message: "you donot haveauthrization to perfprm this action",
      });
    }
    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export const CheckAdminlevelpermission = async (req, res, next) => {
  try {
    const user = req.user;
    //console.log(user);
    if (user.role !== "Admin") {
      return res.json({
        success: false,
        message: "you donot haveauthrization to perform this action",
      });
    }
    next();
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
    });
  }
};
