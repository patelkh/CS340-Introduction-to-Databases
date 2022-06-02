const mysql = require('mysql');
const pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'dcrhg4kh56j13bnu.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
  user            : 'y4otf9p2mume7v45',
  password        : 'hqnrb9k7zi2gk3fd',
  database        : 'rx0l5s3rrfbva6ca'
});
module.exports.pool = pool;