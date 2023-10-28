const header = document.querySelector('.header');
const hero = document.querySelector('.hero');
const logIn = document.querySelector('.log-in');
const blurPopup = document.querySelector('.container-for-popup');
const signupPopup = document.querySelector('.signup-popup');
const googleSignUpButton = document.querySelector('.google-signup');
const facebookSignUpButton = document.querySelector('.facebook-signup');
const emailSignUpButton = document.querySelector('.email-signup');
const signInLink = document.querySelector('.sign-in-link');
const closePopupButton = document.querySelector('.close-popup');

const heroHeight = hero.clientHeight;

window.addEventListener('scroll', () => {
    if (window.scrollY > heroHeight - 150) {
        header.style.backgroundColor = 'white';
        logIn.style.backgroundColor = '#1a8917';
    } else {
        header.style.backgroundColor = '';
        logIn.style.backgroundColor = '';
    }
});

logIn.addEventListener('click', () => {
    signupPopup.style.display = 'block';
    blurPopup.style.display = 'block';
    setTimeout(() => {
        signupPopup.style.opacity = '1';
        blurPopup.style.opacity = '1';
    }, 0);
});

closePopupButton.addEventListener('click', () => {
    signupPopup.style.opacity = '0';
    blurPopup.style.opacity = '0';
    setTimeout(() => {
        signupPopup.style.display = 'none';
        blurPopup.style.display = 'none';
    }, 300);
});

blurPopup.addEventListener('click', () => {
    closePopupButton.click();
});

googleSignUpButton.addEventListener('click', () => {
    alert("Sign up with Google");
    signupPopup.style.display = 'none';
});

facebookSignUpButton.addEventListener('click', () => {
    alert("Sign up with Facebook");
    signupPopup.style.display = 'none';
});

emailSignUpButton.addEventListener('click', () => {
    alert("Sign up with email");
    signupPopup.style.display = 'none';
});

signInLink.addEventListener('click', (e) => {
    e.preventDefault();
    alert("Sign in");
    signupPopup.style.display = 'none';
});


/*
function nascondiRandomLetteraM() {
    const elementoConAriaLabel = document.querySelector('#svg g[aria-label]');
    if (elementoConAriaLabel) {
        let ariaLabel = elementoConAriaLabel.getAttribute('aria-label');
        const caratteriM = ariaLabel.match(/M/g);

        if (caratteriM && caratteriM.length > 0) {

            const numCaratteriDaNascondere = Math.floor(Math.random() * caratteriM.length);
            const caratteriDaNascondere = Array.from(caratteriM);

            console.log(ariaLabel);
            console.log(numCaratteriDaNascondere);

            for (let i = 0; i < numCaratteriDaNascondere; i++) {
              
                const indice = Math.floor(Math.random() * caratteriDaNascondere.length);
                const carattereDaNascondere = caratteriDaNascondere.splice(indice, 1)[0];

               
                ariaLabel = ariaLabel.replace(carattereDaNascondere, ' ');
            }

            elementoConAriaLabel.setAttribute('aria-label', ariaLabel);

            console.log(ariaLabel);

            
            setTimeout(() => {
                for (const carattereDaNascondere of caratteriDaNascondere) {
                    ariaLabel = ariaLabel.replace(' ', carattereDaNascondere);
                }
                elementoConAriaLabel.setAttribute('aria-label', ariaLabel);

                console.log(ariaLabel);
            }, 1000);
        }
    }
}

// Esegui la funzione ogni 1000 millisecondi (1 secondo)
setInterval(nascondiRandomLetteraM, 1000);
*/



