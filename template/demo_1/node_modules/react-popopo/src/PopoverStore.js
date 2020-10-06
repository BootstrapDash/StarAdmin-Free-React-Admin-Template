class PopoverStore {
  callback = null;

  hide() {
    this.register(null);
  }

  register(cb) {
    if (this.callback) {
      this.callback();
    }
    this.callback = cb;
  }

  unregister(cb) {
    if (this.callback === cb) {
      this.callback = null;
    }
  }
}

export { PopoverStore };
export const popoverStore = new PopoverStore();
