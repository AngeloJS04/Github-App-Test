export default (params: object | string) => {
    return Object.keys(params)
        .map((key) => {
            let value: object | string = params[key as keyof object];
            value = typeof value === "object" ? JSON.stringify(value) : value;
            return `${key}=${value}`;
        })
        .join("&");
};
