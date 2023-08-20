export default (cookies: string) => {
    const cookiesArray = cookies.split('; ');
    const cookiesObject: Record<string, string> = {};
  
    cookiesArray.forEach(cookie => {
      const [name, value] = cookie.split('=');
      cookiesObject[name] = value;
    });
  
    return cookiesObject;
}