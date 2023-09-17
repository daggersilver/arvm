const phoneInput = document.getElementById("phone");
const otpInput = document.getElementById('otp');
const sendOtpBtn = document.getElementById('send-otp-btn');
const checkOtp = document.getElementById('check-otp');
const form = document.querySelector('form');

const url = 'https://arvm.onrender.com'

form.addEventListener('submit', (e) => {
    e.preventDefault();
})

sendOtpBtn.addEventListener('click', async () => {
    let res = await fetch(`${url}/phone/${phoneInput.value}`);
    res = await res.json();
    
    if(res['res'] == 'success')
        alert('otp sent');
    else    
        alert('server error');
})

checkOtp.addEventListener('click', async () => {
    let res = await fetch(`${url}/verify/${phoneInput.value}/${otpInput.value}`);
    res = await res.json();

    if(res['res'] == 'approved')
        alert('successfully verified');
    else    
        alert('verification failed');
})