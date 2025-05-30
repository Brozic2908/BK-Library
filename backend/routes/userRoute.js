// userRoutes.js        # Định tuyến người dùng
const express = require("express");
const userController = require("../controllers/userController");
const { protect, restrictTo } = require("../middlewares/auth");
const router = express.Router();

router.use(protect);

// Routes dành cho admin
router.get("/", restrictTo("admin"), userController.getAllUsers);
router.patch(
  "/:id/update",
  restrictTo("admin"),
  userController.updateUserByAdmin
);

// Routes cho người dùng cập nhật thông tin cá nhân hoặc admin có thể cập nhật cho người dùng
router.get("/:id", protect, userController.getUserById);
router.patch("/:id", protect, userController.updateUser);

module.exports = router;

/**
 * @openapi
 * tags:
 *   name: Users
 *   description: Quản lý người dùng
 */

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Lấy danh sách tất cả người dùng
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Danh sách người dùng
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: success
 *                 results:
 *                   type: integer
 *                   example: 2
 *                 data:
 *                   type: object
 *                   properties:
 *                     users:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/User'
 *     security:
 *       - BearerAuth: []
 */

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Lấy thông tin người dùng theo ID
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID của người dùng
 *     responses:
 *       200:
 *         description: Thành công, trả về thông tin người dùng
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleUserResponse'
 *       404:
 *         description: Không tìm thấy người dùng
 *     security:
 *       - BearerAuth: []
 */

/**
 * @openapi
 * /users/{id}:
 *   patch:
 *     summary: Cập nhật thông tin người dùng
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdate'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleUserResponse'
 *       404:
 *         description: Không tìm thấy người dùng
 *     security:
 *       - BearerAuth: []
 */

/**
 * @openapi
 * /users/admin/{id}:
 *   patch:
 *     summary: Cập nhật thông tin người dùng (quyền admin)
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/adminUserUpdate'
 *     responses:
 *       200:
 *         description: Cập nhật thành công
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SingleUserResponse'
 *       400:
 *         description: Role không hợp lệ
 *       404:
 *         description: Không tìm thấy người dùng
 *     security:
 *       - BearerAuth: []
 */

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         user_id:
 *           type: integer
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         gender:
 *           type: string
 *           enum: [male, female, other]
 *         role:
 *           type: string
 *           enum: [Member, admin]
 *         acc_status:
 *           type: string
 *           enum: [active, banned]
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     UserUpdate:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *         phone:
 *           type: string
 *         address:
 *           type: string
 *         gender:
 *           type: string
 *
 *     adminUserUpdate:
 *       allOf:
 *         - $ref: '#/components/schemas/UserUpdate'
 *         - type: object
 *           properties:
 *             role:
 *               type: string
 *               enum: [Member, admin]
 *             acc_status:
 *               type: string
 *               enum: [active, banned]
 *
 *     SingleUserResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: success
 *         data:
 *           type: object
 *           properties:
 *             user:
 *               $ref: '#/components/schemas/User'
 */
