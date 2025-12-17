const avatarInput = document.getElementById('avatar');

const dropZone = document.querySelector('.drop-zone');

const userAvatar = document.querySelector('.user-avatar');
const userAvatarImg = document.getElementById('user-avatar-img');
const removeBtn = document.getElementById('remove-btn');
const changeBtn = document.getElementById('change-btn');

const validFileTypes = ['image/jpeg', 'image/png'];

function handleFiles(filesList) {
    if (filesList.length && validFileTypes.includes(filesList[0].type)) {
        dropZone.classList.add('hidden');
        userAvatar.classList.remove('hidden');

        const objectURL = URL.createObjectURL(filesList[0]);
        userAvatarImg.src = objectURL;
    }
}

avatarInput.addEventListener('change', (e) => {
    handleFiles(e.target.files);    
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