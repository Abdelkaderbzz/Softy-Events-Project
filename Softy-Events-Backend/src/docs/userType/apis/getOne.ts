/**
 * @swagger
 * /usertypes/{id}:
 *    get:
 *      summary: Get one userType by id
 *      security:
 *        - bearerAuth: []
 *      consumes:
 *        - multipart/form-data
 *      parameters:
 *        - in: path
 *          name: id
 *      tags: [UserType]
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
 */
