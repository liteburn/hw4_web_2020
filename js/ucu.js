// 1. Submit the form, only if it is valid
//    email is between 5 and 50 chars long
//    email format is correct
//    name has 0 or 2 whitespaces benween words
//    name length is 1 or more chars
//    phone length is 12 or more digits
//    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
//    message is 10 or more characters.
//    message must not iclude bad language: ugly, dumm, stupid, pig, ignorant
// 2. Validate each input on the fly using onchange event
// 3. Define re-usable validators: length, format,

function lengthValidator(name, Node, Errors, length1, length2) {
    if (Node.value.length < length1) {
        let li = document.createElement('li');
        li.innerText = name + ' is too short';
        Errors.appendChild(li);
    }
    if (length2 !== -1) {
        if (Node.value.length > length2) {
            let li = document.createElement('li');
            li.innerText = 'Email is too long';
            Errors.appendChild(li);
        }
    }
}

function formatValidator(name, Node, Errors, regex) {
    if (!Node.value.match(regex)) {
        let li = document.createElement('li');
        li.innerText = name + " format is incorrect";
        Errors.appendChild(li);
    }
    return Errors;
}

function validateEmail(event) {
    let emailNode;
    if (event.target.elements === undefined) {
        emailNode = event.target;
    } else {
        emailNode = event.target.elements['email'];
    }
    const emailErrorNode = emailNode.parentNode.querySelector('p.help-block');
    emailErrorNode.innerHTML = '';

    let emailErrors = document.createElement('ul');
    emailErrors.setAttribute("role", "alert");

    lengthValidator("Email", emailNode, emailErrors, 5, 50);

    formatValidator("Email", emailNode, emailErrors, /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);

    if (emailErrors.childElementCount > 0) {
        emailErrorNode.appendChild(emailErrors);
        return false;
    }
    return true;
}

function validateName(event) {
    let nameNode;
    if (event.target.elements === undefined) {
        nameNode = event.target;
    } else {
        nameNode = event.target.elements['name'];
    }
    const nameErrorNode = nameNode.parentNode.querySelector('p.help-block');
    nameErrorNode.innerHTML = '';

    let nameErrors = document.createElement('ul');
    nameErrors.setAttribute("role", "alert");

    lengthValidator("Name", nameNode, nameErrors, 1, -1);

    formatValidator("Name", nameNode, nameErrors, /(^[A-Z][a-z]*$)|(^[A-Z][a-z]*[ ][A-Z][a-z]*[ ][A-Z][a-z]*$)/);

    if (nameErrors.childElementCount > 0) {
        nameErrorNode.appendChild(nameErrors);
        return false;
    }
    return true;
}

function validatePhone(event) {
    let phoneNode;
    if (event.target.elements === undefined) {
        phoneNode = event.target;
    } else {
        phoneNode = event.target.elements['phone'];
    }
    const phoneErrorNode = phoneNode.parentNode.querySelector('p.help-block');
    phoneErrorNode.innerHTML = '';

    let phoneErrors = document.createElement('ul');
    phoneErrors.setAttribute("role", "alert");

    //    phone format is correct. Valid formats: "+38032 000 000 00", "+380(32) 000 000 00", "+380(32)-000-000-00", "0380(32) 000 000 00", + any combitaion
    formatValidator("Phone", phoneNode, phoneErrors, /^[+0]\d{1,3}[(]?\d{2}[)]?[ -]?\d{3}[ -]?\d{2}[ -]?\d{2}$/);

    if (phoneErrors.childElementCount > 0) {
        phoneErrorNode.appendChild(phoneErrors);
        return false;
    }
    return true;
}

function validateMessage(event) {
    let messageNode;
    if (event.target.elements === undefined) {
        messageNode = event.target;
    } else {
        messageNode = event.target.elements['message'];
    }
    const messageErrorNode = messageNode.parentNode.querySelector('p.help-block');
    messageErrorNode.innerHTML = '';

    let messageErrors = document.createElement('ul');
    messageErrors.setAttribute("role", "alert");

    lengthValidator("Message", messageNode, messageErrors, 10, -1);


    formatValidator("Message", messageNode, messageErrors, /^((?!((ugly)|(dumm)|(stupid)|(pig)|(ignorant))).)*$/);

    if (messageErrors.childElementCount > 0) {
        messageErrorNode.appendChild(messageErrors);
        return false;
    }
    return true;
}

function validateMe(event) {
    event.preventDefault();
    checker = validateEmail(event) && validateName(event) && validatePhone(event) && validateMessage(event);
    if (checker) {
        event.target.submit();
    }
    return checker;
}
