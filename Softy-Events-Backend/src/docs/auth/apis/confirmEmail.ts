/**
 * @swagger
 * /auth/confirm:
 *   post:
 *     summary: user confirm email
 *     requestBody:
 *        required: true
 *        content:
 *            application/json:
 *                schema:
 *                   $ref: '#/components/schemas/ConfirmEmail'
 *     tags: [Authentication 🔐]
 *     responses:
 *       200:
 *         description: OK
 */
