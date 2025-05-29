// authRoutes.js        # Định tuyến xác thực
const express = require("express");
const authController = require("../controllers/authController");
const { protect } = require("../middlewares/auth");
const router = express.Router();

// Đăng nhập
router.post("/login", authController.login);

// Đăng ký người dùng mới
router.post("/register", authController.register);

// Update mất khẩu mới
router.patch("/updatePassword", protect, authController.updatePassword);

module.exports = router;

/**
 * @openapi
 * tags:
 *   name: auth
 *   description: Phân quyền người dùng
 */

/**
 *  @openapi
 *  /auth/login:
 *      post:
 *          tags:
 *              - auth
 *          summary: Phân quyền người dùng
 *          description: Phân quyền khi đăng nhập vào hệ thống.
 *          operationId: login
 *          requestBody:
 *            required: true
 *            description: Thông tin đăng nhập
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/login"
 *          responses:
 *            "200":
 *              description: Đăng nhập thành công
 *              content:
 *                application/json:
 *                  schema:
 *                    $ref: "#/components/schemas/successAuth"
 *            "400":
 *              description: Dự liệu không hợp lệ
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      status:
 *                        type: string
 *                        example: fail
 *                      message:
 *                        type: string
 *                        example: Vui lòng cung cấp đầy đủ email và mật khẩu
 *            "401":
 *              description: Không có quyền đăng nhập
 *              content:
 *                application/json:
 *                  schema:
 *                    type: object
 *                    properties:
 *                      status:
 *                        type: string
 *                        example: fail
 *                      message:
 *                        type: string
 *                        example: Email hoặc mật khẩu không đúng
 */

/**
 *  @openapi
 *  /auth/register:
 *      post:
 *        tags:
 *          - auth
 *        summary: Đăng ký người dùng
 *        description: Đăng ký để thành thành viên mới của BK Library.
 *        operationId: register
 *        requestBody:
 *          required: true
 *          description: Thông tin đăng ký
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/register"
 *        responses:
 *          "200":
 *            description: Đăng ký thành công
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/successAuth"
 *          "400":
 *            description: Dự liệu không hợp lệ
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: fail
 *                    message:
 *                      type: string
 *                      example: Email đã được sử dụng
 *          default:
 *            description: Unexpected error
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/Error"
 *
 */

/**
 *  @openapi
 *  /auth/updatePassword:
 *      patch:
 *        tags:
 *          - auth
 *        summary: Thay đổi mất khẩu
 *        description: Thay đổi mất khẩu mới sau khi đăng nhập.
 *        operationId: updatePassword
 *        requestBody:
 *          required: true
 *          description: Thông tin đăng ký
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  currentPassword:
 *                    type: string
 *                    example: oldPassword
 *                  newPassword:
 *                    type: string
 *                    example: newPassword
 *
 *        responses:
 *          "200":
 *            description: Đăng ký thành công
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/successAuth"
 *          "401":
 *            description: Người dùng không tồn tại
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: fail
 *                    message:
 *                      type: string
 *                      example: Người dùng không tồn tại
 *          "404":
 *            description: Mật khẩu cũ không chính xác"
 *            content:
 *              application/json:
 *                schema:
 *                  type: object
 *                  properties:
 *                    status:
 *                      type: string
 *                      example: fail
 *                    message:
 *                      type: string
 *                      example: Mật khẩu cũ không chính xác
 *          default:
 *            description: Unexpected error
 *            content:
 *              application/json:
 *                schema:
 *                  $ref: "#/components/schemas/Error"
 *        security:
 *          - BearerAuth: []
 *
 */
