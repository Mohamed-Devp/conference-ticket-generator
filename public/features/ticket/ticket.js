const avatar = document.getElementById('avatar');
const headerFullName = document.getElementById('header-full-name');
const fullName = document.getElementById('full-name');
const emailAddress = document.getElementById('email-address');
const gitHubUsername = document.getElementById('github-username');

function getUserInfo() {
    const userInfoStr = window.localStorage.getItem('userInfo');
    return JSON.parse(userInfoStr);
}

function displayUserInfo() {
    const userInfo = getUserInfo();

    avatar.src = userInfo.avatar;

    headerFullName.textContent = userInfo.fullName;
    fullName.textContent = userInfo.fullName;

    emailAddress.textContent = userInfo.emailAddress;

    gitHubUsername.textContent = userInfo.gitHubUsername.startsWith('@')
        ? userInfo.gitHubUsername
        : `@${userInfo.gitHubUsername}`;
}

displayUserInfo();