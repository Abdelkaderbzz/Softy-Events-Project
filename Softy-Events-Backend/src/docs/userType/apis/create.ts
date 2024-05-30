/**
 * @swagger
 * /usertypes:
 *    post:
 *      tags: [UserType]
 *      summary: Create a new userType
 *      security:
 *        - bearerAuth: []
 *      consumes:
 *        - application/json
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                $ref: '#components/schemas/CreateUserType'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  user:
 *                    $ref: '#/components/schemas/GetUserType'
 *        400:
 *          description: 	Validation Failed
 *        401:
 *          description: Error Token
 *        403:
 *          description: Access Denied / Unauthorized
 *        500:
 *          description: Internal server error
 */
