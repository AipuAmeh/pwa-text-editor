const butInstall = document.getElementById('buttonInstall');
let installPrompt = null;

window.addEventListener('beforeinstallprompt', (event) => {
   event.preventDefault();
   installPrompt = event;
   butInstall.removeAttribute('hidden');

});


butInstall.addEventListener('click', async () => {
    if (!installPrompt) {
        return;
    }
    const result = await installPrompt.prompt();
    console.log(`Prompt install was ${result.outcome}`);
    installPrompt = null;
    butInstall.setAttribute('hidden', "");
});


window.addEventListener('appinstalled', (event) => {
    event.preventDefault();
    console.log('Thank you for using JATE!')
});
