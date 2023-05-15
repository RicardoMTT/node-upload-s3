const { Router } = require('express')

const router = Router();
const { uploadFile, readData } = require('./s3')
router.get('/', (req, res) => res.send('test'));
router.post('/upload', (req, res) => {
    const result = uploadFile(req.files['photo'])
    result.then(response => {
        console.log('response', response);
    }).catch(error => {
        console.log('error', error);
    })
    res.send('subido');
});

router.get('/archivo/:fileName', async (req, res) => {
    try {
        const result = await readData(req.params.fileName);
        console.log('result', result);
        res.send('archivo');
    } catch (error) {
        res.send('error', error);
    }
})


module.exports = router;