import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';

// đảm bảo nếu chưa có folder images sẽ tạo, còn chưa thì thôi
fs.mkdirSync('images/', { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images');
  },
  filename: function (req, file, cb) {
    const fileExtName = path.extname(file.originalname);
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, `local-${uniqueSuffix}${fileExtName}`);
  },
});

const uploadLocal = {
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 }, //1MB
};
export default uploadLocal;
