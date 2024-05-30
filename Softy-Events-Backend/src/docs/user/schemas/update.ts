/**
 * @swagger
 * components:
 *   schemas:
 *     UpdateUser:
 *       type: object
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
 *           type: string
 *           description: The role of the user.
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
 *         deletedAt:
 *           type: string
 *           description: The user deleted his account.
 *
 */
