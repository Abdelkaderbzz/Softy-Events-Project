/**
 * @swagger
 * /auth/signup:
 *   post:
 *     tags: [Authentication 🔐]
 *     summary: Register user
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/CreateUserSignup'
 *            multipart/form-data:
 *                schema:
 *                   $ref: '#/components/schemas/CreateUserSignup'
 *     consumes:
 *        - multipart/form-data
 *        - application/json
 *     responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: '#/components/schemas/User'
 *        400:
 *          description: 	Validation Failed
 *        401:
 *          description: Error Token
 *        403:
 *          description: Access Denied / Unauthorized
 *        500:
 *          description: Internal server error
 */
