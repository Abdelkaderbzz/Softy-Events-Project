/**
 * @swagger
 * /usertypes/{id}:
 *    put:
 *      summary: Update userType by id
 *      security:
 *        - bearerAuth: []
 *      consumes:
 *        - application/json
 *      tags: [UserType]
 *      parameters:
 *        - in: path
 *          name: id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *              schema:
 *                $ref: '#components/schemas/UpdateUserType'
 *      responses:
 *        200:
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/GetUserType'
 *        400:
 *          description: 	Validation Failed
 *        401:
 *          description: Error Token
 *        403:
 *          description: Access Denied / Unauthorized
 *        500:
 *          description: Internal server error
 *
 */
