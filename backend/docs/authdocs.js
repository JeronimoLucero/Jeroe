/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     description: Registra un nuevo usuario en el sistema.
 *     operationId: registerUser
 *     requestBody:
 *       description: Datos del usuario para el registro.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: Usuario registrado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Usuario registrado con éxito'
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *       400:
 *         description: El correo ya está registrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión de un usuario
 *     description: Inicia sesión con un usuario validando su correo electrónico y contraseña.
 *     operationId: loginUser
 *     requestBody:
 *       description: Credenciales del usuario para iniciar sesión.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: johndoe@example.com
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: Usuario ha iniciado sesión correctamente, se devuelve el token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Inicio de sesión exitoso'
 *                 token:
 *                   type: string
 *                   example: 'JWT_TOKEN'
 *       401:
 *         description: Credenciales inválidas
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /auth/refresh:
 *   post:
 *     summary: Refrescar el token JWT
 *     description: Refresca el token JWT utilizando el token actual.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token refrescado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Token refrescado con éxito'
 *                 token:
 *                   type: string
 *                   example: 'NEW_JWT_TOKEN'
 *       401:
 *         description: Token inválido o expirado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /auth/profile:
 *   get:
 *     summary: Obtener perfil del usuario logueado
 *     description: Obtiene la información del perfil del usuario logueado utilizando su token JWT.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Información del perfil del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     username:
 *                       type: string
 *                       example: johndoe
 *                     email:
 *                       type: string
 *                       example: johndoe@example.com
 *                     role:
 *                       type: string
 *                       example: user
 *       401:
 *         description: No autorizado, token inválido o expirado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /products:
 *   get:
 *     summary: Obtener todos los productos
 *     description: Obtiene una lista de todos los productos.
 *     operationId: getAllProducts
 *     responses:
 *       200:
 *         description: Lista de productos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nombre:
 *                     type: string
 *                     example: Producto 1
 *                   descripcion:
 *                     type: string
 *                     example: Descripción del producto
 *                   precio:
 *                     type: number
 *                     format: float
 *                     example: 29.99
 *                   urlimagen:
 *                     type: string
 *                     example: 'https://example.com/image.jpg'
 *       500:
 *         description: Error al obtener los productos
 */

/**
 * @swagger
 * /products:
 *   post:
 *     summary: Crear un nuevo producto
 *     description: Crea un nuevo producto en el sistema.
 *     operationId: createProduct
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       description: Datos del producto para crear.
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *               - precio
 *               - urlimagen
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Producto nuevo
 *               descripcion:
 *                 type: string
 *                 example: Una descripción del nuevo producto
 *               precio:
 *                 type: number
 *                 format: float
 *                 example: 50.99
 *               urlimagen:
 *                 type: string
 *                 example: 'https://example.com/product.jpg'
 *     responses:
 *       201:
 *         description: Producto creado con éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Producto agregado exitosamente'
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     nombre:
 *                       type: string
 *                       example: Producto nuevo
 *                     descripcion:
 *                       type: string
 *                       example: Una descripción del nuevo producto
 *                     precio:
 *                       type: number
 *                       format: float
 *                       example: 50.99
 *                     urlimagen:
 *                       type: string
 *                       example: 'https://example.com/product.jpg'
 *       403:
 *         description: Acceso denegado. Solo los administradores pueden agregar productos.
 *       500:
 *         description: Error al agregar el producto
 */

/**
 * @swagger
 * /products/{id}:
 *   delete:
 *     summary: Eliminar un producto
 *     description: Elimina un producto por su ID.
 *     operationId: deleteProduct
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del producto a eliminar
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Producto eliminado con éxito
 *       404:
 *         description: Producto no encontrado
 *       403:
 *         description: Acceso denegado. Solo los administradores pueden eliminar productos.
 *       500:
 *         description: Error al eliminar el producto
 */
