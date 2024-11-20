// Escuchar mensajes del cliente
self.addEventListener('message', event => {
    const { title, options } = event.data;
    self.registration.showNotification(title, options);
});
