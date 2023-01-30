export const validator = (req: any, res: any, next: any) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Please enter all fields" });
  }
  next();
};


