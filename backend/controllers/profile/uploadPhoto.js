import {v2} from 'cloudinary'
import streamifier from 'streamifier'
import User from '../../models/user.js'


v2.config({ 
    cloud_name: 'dtqjbbnwa',
    api_key: 732535354634789, 
    api_secret: 'c5mSXuGmCMXkh1-VETRBfVmVVhs',
    secure: true
});

let streamUpload = (req) => {
    return new Promise((resolve, reject) => {
        let stream = v2.uploader.upload_stream(
            (result) => {
                if('error' in result){
                    reject(result.error)
                } else {
                    resolve(result)
                }
            }
          );
        //  console.log('-------------------------',req)
        streamifier.createReadStream(req.file.buffer).pipe(stream)
    })
}


const upload = async(req) => {
    try{
        let result = await streamUpload(req);
        console.log('result',result)
        return {
            message: 'success',
            url: result.secure_url
        }
    }
    catch(err){
        console.log(err)
        return {
            message: 'error',
        }
    }
}


export const uploadPhoto = async(req, res) => {
    try{
        let uploadResult = await upload(req);
       
        if(uploadResult.message === 'success') {
            try {
                await User.findOneAndUpdate({_id: req.userId}, {$set: {avatar: uploadResult.url}})
            }
            catch(e) {
                res.status(500).json({
                    message: 'error'
                })
            }
            res.status(200).json({uploadResult})
        } else {
            res.status(500).json({uploadResult})
        }
    }
    catch(err){
        const uploadResult = {
            message: 'error'
        }
        res.status(500).json({uploadResult})
    }
}