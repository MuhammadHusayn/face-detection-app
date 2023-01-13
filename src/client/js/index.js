import { alert } from "../utils/alert.js"

const form = document.querySelector('.form')
const input_login = document.querySelector('#inputLogin')
const input_password = document.querySelector('#inputPassword')
const alert_wrapper = document.querySelector('.alert_wrapper')

form.addEventListener('submit', async (e) => {
    e.preventDefault()
    console.log(input_login);
    input_login.style.borderColor = '#dee2e6'

    if(!input_login.value){
        input_login.style.borderColor = 'red'
    } else if(!input_password.value){
        input_password.style.borderColor = 'red'
    } else {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: inputLogin.value,
                password: inputPassword.value,
            })
        })

        if(response.redirected == true){
            window.location = '/'
        } else {
            const data = await response.json()
            if(alert_wrapper.childElementCount <= 2){
                alert_wrapper.appendChild(alert(data.message, 10, 'danger'))
            }
        }
    }
})


