/**
 * @swagger
 * /users/create:
 *    post:
 *      tags: [User]
 *      summary: Create a new user.
 *      security:
 *        - bearerAuth: []
 *      consumes:
 *        - multipart/form-data
 *        - application/json
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *              schema:
 *                $ref: '#components/schemas/CreateUser'
 *          application/json:
 *              schema:
 *                $ref: '#components/schemas/CreateUser'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: '#/components/schemas/GetUser'
 *        400:
 *          description: 	Validation Failed
 *        401:
 *          description: Error Token
 *        403:
 *          description: Access Denied / Unauthorized
 *        500:
 *          description: Internal server error
 */
