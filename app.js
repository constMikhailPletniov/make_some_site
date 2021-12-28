let userRole;
let subscribe;
const selectorsCss = {
    idButtonJoin: 'button-join',
    classPopUp: 'pop-up',
    classHidden: 'hidden',
    idInputFirstName: 'input-first-name',
    idInputLastName: 'input-last-name',
    idInputEmail: 'input-email',
    idInputPassword: 'input-password',
    idConfirmPassword: 'input-confirmd-password',
};

const domElements = {
    buttonIdButtonJoin: document.querySelector(`#${selectorsCss.idButtonJoin}`),
    sectionClassPopUp: document.querySelector(`.${selectorsCss.classPopUp}`),
    inputIdInputFirstName: document.querySelector(`#${selectorsCss.idInputFirstName}`),
    inputIdInputLastName: document.querySelector(`#${selectorsCss.idInputLastName}`),
    inputEmail: document.querySelector(`#${selectorsCss.idInputEmail}`),
    inputPassword: document.querySelector(`#${selectorsCss.idInputPassword}`),
    inputIdConfirmedPassword: document.querySelector(`#${selectorsCss.idConfirmPassword}`),
};
const actions = {
    CLICK: 'click',
};
const METHODS = {
    POST: 'POST',
}


domElements.buttonIdButtonJoin.addEventListener(actions.CLICK, validate);
document.addEventListener(actions.CLICK, getCheckedValues);

function validate() {

    switch (true) {
        case (!userRole):
            console.error('Empty userRole :');
            break;
        case (!subscribe):
            console.error('Empty subscribe :');
            break;
        case (domElements.inputIdInputFirstName.value === ''):
            console.error('Empty first name :');
            break;
        case (!domElements.inputIdInputFirstName.value[0].match(/[a-zA-Z]/i)):
            console.error('first letter is not a letter :');
            break;
        case (!domElements.inputIdInputFirstName.value.match(/[a-zA-Z]/i)):
            console.error('first_name is not valid :');
            break;
        case (domElements.inputIdInputLastName.value === ''):
            console.error('last_name is empty :');
            break;
        case (!domElements.inputIdInputLastName.value.match(/[a-zA-Z]/i)):
            console.error('last_name is not valid :');
            break;
        case (domElements.inputEmail.value === ''):
            console.error('email is empty :');
            break;
        case (domElements.inputEmail.lenght < 6):
            console.error('email is not valid :');
            break;
        case (domElements.inputPassword.lenght < 8):
            console.error('password is not valid :');
            break;
        case (domElements.inputIdConfirmedPassword.value !== domElements.inputPassword.value):
            console.error('not confirmed password :', domElements.inputPassword.value, ' ', domElements.inputIdConfirmedPassword.value);
            break;
    }
    postNewUsersValues();
}

async function postNewUsersValues() {
    try {
        let res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: METHODS.POST,
            body: {
                client_role: userRole,
                first_name: domElements.inputIdInputFirstName.value,
                last_name: domElements.inputIdInputLastName.value,
                email: domElements.inputEmail.value,
                password: domElements.inputPassword.value,
                subscribe_item: subscribe,
            }
        });
        res = res.json();
        console.log(res);
    } catch (err) {
        console.error('postNewUsers: ', err);
    }

    domElements.sectionClassPopUp.classList.add(selectorsCss.classHidden);
}

function getCheckedValues(e) {

    if (e.target.type === 'radio') {
        userRole = e.target.id;
        return userRole;
    }
    if (e.target.type === 'checkbox') {
        subscribe = e.target.id;
        return subscribe;
    }
    return;
}
