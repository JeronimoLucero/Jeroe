const isAdmin = (req, res, next) => {
    // Verificar si el usuario está autenticado y tiene el rol de admin
    if (req.user && req.user.role === 'admin') {
      return next();  // Si el usuario es admin, continúa con la ejecución
    }
  
    // Si no es admin, devolver un error de acceso denegado
    return res.status(403).json({ message: 'Access denied. Only admins can perform this action.' });
  };
  
  module.exports = isAdmin;
  