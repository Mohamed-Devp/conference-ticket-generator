const userInfoForm = document.querySelector('.user-info');

const avatarInput = document.getElementById('avatar');
const fullNameInput = document.getElementById('full-name');
const emailAddressInput = document.getElementById('email-address');
const gitHubUsenameInput = document.getElementById('github-username');

const dropZone = document.querySelector('.drop-zone');

const userAvatar = document.querySelector('.user-avatar');
const userAvatarImg = document.getElementById('user-avatar-img');
const removeBtn = document.getElementById('remove-btn');
const changeBtn = document.getElementById('change-btn');

const validFileTypes = ['image/jpeg', 'image/png'];
const maxFileSize = 500;

function showError(inputEl, descriptionEl, errorMessage) {
    inputEl.setAttribute('aria-invalid', 'true');

    const descriptionElSpan = descriptionEl.querySelector('.description__content');
    descriptionElSpan.textContent = errorMessage;

    descriptionEl.classList.remove('description--empty', 'description--info');
    descriptionEl.classList.add('description--error');
}

function hideError(inputEl, descriptionEl) {
    inputEl.removeAttribute('aria-invalid');

    const descriptionElSpan = descriptionEl.querySelector('.description__content');
    const defaultContent = descriptionElSpan.dataset.default;

    descriptionEl.classList.remove('description--error');

    if (defaultContent) {
        descriptionEl.classList.add('description--info');
        descriptionElSpan.textContent = defaultContent;
    }
    else {
        descriptionEl.classList.add('description--empty');
        descriptionElSpan.textContent = '';
    }
}

function handleFiles(filesList) {
    const avatarDescriptionEl = document.getElementById('avatar-description');

    if (filesList.length) {
        const selectedFile = filesList[0];
        const selectedFileSize = selectedFile.size / 1024;

        if (!validFileTypes.includes(selectedFile.type)) {
            showError(avatarInput, avatarDescriptionEl, 'Please upload a valid photo. (PNG or JPG, max size: 500KB)');
        }
        else if (selectedFileSize > maxFileSize) {
            showError(avatarInput, avatarDescriptionEl, 'File too large. Please upload a photo under 500KB.');
        }
        else {
            hideError(avatarInput, avatarDescriptionEl);

            dropZone.classList.add('hidden');
            userAvatar.classList.remove('hidden');

            const objectURL = URL.createObjectURL(selectedFile);
            userAvatarImg.src = objectURL;

            avatarInput.files = filesList;
        }
    }
}

function validateField(fieldName, inputEl, descriptionEl) {
    const validityState = inputEl.validity;

    if (validityState.valueMissing) {
        showError(inputEl, descriptionEl, `${fieldName} is required.`);
    }
    else if (!validityState.valid || validityState.patternMismatch) {
        showError(inputEl, descriptionEl, `Please enter a valid ${fieldName.toLowerCase()}.`);
    }
    else {
        hideError(inputEl, descriptionEl);
    }
}

avatarInput.addEventListener('change', () => {
    handleFiles(avatarInput.files);    
});

dropZone.addEventListener('click', () => {
    avatarInput.click();
});

dropZone.addEventListener('dragenter', () => {
    dropZone.classList.add('highlight');
});

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();

    const dataTransfer = e.dataTransfer;
    handleFiles(dataTransfer.files);

    dropZone.classList.remove('highlight');
});

dropZone.addEventListener('dragleave', (e) => {
    if (!dropZone.contains(e.relatedTarget)) {
        dropZone.classList.remove('highlight');
    }
});

removeBtn.addEventListener('click', () => {
    dropZone.classList.remove('hidden');
    userAvatar.classList.add('hidden');

    const dataTransfer = new DataTransfer();
    avatarInput.files = dataTransfer.files;
});

changeBtn.addEventListener('click', () => {
    avatarInput.click();
});

userInfoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const avatarDescriptionEl = document.getElementById('avatar-description');
    validateField('Avatar', avatarInput, avatarDescriptionEl);

    const fullNameDescriptionEl = document.getElementById('full-name-description');
    validateField('Full name', fullNameInput, fullNameDescriptionEl);

    const emailAddressDescriptionEl = document.getElementById('email-address-description');
    validateField('Email address', emailAddressInput, emailAddressDescriptionEl);

    const gitHubUsernameDescriptionEl = document.getElementById('github-username-description');
    validateField('GitHub username', gitHubUsenameInput, gitHubUsernameDescriptionEl);
});