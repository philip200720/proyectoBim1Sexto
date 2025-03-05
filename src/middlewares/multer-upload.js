import multer from "multer";
import { dirname, extname, join } from "path"
import { fileURLToPath } from "url";

const CURRENT_DIR = dirname(fileURLToPath(import.meta.url))
const MIMETYPES = ["image/jpeg", "image/png", "image/jpg"]
const MAX_SIZE = 100000000

const createMulterConfig = (destinationPath) => {
    return multer({
        storage: multer.diskStorage({
            destination: (req, file, cb) => {
                const fullPath = join(CURRENT_DIR, destinationPath)
                req.filePath = fullPath;
                cb(null, fullPath)
            },
            filename: (req, file, cb) =>{
                const fileExtension = extname(file.originalname)
                const fileName = file.originalname.split(fileExtension)[0]
                cb(null, `${fileName}-${Date.now()}${fileExtension}`)
            }
        }),
        fileFilter: (req, file, cb) => {
            if(MIMETYPES.includes(file.mimetype)) cb(null, true)
            else cb (new Error (`Only files of the following types will be accepted:  ${MIMETYPES.join(" ")}`))
        },
        limits:{
            fileSize: MAX_SIZE
        }
    })
}

export const uploadProductPicture = createMulterConfig("../../public/uploads/product-pictures")