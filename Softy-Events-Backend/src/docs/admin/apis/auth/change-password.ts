/**
 * @swagger
 * /auth/admins/change-password:
 *   post:
 *     summary: Change admin password
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               oldPassword:
 *                 type: string
 *                 example: oldPassword
 *               newPassword:
 *                 type: string
 *                 example: newPassword
 *     tags:
 *       - Authentication-Admin 🔐👤
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 200
 *               message: "Password changed successfully"
 *               data: {}
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               statusCode: 401
 *               message: "Your password is wrong"
 *               data: {}
 *     security:
 *      - bearerAuth: []
 */
