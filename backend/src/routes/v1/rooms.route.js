const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const roomValidation = require('../../validations/room.validation');
const roomController = require('../../controllers/room.controller');

const router = express.Router();

router.route('/').post(auth('createRooms'), validate(roomValidation.createRoom), roomController.createRoom);

router
  .route('/getRooms/:userId')
  .get(auth('getRooms'), validate(roomValidation.getRoomsByUserId), roomController.getRoomsByUserId);

router
  .route('/manage/:roomId')
  .get(auth('getRooms'), validate(roomValidation.getRoom), roomController.getRoom)
  .post(auth('manageRooms'), validate(roomValidation.updateRoom), roomController.updateRoom)
  .delete(auth('createRooms'), validate(roomValidation.deleteRoom), roomController.deleteRoom);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Rooms
 *   description: Room management and retrieval
 */

/**
 * @swagger
 * path:
 *  /rooms:
 *    post:
 *      summary: Create a room
 *      description: All users can create a room.
 *      tags: [Rooms]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 text:
 *                   type: string
 *                 from:
 *                   type: string
 *                 senderChatID:
 *                   type: string
 *                 receiverChatID:
 *                   type: string
 *               example:
 *                 text: hello
 *                 from: fake name
 *                 senderChatID: 5rebc534954b54139706d920
 *                 receiverChatID: 5rebc534954b54139706d943
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Room'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 */

/**
 * @swagger
 * path:
 *  /rooms/{userId}/{toId}:
 *    get:
 *      summary: Get rooms from a room.
 *      description: Logged in users can fetch only their own rooms in their rooms.
 *      tags: [Rooms]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: userId
 *          required: true
 *          schema:
 *            type: string
 *          description: User id of 'from'
 *        - in: query
 *          name: toId
 *          required: true
 *          schema:
 *            type: string
 *          description: User id of 'to'
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Room'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * path:
 *  /rooms/{id}:
 *    patch:
 *      summary: Update a room
 *      description: Logged in rooms can only update their own rooms. Only admins can update other rooms.
 *      tags: [Rooms]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Room id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                 text:
 *                   type: string
 *                 from:
 *                   type: string
 *                 senderChatID:
 *                   type: string
 *                 receiverChatID:
 *                   type: string
 *               example:
 *                 id: 5ebbc534954b54139706d913
 *                 text: hello
 *                 from: fake name
 *                 senderChatID: 5rebc534954b54139706d920
 *                 receiverChatID: 5rebc534954b54139706d943
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Room'
 *        "400":
 *          $ref: '#/components/responses/DuplicateEmail'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a room
 *      description: Logged in rooms can delete only their rooms. Only admins can delete other rooms.
 *      tags: [Rooms]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Room id
 *      responses:
 *        "200":
 *          description: No content
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
