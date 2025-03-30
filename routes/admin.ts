import express, {Request, Response, NextFunction} from 'express';
import { CreateVendor, GetVendor, GetVendorById } from '../controllers';

const router = express.Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
    res.json({messageFromAdmin: 'Admin Home Page'});
});

router.post('/create-vendor', CreateVendor);
router.get('/vendor', GetVendor);
router.get('/vendor/:id', GetVendorById);

export {router as adminRouter};