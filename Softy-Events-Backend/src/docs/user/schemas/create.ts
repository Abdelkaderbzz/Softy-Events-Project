/**
 * @swagger
 * components:
 *   schemas:
 *     CreateUser:
 *       type: object
 *       required:
 *         - email
 *         - password
 *         - name
 *       properties:
 *         email:
 *           type: string
 *           description: The email of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *         name:
 *           type: string
 *           description: The name of the user.
 *         role:
 *           type: array
 *           description: The role of the user.
 *           items:
 *             type: string
 *         profilePicUrl:
 *           type: string
 *           description: The profile picture of the user.
 *           format: binary
 *         status:
 *           type: boolean
 *           description: The status of the valid user.
 *         verified:
 *           type: boolean
 *           description: The user verified his email.
 *
 */
