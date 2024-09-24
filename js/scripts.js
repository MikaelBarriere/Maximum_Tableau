document.getElementById('numberForm').addEventListener('submit', function(event) {
    event.preventDefault(); 
    const nombreInput = document.getElementById('nombreInput');
    const nombreValeur = parseInt(nombreInput.value, 10);
    const divInput = document.getElementById('divInput');
    const divButton = document.getElementById('divButton');
   

    ////////////////////////////////////////////////////////////////////////   Réinitialisation de la div et des messages

    divInput.innerHTML = '';
    let resultMessage = '';
    monResultat.innerHTML = resultMessage;
    

    ///////////////////////////////////////////////////////////////////////  Génération des nouveaux inputs

    for (let i = 1; i <= nombreValeur; i++) {
        const newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.id = `input${i}`;
        newInput.name = 'Number';
        divInput.appendChild(newInput);
        newInput.classList.add('newInput');
    }

    ///////////////////////////////////////////////////////////////////////  Génération de mon bouton "Résultat"

    if (!divButton.querySelector('.resultatButton')) {
        const resultatButton = document.createElement('button');
        resultatButton.textContent = 'Résultat';
        resultatButton.id = `result`;
        resultatButton.classList.add('resultatButton');
        divButton.appendChild(resultatButton);
    }

    nombreInput.value = '';
});

document.getElementById('divButton').addEventListener('click', function(event) {
    if (event.target && event.target.id === 'result') {
        event.preventDefault(); 
        let monResultat = document.getElementById('monResultat');
        const inputs = document.querySelectorAll('.newInput');
        let maxVal = Number.NEGATIVE_INFINITY;
        let formValid = true;
        const errorMessage = document.getElementById('errorMessage');

        ////////////////////////////////////////////////////////////////// Je vérifie les inputs vides et trouver la valeur maximale

        inputs.forEach(input => {
            if (input.value === '') {
                input.classList.add('empty');
                formValid = false;
            } else {
                input.classList.remove('empty');
                const value = parseFloat(input.value);
                if (!isNaN(value) && value > maxVal) {
                    maxVal = value;
                }
            }
        });

        ///////////////////////////////////////////////////////////////// J'empêche l'envoi du formulaire si des inputs sont vides

        if (!formValid) {
            errorMessage.innerHTML = `<p class='text-danger'>Tous les champs doivent être renseignés par un nombre !!!</p>`;
            return;
        } else {
            errorMessage.innerHTML = '<p><br></p>';
        }

        /////////////////////////////////////////////////////////////////// Je réinitialise les styles de fond

        inputs.forEach(input => {
            input.classList.remove('jaune');
        });

        /////////////////////////////////////////////////////////////////// J'applique le fond jaune à tous les inputs avec la valeur maximale
        
        inputs.forEach(input => {
            const value = parseFloat(input.value);
            if (!isNaN(value) && value === maxVal) {
                input.classList.add('jaune');
            }
        });
        
        let resultMessage = `<p class='text-center'>Le Maximum de mon tableau est <span class="jaunetext">${maxVal}</span></p>`;
        monResultat.innerHTML = resultMessage;
    }
});