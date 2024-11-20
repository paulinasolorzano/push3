// Registrar el Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./service-worker.js')
        .then(reg => console.log('Service Worker registrado', reg))
        .catch(err => console.error('Error al registrar el Service Worker', err));
}

const subscribeButton = document.getElementById('subscribe');
const sendButton = document.getElementById('send');

// Solicitar permiso para notificaciones
subscribeButton.addEventListener('click', async () => {
    const permission = await Notification.requestPermission();

    if (permission === 'granted') {
        alert('Permiso para notificaciones concedido');
        sendButton.disabled = false; // Habilitar el botón para enviar notificaciones
    } else {
        alert('No se otorgaron permisos para notificaciones');
    }
});

// Enviar notificación
sendButton.addEventListener('click', () => {
    if (navigator.serviceWorker.controller) {
        navigator.serviceWorker.controller.postMessage({
            title: 'Notificación de PWA',
            options: {
                body: '¡Hola! Esta es una notificación push.',
                icon: './icons/icon-192x192.png',
            },
        });
    } else {
        alert('No se pudo enviar la notificación.');
    }
});
