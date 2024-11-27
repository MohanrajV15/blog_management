const jwt = require("jsonwebtoken");


module.exports.checkSession = async (req, res, next) => {
    const token = req.headers['token'];   
    if (token) {
        const headerType = token.split(' ')[0];
        const tokenValue = token.split(' ')[1].trim();
        if (headerType.trim() === "Bearer") {
                try {                   
                    const decoded = await jwt.verify(tokenValue.trim(), process.env.JWT_KEY);
                    if (decoded) {
                        req.userId = decoded.id;
                        console.log(req.userId);
                        
                        next();
                    }
                } catch (err) {
                    console.error('JWT Verification Error:', err);
                    return res.status(401).json({
                        success: false,
                        message: "Unauthorized - Invalid Token"
                    });
                }
        }
    } else {
        return res.status(401).json({
            success: false,
            statusCode: 499,
            message: "Unauthorized"
        })
    }
}
