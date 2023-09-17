
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const serviceSID = process.env.SERVICE_SID;
const client = require('twilio')(accountSid, authToken);

app.use(express.static(path.join(__dirname, '/public')));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/views/index.html'));
})

app.get('/phone/:number', (req, res) => {
    console.log(req.params.number);

    client.verify.v2.services(serviceSID)
                .verifications
                .create({to: `+91${req.params.number}`, channel: 'sms'})
                .then(verification => {
                    console.log(verification.status);
                    res.json({'res' : 'success'});
                })

})

app.get('/verify/:number/:otp', (req, res) => {
    client.verify.v2.services(serviceSID)
      .verificationChecks
      .create({to: `+91${req.params.number}`, code: req.params.otp})
      .then(verification_check => {
        console.log(verification_check.status);
        res.json({'res' : verification_check.status});
      })
})

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})