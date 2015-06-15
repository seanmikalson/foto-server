var debug = false;
exports.config =  {
    dbConn: debug ? 'postgres://lostape:Filosoft02@localhost/foto' : process.env.DATABASE_URL
};