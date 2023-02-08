export const ensureAuth = (req: any, res: any, next: any) => {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
};
