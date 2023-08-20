class LocalStorageHelper {
    set(name: string, value: string) {
        return localStorage.setItem(name, value);
    }

    get(name: string) {
        return typeof window !== "undefined" ? localStorage.getItem(name) : null;
    }
    remove(name: string) {
        return localStorage.removeItem(name);
    }
}

export default new LocalStorageHelper();


