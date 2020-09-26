export class ValidHelper {
    public static validarEmail(email:string){
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    public static cep(cep){
        return cep.length == 10;
    }
    public static isOk(errors){
      let ok = true;
      Object.keys(errors).map(key=>{
        if(errors[key] && (typeof errors[key]  == "string" || typeof errors[key] == "boolean")){
          ok = false;
        }
      })
      return ok
    }
}
