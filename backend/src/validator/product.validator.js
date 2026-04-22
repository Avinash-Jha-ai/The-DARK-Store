import { body, validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            message: "Validation error",
            errors: errors.array()
        });
    }

    next();
};

export const createProductValidator = [

    // ✅ title
    body("title")
        .notEmpty().withMessage("Title is required")
        .isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),

    // ✅ description
    body("description")
        .notEmpty().withMessage("Description is required")
        .isLength({ min: 5 }).withMessage("Description must be at least 5 characters"),

    // ✅ price
    body("price")
        .notEmpty().withMessage("Price is required")
        .isFloat({ min: 0 }).withMessage("Price must be a positive number"),

    // ✅ images (Multer files)
    body("images")
        .custom((value, { req }) => {
            if (!req.files || req.files.length === 0) {
                throw new Error("At least one image is required");
            }
            return true;
        }),

    validateRequest
];