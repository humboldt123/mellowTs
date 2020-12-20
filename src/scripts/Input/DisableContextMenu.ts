export class DisableContextMenu {
    static disableContextMenu() {
        document.addEventListener('contextmenu', event => event.preventDefault());
    }
}