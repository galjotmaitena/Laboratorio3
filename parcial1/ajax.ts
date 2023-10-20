namespace RecPrimerParcial
{
    export class Ajax 
    {
        private _xhr: XMLHttpRequest;
    
        private static DONE : number;
        private static OK : number;
    
        public constructor() 
        {
            this._xhr = new XMLHttpRequest();
            Ajax.DONE = 4;
            Ajax.OK = 200;
        }
    
        public Get = (ruta: string, success: Function, params: string = "", error?: Function):void => {
        
            let parametros:string = params.length > 0 ? params : "";
            ruta = params.length > 0 ? ruta + "?" + parametros : ruta;
    
            this._xhr.open('GET', ruta);
            this._xhr.send();
    
            this._xhr.onreadystatechange = () => {
    
                if (this._xhr.readyState === Ajax.DONE) {
                    if (this._xhr.status === Ajax.OK) {
                        success(this._xhr.responseText);
                    } else {
                        if (error !== undefined){
                            error(this._xhr.status);
                        }
                    }
                }
    
            };
        };
    
    
        
    
            public Post = (ruta: string, success: Function, params: any = null, error?: Function, headers?:any):void => {
        
                //let parametros:string = params.length > 0 ? params : "";
                this._xhr.setRequestHeader("content-type", "aplication/json");
                console.log(params);
                this._xhr.open('POST', ruta, true);
        
                if(headers !== undefined){
                    headers.forEach((header:any) => {
                        this._xhr.setRequestHeader(header.key, header.value);
                    });
                    
                }
    
                this._xhr.send(params);
        
                this._xhr.onreadystatechange = ():void => {
        
                    if (this._xhr.readyState === Ajax.DONE) {
                        if (this._xhr.status === Ajax.OK) {
                            success(this._xhr.responseText);
                        } else {
                            if (error !== undefined){
                                error(this._xhr.status);
                            }
                        }
                    }
                };
            };
    }
}
