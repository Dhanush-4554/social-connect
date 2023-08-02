import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    // Get the token from the Authorization header
    let token = req.header("Authorization");

    // Check if token is missing
    if (!token) {
      return res.status(403).send("Access Denied");
    }

    // Remove "Bearer " from the token if present
    if (token.startsWith("Bearer ")) {
      token = token.slice(7).trimLeft();
    }

    // Verify the token and decode its payload
    const verified = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded user information to the request object
    req.user = verified;

    // Move to the next middleware
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
