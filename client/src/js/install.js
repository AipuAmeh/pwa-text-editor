const butInstall = document.getElementById('buttonInstall');
let installPrompt = null;

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
   event.preventDefault();
   installPrompt = event;
   butInstall.removeAttribute('hidden');

});

// TODO: Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
    if (!installPrompt) {
        return;
    }
    const result = await installPrompt.prompt();
    console.log(`Prompt install was ${result.outcome}`);
    installPrompt = null;
    butInstall.setAttribute('hidden', "");
});

// TODO: Add an handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
    event.preventDefault();
    console.log('Thank you for using JATE!')
});
