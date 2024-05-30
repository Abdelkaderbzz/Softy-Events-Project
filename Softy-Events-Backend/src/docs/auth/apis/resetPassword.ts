/**
 * @swagger
 * /auth/reset-password:
 *   post:
 *     summary: user reset Password
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/ResetPassword'
 *     tags: [Authentication 🔐]
 *     responses:
 *       200:
 *         description: OK
 */
