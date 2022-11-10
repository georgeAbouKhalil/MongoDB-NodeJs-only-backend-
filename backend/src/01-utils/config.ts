abstract class Config {
    public port: number = 3001;
    public loginExpiresIn: string;
}

class DevelopmentConfig extends Config {
    public mongoConnectionString = "mongodb://localhost:27017/mongodb_project";
    public constructor() {
        super();
        this.loginExpiresIn = "180d"; //180 days 
    }
}

const config = new DevelopmentConfig();

export default config;    
